import React from 'react';

/**
 * SortControls
 *
 * A pair of <select> inputs: one for the sort column, one for direction.
 * Used alongside (or instead of) click-to-sort column headers.
 *
 * Props:
 *   columns   {array}   - column definitions (only sortable:true columns appear)
 *   sortKey   {string}  - currently active sort key
 *   sortDir   {string}  - 'asc' | 'desc' | null
 *   onSort    {fn}      - (key, dir) => void
 */
const SortControls = ({ columns, sortKey, sortDir, onSort }) => {
    const sortableColumns = columns.filter((col) => col.sortable && !col.hidden);

    if (sortableColumns.length === 0) return null;

    return (
        <div className="sc-wrapper" role="group" aria-label="Sort options">
        <label className="sc-label" htmlFor="sc-col-select">
            Sort by
        </label>

        <select
            id="sc-col-select"
            className="sc-select"
            value={sortKey ?? ''}
            onChange={(e) => onSort(e.target.value || null, sortDir || 'asc')}
            aria-label="Sort column"
        >
            <option value="">— None —</option>
            {sortableColumns.map((col) => (
                <option key={col.key} value={col.sortKey ?? col.key}>
                    {col.header}
                </option>
            ))}
        </select>

        <select
            id="sc-dir-select"
            className="sc-select sc-select--dir"
            value={sortDir ?? 'asc'}
            onChange={(e) => onSort(sortKey, e.target.value)}
            disabled={!sortKey}
            aria-label="Sort direction"
        >
            <option value="asc">A → Z</option>
            <option value="desc">Z → A</option>
        </select>
        </div>
    );
}

export default SortControls;