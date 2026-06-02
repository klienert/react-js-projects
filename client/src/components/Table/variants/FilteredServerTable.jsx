import React from 'react';
import { useServerSync }     from '../hooks/useServerSync';
import { useFilterBar }      from '../hooks/useFilterBar';
import { useTablePagination } from '../hooks/useTablePagination';
import { useRowModal }        from '../hooks/useRowModal';
import TableHeader            from '../shared/TableHeader';
import TableRow               from '../shared/TableRow';
import TablePagination        from '../shared/TablePagination';
import SearchBar              from '../shared/SearchBar';
import SortControls           from '../shared/SortControls';
import FilterBar              from '../shared/FilterBar';
import RowModal               from '../shared/RowModal';

/**
 * FilteredServerTable
 *
 * API-driven table with filter bar buttons.
 * Active filters are passed to onFetch alongside sort/page/search params.
 *
 * onFetch receives:
 *   { page, perPage, sortKey, sortDir, search, filters }
 *   filters shape (single): { status: 'active', region: 'Demo' }
 *   filters shape (multi):  { status: ['active', 'pending'], region: [] }
 *
 * Props:
 *   columns           {array}
 *   data              {array}   - current page rows from server
 *   totalRows         {number}  - total row count from server
 *   onFetch           {fn}      - ({ page, perPage, sortKey, sortDir, search, filters }) => void
 *   filterMode        {string}  - 'single' | 'multi' (default: 'single')
 *   loading           {bool}
 *   onAction          {fn}
 *   caption           {string}
 *   emptyMessage      {string}
 *   className         {string}
 *
 *   showSearchBar       {bool}    default: true
 *   searchPlaceholder   {string}
 *   showSortControls    {bool}    default: true
 *
 *   showPagination      {bool}    default: true
 *   initialPerPage      {number}  default: 10
 *   perPageOptions      {array}
 *
 *   syncToUrl           {bool}    default: true
 *   urlPrefix           {string}
 *
 *   rowClickable        {bool}    default: false
 *   modalTitle          {string|fn}
 *   renderModal         {fn}
 */
export default function FilteredServerTable({
  columns = [],
  data = [],
  totalRows = 0,
  onFetch,
  filterMode = 'single',
  loading = false,
  onAction,
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

  // ── 1. Filter bar state ────────────────────────────────────────────────
  // serverSide:true — no client filtering, just tracks state to pass to onFetch
  const {
    activeFilters,
    setFilter,
    clearFilters,
    isActive,
    hasActiveFilter: hasBarFilter,
    filterColumns,
  } = useFilterBar({
    columns: visibleColumns,
    filterMode,
    serverSide: true,
  });

  // ── 2. Server sync — wraps onFetch to include filters ──────────────────
  // We wrap onFetch so filters are always included in the params object
  const onFetchWithFilters = (params) => {
    onFetch?.({ ...params, filters: activeFilters });
  };

  const {
    params,
    setPage,
    setPerPage,
    setSort,
    cycleSort,
    setSearch,
    resetParams,
  } = useServerSync({
    onFetch: onFetchWithFilters,
    syncToUrl,
    urlPrefix,
    initialParams: { perPage: initialPerPage },
  });

  // ── 3. Pagination UI ───────────────────────────────────────────────────
  const pagination = useTablePagination({
    data,
    serverSide: true,
    totalRows,
    initialPerPage: params.perPage,
    perPageOptions,
  });

  const paginationWithSync = {
    ...pagination,
    page:      params.page,
    perPage:   params.perPage,
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

  // ── 4. Re-fetch when filters change ───────────────────────────────────
  // useServerSync fires onFetch when its own params change.
  // We need to also re-fetch when activeFilters change — reset to page 1.
  const prevFiltersRef = React.useRef(activeFilters);
  React.useEffect(() => {
    if (prevFiltersRef.current !== activeFilters) {
      prevFiltersRef.current = activeFilters;
      // Reset to page 1 and fire fetch with new filters
      setPage(1);
      onFetch?.({ ...params, page: 1, filters: activeFilters });
    }
  }, [activeFilters]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── 5. Modal ───────────────────────────────────────────────────────────
  const { isOpen, rowData, openModal, closeModal } = useRowModal();

  // ── Toolbar ────────────────────────────────────────────────────────────
  const showToolbar = showSearchBar || showSortControls;
  const hasAnyFilter = hasBarFilter || params.search !== '';

  const resolvedTitle = typeof modalTitle === 'function'
    ? modalTitle(rowData)
    : modalTitle;

  return (
    <>
      <div className={`st-root ${className}`.trim()}>

        {/* Filter bar */}
        {filterColumns.length > 0 && (
          <FilterBar
            filterColumns={filterColumns}
            isActive={isActive}
            onFilter={(colKey, value) => {
              setFilter(colKey, value);
            }}
            onClearAll={() => {
              clearFilters();
              setPage(1);
            }}
            hasActiveFilter={hasBarFilter}
            filterMode={filterMode}
            disabled={loading}
          />
        )}

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
              {(hasAnyFilter || params.page !== 1) && (
                <button
                  className="st-reset-btn"
                  onClick={() => { resetParams(); clearFilters(); }}
                  aria-label="Reset all filters"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        )}

        <div className="st-table-container">
          {loading && (
            <div className="st-loading-overlay" aria-live="polite" aria-label="Loading">
              <div className="st-loading-spinner" />
            </div>
          )}

          <div className={`bt-wrapper ${loading ? 'st-table--loading' : ''}`.trim()}>
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
                    <td colSpan={visibleColumns.length} className="bt-empty" aria-live="polite">
                      {hasAnyFilter ? 'No results match the current filters.' : emptyMessage}
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

        {showPagination && <TablePagination {...paginationWithSync} />}
      </div>

      <RowModal
        isOpen={isOpen}
        rowData={rowData}
        onClose={closeModal}
        renderModal={renderModal}
        title={resolvedTitle}
        columns={visibleColumns}
      />
    </>
  );
}