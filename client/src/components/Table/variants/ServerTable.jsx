import React from 'react';
import { useServerSync }     from '../hooks/useServerSync';
import { useTablePagination } from '../hooks/useTablePagination';
import { useRowModal }        from '../hooks/useRowModal';
import TableHeader            from '../shared/TableHeader';
import TableRow               from '../shared/TableRow';
import TablePagination        from '../shared/TablePagination';
import SearchBar              from '../shared/SearchBar';
import SortControls           from '../shared/SortControls';
import RowModal               from '../shared/RowModal';

/**
 * ServerTable — API-driven table.
 *
 * All sorting, filtering, and pagination params are sent to the server
 * via onFetch. The parent is responsible for updating `data` and `totalRows`
 * in response. State is optionally synced to the URL.
 *
 * Pipeline: param change → onFetch(params) → parent updates data → render
 *
 * Props:
 *   columns           {array}   - column definitions
 *   data              {array}   - current page's rows (from server)
 *   totalRows         {number}  - total row count across all pages (from server)
 *   onFetch           {fn}      - ({ page, perPage, sortKey, sortDir, search }) => void
 *   onAction          {fn}      - (actionId, row) => void
 *   loading           {bool}    - shows loading overlay when true
 *   caption           {string}
 *   emptyMessage      {string}
 *   className         {string}
 *
 *   // Search
 *   showSearchBar       {bool}    default: true
 *   searchPlaceholder   {string}
 *
 *   // Sort controls
 *   showSortControls    {bool}    default: true
 *
 *   // Pagination
 *   showPagination      {bool}    default: true
 *   initialPerPage      {number}  default: 10
 *   perPageOptions      {array}   default: [10, 25, 50, 100]
 *
 *   // URL sync
 *   syncToUrl           {bool}    default: true
 *   urlPrefix           {string}  - namespaces URL params, e.g. 'users'
 *                                   → ?users_page=2&users_sortKey=name
 *                                   Required when multiple ServerTables share a page
 *
 *   // Row modal
 *   rowClickable        {bool}    default: false — server tables less commonly need this
 *   modalTitle          {string}
 *   renderModal         {fn}      - (row) => JSX
 */
export default function ServerTable({
    columns = [],
    data = [],
    totalRows = 0,
    onFetch,
    onAction,
    loading = false,
    caption,
    emptyMessage = 'No results found.',
    className = '',

    showSearchBar = true,
    searchPlaceholder = 'Search…',

    showSortControls = true,

    showPagination = true,
    initialPerPage = 10,
    perPageOptions = [10, 25, 50, 100],

    syncToUrl = true,
    urlPrefix = '',

    rowClickable = false,
    modalTitle,
    renderModal,
}) {
  const visibleColumns = columns.filter((col) => !col.hidden);

  // ── 1. Server sync — owns all param state, fires onFetch on change ─────
  const {
      params,
      setPage,
      setPerPage,
      setSort,
      cycleSort,
      setSearch,
      resetParams,
    } = useServerSync({
      onFetch,
      syncToUrl,
      urlPrefix,
      initialParams: { perPage: initialPerPage },
  });

  // ── 2. Pagination UI — server-side, uses totalRows from prop ───────────
  // We still use useTablePagination for the UI calculations (rangeStart,
  // rangeEnd, totalPages, canPrev/canNext) but pass serverSide:true so
  // it never slices the data — that's already done by the server.
  const pagination = useTablePagination({
      data,
      serverSide: true,
      totalRows,
      initialPerPage: params.perPage,
      perPageOptions,
  });

  // Keep pagination UI in sync with useServerSync params
  // (page may have been set via URL on mount)
  const paginationWithSync = {
      ...pagination,
      page:    params.page,
      perPage: params.perPage,
      // Override the hook's setters with useServerSync's — so param changes
      // flow through useServerSync and trigger onFetch
      setPage,
      setPerPage,
      goToFirst: () => setPage(1),
      goToPrev:  () => setPage(params.page - 1),
      goToNext:  () => setPage(params.page + 1),
      goToLast:  () => setPage(Math.ceil(totalRows / params.perPage)),
      canPrev:   params.page > 1,
      canNext:   params.page < Math.ceil(totalRows / params.perPage),
      rangeStart: totalRows === 0 ? 0 : (params.page - 1) * params.perPage + 1,
      rangeEnd:   Math.min(params.page * params.perPage, totalRows),
      totalRows,
      totalPages: Math.max(1, Math.ceil(totalRows / params.perPage)),
  };

  // ── 3. Modal ────────────────────────────────────────────────────────────
  const { isOpen, rowData, openModal, closeModal } = useRowModal();

  // ── Toolbar ─────────────────────────────────────────────────────────────
  const showToolbar = showSearchBar || showSortControls;

  return (
    <>
      <div className={`st-root ${className}`.trim()}>
        {showToolbar && (
          <div className="st-toolbar">
            {showSearchBar && (
              <SearchBar
                value={params.search}
                onChange={setSearch}
                placeholder={searchPlaceholder}
                disabled={loading}
              />
            )}

            <div className="st-toolbar-right">
              {/* Row count */}
              {totalRows > 0 && (
                <span className="st-result-count" aria-live="polite" aria-atomic="true">
                  {totalRows.toLocaleString()} rows
                </span>
              )}

              {showSortControls && (
                <SortControls
                  columns={visibleColumns}
                  sortKey={params.sortKey || null}
                  sortDir={params.sortDir}
                  onSort={setSort}
                />
              )}

              {/* Reset button — only shown when params differ from defaults */}
              {hasActiveParams(params) && (
                <button
                  className="server-reset-btn"
                  onClick={resetParams}
                  aria-label="Reset filters and sort"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        )}

        {/* Table with loading overlay wrapper */}
        <div className="server-table-container">
          {loading && (
            <div className="server-loading-overlay" aria-live="polite">
              <div className="server-loading-spinner" />
            </div>
          )}

          <div className={`bt-wrapper ${loading ? 'server-table--loading' : ''}`.trim()}>
            <table
              className="bt-table"
              role="grid"
              aria-label={caption ?? undefined}
              aria-rowcount={totalRows}
              aria-busy={loading}
            >
              {caption && <caption className="bt-caption">{caption}</caption>}

                <TableHeader
                        columns={visibleColumns}
                        sortKey={params.sortKey || null}
                        sortDir={params.sortDir || null}
                        onSort={cycleSort}
                />
              <tbody>
                {!loading && data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={visibleColumns.length}
                      className="bt-empty"
                      aria-live="polite"
                    >
                      {params.search
                        ? `No results for "${params.search}".`
                        : emptyMessage}
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <TableRow
                      key={row.id ?? index}
                      row={row}
                      columns={visibleColumns}
                      onAction={onAction}
                      onRowClick={rowClickable ? openModal : undefined}
                      rowIndex={paginationWithSync.rangeStart + index}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showPagination && (
          <TablePagination {...paginationWithSync} />
        )}
      </div>

      <RowModal
        isOpen={isOpen}
        rowData={rowData}
        onClose={closeModal}
        renderModal={renderModal}
        title={modalTitle}
        columns={visibleColumns}
      />
    </>
  );
}

// True if any param is non-default — used to show/hide the Reset button
function hasActiveParams(params) {
  return (
    params.search   !== ''    ||
    params.sortKey  !== ''    ||
    params.page     !== 1
  );
}