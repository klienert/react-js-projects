import React from 'react';
import { useTableSort }       from '../hooks/useTableSort';
import { useTableFilter }     from '../hooks/useTableFilter';
import { useTablePagination } from '../hooks/useTablePagination';
import { useRowModal }        from '../hooks/useRowModal';
import TableHeader            from '../shared/TableHeader';
import TableRow               from '../shared/TableRow';
import TablePagination        from '../shared/TablePagination';
import SearchBar              from '../shared/SearchBar';
import SortControls           from '../shared/SortControls';
import RowModal               from '../shared/RowModal';

/**
 * DataTable — full-featured client-side table.
 *
 * Pipeline: data → sort → filter → paginate → render
 *
 * Props:
 *   columns           {array}   - column definitions
 *   data              {array}   - full dataset
 *   onAction          {fn}      - (actionId, row) => void
 *   caption           {string}  - accessible table caption
 *   emptyMessage      {string}
 *   className         {string}
 *
 *   // Search
 *   showSearchBar       {bool}    default: true
 *   searchPlaceholder   {string}
 *
 *   // Sort controls
 *   showSortControls    {bool}    default: true
 *   initialSortKey      {string}
 *   initialSortDir      {string}  'asc' | 'desc'
 *
 *   // Pagination
 *   showPagination      {bool}    default: true
 *   initialPerPage      {number}  default: 10
 *   perPageOptions      {array}   default: [10, 25, 50, 100]
 *
 *   // Row modal
 *   rowClickable        {bool}    default: true — enables row click → modal
 *   modalTitle          {string}  - heading for the modal
 *   renderModal         {fn}      - (row) => JSX — overrides auto key/value render
 * 
 *  TableHeader         {@link TableHeader}
 *  TableRow            {@link TableRow}
 *  TablePagination     {@link TablePagination}
 *  SearchBar           {@link SearchBar}
 *  SortControls        {@link SortControls}
 *  RowModal            {@link RowModal}
 */
export default function DataTable({
    columns = [],
    data = [],
    onAction,
    caption,
    emptyMessage = 'No results found.',
    className = '',

    showSearchBar = true,
    searchPlaceholder = 'Search…',

    showSortControls = false,
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

    // ── 1. Sort ────────────────────────────────────────────────────────────
    const { sortedData, sortKey, sortDir, setSort, cycleSort } = useTableSort({
        data,
        initialKey: initialSortKey,
        initialDir: initialSortDir,
    });

    // ── 2. Filter (on sorted data) ─────────────────────────────────────────
    const {
        filteredData,
        searchQuery,
        setSearchQuery,
        hasActiveFilter,
    } = useTableFilter({
        data: sortedData,
        columns: visibleColumns,
    });

    // ── 3. Paginate (on filtered data) ────────────────────────────────────
    const pagination = useTablePagination({
        data: filteredData,
        initialPerPage,
        perPageOptions,
    });

    // ── 4. Modal ──────────────────────────────────────────────────────────
    const { isOpen, rowData, openModal, closeModal } = useRowModal();

    // ── Toolbar ────────────────────────────────────────────────────────────
    const showToolbar = showSearchBar || showSortControls;
    const resultSummary =
        hasActiveFilter && filteredData.length !== data.length
        ? `${filteredData.length} of ${data.length} rows`
        : null;

    return (
        <>
        <div className={`st-root ${className}`.trim()}>

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
                    <td
                        colSpan={visibleColumns.length}
                        className="bt-empty"
                        aria-live="polite"
                    >
                        {hasActiveFilter
                        ? `No results for "${searchQuery}".`
                        : emptyMessage}
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

            {showPagination && (
                <TablePagination {...pagination} />
            )}
        </div>

        {/* Modal lives outside the table div so it can overlay freely */}
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