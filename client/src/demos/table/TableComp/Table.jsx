import { useState, useMemo } from 'react';
// -------------------------- Column Definitons ------------------------------------------------------------- //
// Each column accepts:

// key      - matches the key in your data obj 
// header   - display label 
// render   - optional func(val, row) for custom cell content (links, badges, etc.)
// width    - optional CSS width string
// align    - "left" | "center" | "right"
// sortable - boolean; enables click-to-sort on this column
// sortFn   - optional custom comparator func(a, b, direction) for this column
// ---------------------------------------------------------------------------------------------------------- //


// Sorting Feature
const defaultSortFn = (a, b) => {
    if (a === null && b === null) return 0;
    if (a === null) return 1;
    if (b === null) return -1;
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    return String(a).localeCompare(String(b)); 
}

const useSortedData = (data, sortState, columns) => {
    return useMemo(() => {
        if (!sortState) return data;
        const col = columns.find((c) => c.key === sortState.key);
        if (!col) return data;
        const compareFn = col.sortFn ?? defaultSortFn;
        return [...data].sort((rowA, rowB) => {
            const result = compareFn(rowA[sortState.key], rowB[sortState.key], sortState.dir);
            return sortState.dir === 'asc' ? result : -result;
        });
    }, [data, sortState, columns]);
}

const SortIcon = ({ state }) => {
    // state: null | "asc" | "desc"
    const up   = state === "asc"  ? "#1c1917" : "#d4d0cc";
    const down = state === "desc" ? "#1c1917" : "#d4d0cc";
    return (
        <svg
        width="10" height="14"
        viewBox="0 0 10 14"
        style={{ marginLeft: 6, flexShrink: 0, verticalAlign: "middle" }}
        aria-hidden="true"
        >
        <path d="M5 1 L9 5 L1 5 Z"  fill={up}   />
        <path d="M5 13 L9 9 L1 9 Z" fill={down} />
        </svg>
    );
}


// sub-components

const TableHeader = ({ columns, sortState, onSort }) => {
    return (
        <thead>
            <tr>
                {columns.map((col) => {
                    const isSorted = sortState?.key === col.key;
                    const sortDir = isSorted ? sortState.dir : null;
                    return (
                        <th 
                            key={col.key}
                            style={{
                                width: col.width,
                                textAlign: col.align ?? 'left',
                                cursor: col.sortable ? 'pointer' : 'default'
                            }}
                            className={col.sortable ? 'th-sortable' : ''}
                            onClick={col.sortable ? () => onSort(col.key) : undefined }
                            aria-sort={isSorted ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined }
                        >
                            <span style={{ display: 'inline-flex', alignItems: 'center'}}>
                                {col.header}
                                {col.sortable && <SortIcon state={sortDir} />}
                            </span>
                        </th>
                    )
                })}
            </tr>
        </thead>
    );
}

const TableRow = ({ row, columns, rowIndex }) => {
    return (
        <tr className={rowIndex % 2 === 0 ? 'row-even' : 'row-odd'}>
            {columns.map((col) => {
                const value = row[col.key];
                return (
                    <td
                        key={col.key}
                        style={{ textAlign: col.align ?? 'left'}}
                    >
                        {col.render ? col.render(value, row) : value ?? '-'}
                    </td>
                );
            })}
        </tr>
    );    
}

const EmptyState = ({ colCount, message = "No data to display."}) => {
    return (
        <tr>
            <td colSpan={colCount} className="empty-state">
                {message}
            </td>
        </tr>
    );
}

/**
 * @props - columns, data, emptyMessage, caption
 * @param {Object}
 * @returns 
 */
const Table = ({
    columns = [],
    data = [],
    emptyMessage,
    caption,
    defaultSort, // optional: { key: 'colKey', dir: 'asc' | 'desc' }
}) => {

    const [sortState, setSortState] = useState(defaultSort ?? null);

    const handleSort = (key) => {
        setSortState((prev) => {
            if (prev?.key !== key) return { key, dir: 'asc' }
            if (prev.dir === 'asc') return { key, dir: 'desc' }
            return null; // third click resets the sort
        })
    }

    const sortedData = useSortedData(data, sortState, columns);

    return (
        <div className="table-wrapper">
            <table className="table">
                {caption && <caption>{caption}</caption>}
                <TableHeader columns={columns} sortState={sortState} onSort={handleSort} />
                <tbody>
                    {sortedData.length === 0 ? (
                        <EmptyState colCount={columns.length} message={emptyMessage} />
                    ): (
                        sortedData.map((row, i) => (
                            <TableRow key={row.id ?? i} row={row} columns={columns} rowIndex={i} />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table;