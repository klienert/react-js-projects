import { useState, useMemo, useEffect } from 'react';
import './table.css';
// -------------------------- Column Definitons ------------------------------------------------------------- //
// Each column accepts:

// key          - matches the key in your data obj 
// header       - display label 
// render       - optional func(val, row) for custom cell content (links, badges, etc.)
// width        - optional CSS width string
// align        - "left" | "center" | "right"
// sortable     - boolean; enables click-to-sort on this column
// sortFn       - optional custom comparator func(a, b, direction) for this column
// fitlerable   - boolean; enables per-column filter
// filterType   - 'text', 'select', 'number', (default: 'text')
//                'select' auto-populates options from data
//                'number' filters rows where value >= the input
// filterFn     - optional custom filter func(cellValue, filterValue, row)
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

// Filtering Feature

const matchesGlobal = (row, columns, query) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return columns.some((col) => {
        if (!col.filterable && col.filterType !== undefined ) return false;
        // skip action/render-only columns from global search
        if (col.render && !col.filterable) return false;
        const val = row[col.key];
        return val != null && String(val).toLowerCase().includes(q);
    });
}

const matchesColumnFilters = (row, columns, colFilters) => {
    return columns.every((col) => {
        const filterVal = colFilters[col.key];
        if (filterVal == null || filterVal === "") return true;
    
        const cellVal = row[col.key];
    
        // Custom override
        if (col.filterFn) return col.filterFn(cellVal, filterVal, row);
    
        const type = col.filterType ?? "text";
    
        if (type === "select") {
            return String(cellVal) === String(filterVal);
        }
        if (type === "number") {
            return Number(cellVal) >= Number(filterVal);
        }
        
        // text (default)
        return String(cellVal ?? "").toLowerCase().includes(String(filterVal).toLowerCase());
    });
}

const useFilteredData = (data, columns, globalQuery, colFilters) => {
    return useMemo(() => {
        return data.filter(
            (row) =>
                matchesGlobal(row, columns, globalQuery) &&
                matchesColumnFilters(row, columns, colFilters)
        );
    }, [data, columns, globalQuery, colFilters]);
}

// unique option lists for select filters, derived from the data
const useSelectOptions = (data, columns) => {
    return useMemo(() => {
        const map = {};
        columns.forEach((col) => {
            if (col.filterType === "select") {
                const unique = [...new Set(data.map((r) => r[col.key]).filter((v) => v != null))].sort();
                map[col.key] = unique;
            }
        });
        return map;
    }, [data, columns]);
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

const TableHeader = ({ columns, sortState, onSort, colFilters, onColFilter, selectOptions }) => {
    const hasAnyFilter = columns.some((c) => c.filterable);

    return (
        <thead>
            {/* Sort Row */}
            <tr>
                {columns.map((col) => {
                    const isSorted = sortState?.key === col.key;
                    const sortDir = isSorted ? sortState.dir : null;
                    return (
                        <th 
                            key={col.key}
                            style={{
                                width: col.width, textAlign: col.align ?? 'left', 
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
            {/* Per column filter row */}
            {hasAnyFilter && (
                <tr className='filter-row'>
                    {columns.map((col) => (
                        <td key={col.key} className='filter-cell'>
                            {col.filterable && col.filterType === 'select' && (
                                <select
                                    value={colFilters[col.key] ?? ""}
                                    onChange={(e) => onColFilter(col.key, e.target.value)}
                                    className='filter-select'
                                    aria-label={`Filter by ${col.header}`}
                                >
                                    <option value="">All</option>
                                    {(selectOptions[col.key] ?? []).map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            )}
                            {col.filterable && col.filterType === 'number' && (
                                <input 
                                    type='number'
                                    placeholder="≥"
                                    value={colFilters[col.key] ?? ""}
                                    onChange={(e) => onColFilter(col.key, e.target.value)}
                                    className='filter-input'
                                    aria-label={`Filter by ${col.header} minimum`}
                                />
                            )}
                            {col.filterable && col.filterType === 'text' && (
                                <input 
                                    type='text'
                                    placeholder="Filter..."
                                    value={colFilters[col.key] ?? ""}
                                    onChange={(e) => onColFilter(col.key, e.target.value)}
                                    className='filter-input'
                                    aria-label={`Filter by ${col.header}`}
                                />
                            )}
                        </td>
                    ))}
                </tr>
            )}
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
    showGlobalSearch = true,
}) => {
    const [sortState, setSortState] = useState(defaultSort ?? null);
    const [globalQuery, setGlobalQuery] = useState("");
    const [colFilters, setColFilters] = useState({});

    const handleSort = (key) => {        
        setSortState((prev) => {
            if (prev?.key !== key)  return { key, dir: "asc" };
            if (prev.dir === "asc") return { key, dir: "desc" };
            return null;
        });
    }

    const handleColFilter = (key, value) => {
        setColFilters((prev) => ({...prev, [key]: value}));
    }

    const clearAllFilters = () => {
        setGlobalQuery("");
        setColFilters({});
    }

    const selectOptions  = useSelectOptions(data, columns);
    const filteredData   = useFilteredData(data, columns, globalQuery, colFilters);
    const sortedFiltered = useSortedData(filteredData, sortState, columns);

    const hasActiveFilters = globalQuery.trim() !== "" ||
        Object.values(colFilters).some((v) => v != null && v !== "");

    useEffect(() => {
        // console.log(data, columns);
        // console.log('selectOptions: ', selectOptions);
        // console.log('sortedFiltered: ', sortedFiltered);
    },[]);

    return (
        <div className="table-container">
            {/* Global Search Bar */}
            {showGlobalSearch && (
                <div className='toolbar'>
                    <div className='search-wrapper'>
                        <svg className="search-icon" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <circle cx="6.5" cy="6.5" r="5" stroke="#a8a29e" strokeWidth="1.5"/>
                            <path d="M10.5 10.5 L14 14" stroke="#a8a29e" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        <input 
                            type='text'
                            placeholder='Search all columns'
                            value={globalQuery}
                            onChange={(e) => setGlobalQuery(e.target.value)}
                            className='search-input'
                            aria-label='Search Table'
                        />
                        {globalQuery && (
                            <button className='search-clear-btn' onClick={() => setGlobalQuery('')} aria-label='Clear Search'>X</button>
                        )}
                    </div>
                    <span className='search-result-count'>
                        {sortedFiltered.length} of {data.length}
                    </span>
                    {hasActiveFilters && (
                        <button className='search-reset-btn' onClick={clearAllFilters}>Clear all filters</button>
                    )}
                </div>
            )}
            <div className='table-wrapper'>
                <table className="table">
                    {caption && <caption>{caption}</caption>}
                    <TableHeader 
                        columns={columns} 
                        sortState={sortState} 
                        onSort={handleSort} 
                        colFilters={colFilters}
                        onColFilter={handleColFilter}
                        selectOptions={selectOptions}
                    />
                    <tbody>
                        {sortedFiltered.length === 0 ? (
                            <EmptyState colCount={columns.length} message={emptyMessage} />
                        ): (
                            sortedFiltered.map((row, i) => (
                                <TableRow key={row.id ?? i} row={row} columns={columns} rowIndex={i} />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table;