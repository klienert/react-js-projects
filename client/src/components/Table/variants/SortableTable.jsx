import React from 'react';
import { useTableSort } from '../hooks/useTableSort';
import { useTableFilter } from '../hooks/useTableFilter';
import TableHeader from '../shared/TableHeader';
import TableRow from '../shared/TableRow';
import SearchBar from '../shared/SearchBar';
import SortControls from '../shared/SortControls';

/**
 * SortableTable
 *
 * Extends BasicTable with:
 *   - Global search bar (useTableFilter)
 *   - Click-to-sort column headers (useTableSort — cycleSort)
 *   - Select-input sort control (useTableSort — setSort)
 *
 * The two sort methods share the same state — they stay in sync automatically.
 *
 * Props:
 *   columns         {array}   - column definitions
 *   data            {array}   - array of row objects
 *   onAction        {fn}      - (actionId, row) => void
 *   onRowClick      {fn}      - (row) => void
 *   caption         {string}  - accessible table caption
 *   emptyMessage    {string}  - shown when no rows match
 *   className       {string}  - extra class on the root wrapper
 *   searchPlaceholder {string}
 *   showSortControls  {bool}  - show/hide the select-input sort (default: true)
 *   showSearchBar     {bool}  - show/hide the search bar (default: true)
 *   initialSortKey    {string}
 *   initialSortDir    {string} - 'asc' | 'desc'
 */
const SortableTable = ({
    columns = [],
    data = [],
    onAction,
    onRowClick,
    caption,
    emptyMessage = 'No results found.',
    className = '',
    searchPlaceholder = 'Search…',
    showSortControls = true,
    showSearchBar = true,
    initialSortKey = null,
    initialSortDir = 'asc',
}) => {
    const visibleColumns = columns.filter((col) => !col.hidden);

    // ── Sort ────────────────────────────────────────────────────────────────
    const { sortedData, sortKey, sortDir, setSort, cycleSort } = useTableSort({
        data,
        initialKey: initialSortKey,
        initialDir: initialSortDir,
    });

    // ── Filter — runs on already-sorted data ────────────────────────────────
    const {
        filteredData,
        searchQuery,
        setSearchQuery,
        hasActiveFilter,
    } = useTableFilter({
        data: sortedData,
        columns: visibleColumns,
    });

    // ── Toolbar visibility ──────────────────────────────────────────────────
    const showToolbar = showSearchBar || showSortControls;

    // ── Result summary text ─────────────────────────────────────────────────
    const resultSummary =
        hasActiveFilter && filteredData.length !== data.length
        ? `${filteredData.length} of ${data.length} rows`
        : null;

    return (
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
                {filteredData.length === 0 ? (
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
                filteredData.map((row, index) => (
                    <TableRow
                    key={row.id ?? index}
                    row={row}
                    columns={visibleColumns}
                    onAction={onAction}
                    onRowClick={onRowClick}
                    rowIndex={index + 1}
                    />
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>
    );
}

export default SortableTable;