import React from 'react';
import { useTableSort }       from '../hooks/useTableSort';
import { useTableFilter }     from '../hooks/useTableFilter';
import { useTablePagination } from '../hooks/useTablePagination';
import { useFilterBar }       from '../hooks/useFilterBar';
import { useRowModal }        from '../hooks/useRowModal';
import TableHeader            from '../shared/TableHeader';
import TableRow               from '../shared/TableRow';
import TablePagination        from '../shared/TablePagination';
import SearchBar              from '../shared/SearchBar';
import SortControls           from '../shared/SortControls';
import FilterBar              from '../shared/FilterBar';
import RowModal               from '../shared/RowModal';

/**
 * FilteredDataTable
 *
 * Client-side table with filter bar buttons.
 * Pipeline: data → filterBar → sort → search → paginate → render
 *
 * Props:
 *   columns           {array}   - column definitions (cols with filters[] get buttons)
 *   data              {array}   - full dataset
 *   filterMode        {string}  - 'single' | 'multi' (default: 'single')
 *   onAction          {fn}      - (actionId, row) => void
 *   caption           {string}
 *   emptyMessage      {string}
 *   className         {string}
 *
 *   showSearchBar       {bool}    default: true
 *   searchPlaceholder   {string}
 *   showSortControls    {bool}    default: true
 *   initialSortKey      {string}
 *   initialSortDir      {string}
 *
 *   showPagination      {bool}    default: true
 *   initialPerPage      {number}  default: 10
 *   perPageOptions      {array}
 *
 *   rowClickable        {bool}    default: true
 *   modalTitle          {string|fn}
 *   renderModal         {fn}      - (row) => JSX
 */
export default function FilteredDataTable({
  columns = [],
  data = [],
  filterMode = 'single',
  onAction,
  caption,
  emptyMessage = 'No results found.',
  className = '',

  showSearchBar = true,
  searchPlaceholder = 'Search…',

  showSortControls = true,
  initialSortKey = null,
  initialSortDir = 'asc',

  showPagination = true,
  initialPerPage = 10,
  perPageOptions = [10, 25, 50, 100],

  rowClickable = true,
  modalTitle,
  renderModal,
}) {
  const visibleColumns = columns.filter((col) => !col.hidden);

  // ── 1. Filter bar — runs first on raw data ─────────────────────────────
  const {
    filteredData: barFiltered,
    activeFilters,
    setFilter,
    clearFilters,
    isActive,
    hasActiveFilter: hasBarFilter,
    filterColumns,
  } = useFilterBar({ data, columns: visibleColumns, filterMode });

  // ── 2. Sort — runs on bar-filtered data ────────────────────────────────
  const { sortedData, sortKey, sortDir, setSort, cycleSort } = useTableSort({
    data: barFiltered,
    initialKey: initialSortKey,
    initialDir: initialSortDir,
  });

  // ── 3. Search filter — runs on sorted data ─────────────────────────────
  const {
    filteredData,
    searchQuery,
    setSearchQuery,
    hasActiveFilter: hasSearchFilter,
  } = useTableFilter({ data: sortedData, columns: visibleColumns });

  // ── 4. Paginate ────────────────────────────────────────────────────────
  const pagination = useTablePagination({
    data: filteredData,
    initialPerPage,
    perPageOptions,
  });

  // ── 5. Modal ───────────────────────────────────────────────────────────
  const { isOpen, rowData, openModal, closeModal } = useRowModal();

  // ── Toolbar ────────────────────────────────────────────────────────────
  const showToolbar = showSearchBar || showSortControls;
  const hasAnyFilter = hasBarFilter || hasSearchFilter;

  const resultSummary = hasAnyFilter && filteredData.length !== data.length
    ? `${filteredData.length} of ${data.length} rows`
    : null;

  const resolvedTitle = typeof modalTitle === 'function'
    ? modalTitle(rowData)
    : modalTitle;

  return (
    <>
      <div className={`st-root ${className}`.trim()}>

        {/* Filter bar — sits above the search/sort toolbar */}
        {filterColumns.length > 0 && (
          <FilterBar
            filterColumns={filterColumns}
            isActive={isActive}
            onFilter={setFilter}
            onClearAll={clearFilters}
            hasActiveFilter={hasBarFilter}
            filterMode={filterMode}
          />
        )}

        {showToolbar && (
          <div className="st-toolbar">
            {showSearchBar && (
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={searchPlaceholder}
              />
            )}
            <div className="st-toolbar-right">
              {resultSummary && (
                <span className="st-result-count" aria-live="polite" aria-atomic="true">
                  {resultSummary}
                </span>
              )}
              {showSortControls && (
                <SortControls
                  columns={visibleColumns}
                  sortKey={sortKey}
                  sortDir={sortDir}
                  onSort={setSort}
                />
              )}
            </div>
          </div>
        )}

        <div className="bt-wrapper">
          <table
            className="bt-table"
            role="grid"
            aria-label={caption ?? undefined}
            aria-rowcount={filteredData.length}
          >
            {caption && <caption className="bt-caption">{caption}</caption>}

            <TableHeader
              columns={visibleColumns}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={cycleSort}
            />

            <tbody>
              {pagination.paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={visibleColumns.length} className="bt-empty" aria-live="polite">
                    {hasAnyFilter ? `No results match the current filters.` : emptyMessage}
                  </td>
                </tr>
              ) : (
                pagination.paginatedData.map((row, index) => (
                  <TableRow
                    key={row.id ?? index}
                    row={row}
                    columns={visibleColumns}
                    onAction={onAction}
                    onRowClick={rowClickable ? openModal : undefined}
                    rowIndex={pagination.rangeStart + index}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {showPagination && <TablePagination {...pagination} />}
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