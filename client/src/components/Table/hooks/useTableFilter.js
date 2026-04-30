import { useState, useMemo, useCallback } from 'react';

/**
 * useTableFilter
 *
 * Handles global search bar filtering across all searchable columns.
 * Per-column filtering is tracked separately and can be wired up later.
 *
 * @param {object} options
 * @param {array}   options.data        - dataset to filter (post-sort or pre-sort, your choice)
 * @param {array}   options.columns     - column definitions (respects col.filterable !== false)
 * @param {boolean} options.serverSide  - if true, skip client filtering, just track state
 *
 * @returns {object}
 *   filteredData    {array}   - data after applying all active filters
 *   searchQuery     {string}  - current global search string
 *   setSearchQuery  {fn}      - (query: string) => void
 *   columnFilters   {object}  - { [colKey]: value } map of per-column filters
 *   setColumnFilter {fn}      - (colKey, value) => void
 *   clearFilters    {fn}      - resets everything
 *   hasActiveFilter {bool}    - true if any filter is currently applied
 */

export function useTableFilter({
    data = [],
    columns = [],
    serverSide = false,
} = {}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [columnFilters, setColumnFilters] = useState({});

    const setColumnFilter = useCallback((colKey, value) => {
        setColumnFilters((prev) => {
        if (!value) {
            const next = { ...prev };
            delete next[colKey];
            return next;
        }
        return { ...prev, [colKey]: value };
        });
    }, []);

    const clearFilters = useCallback(() => {
        setSearchQuery('');
        setColumnFilters({});
    }, []);

    const hasActiveFilter =
        searchQuery.trim().length > 0 || Object.keys(columnFilters).length > 0;

    // Columns eligible for global search — all visible, non-actions columns
    // unless col.filterable is explicitly set to false
    const searchableKeys = useMemo(
        () =>
        columns
            .filter(
            (col) =>
                !col.hidden &&
                col.filterable !== false &&
                !col.actions &&
                typeof col.render !== 'function' // can't search inside custom renders
            )
            .map((col) => col.key),
        [columns]
    );

    const filteredData = useMemo(() => {
        if (serverSide) return data;

        let result = data;

        // 1. Global search — match any searchable column
        const trimmed = searchQuery.trim().toLowerCase();
        if (trimmed) {
        result = result.filter((row) =>
            searchableKeys.some((key) => {
            const val = row[key];
            if (val === null || val === undefined) return false;
            return String(val).toLowerCase().includes(trimmed);
            })
        );
        }

        // 2. Per-column filters (exact match by default)
        const activeColFilters = Object.entries(columnFilters);
        if (activeColFilters.length > 0) {
        result = result.filter((row) =>
            activeColFilters.every(([key, filterVal]) => {
            const val = row[key];
            if (val === null || val === undefined) return false;
            return String(val).toLowerCase().includes(String(filterVal).toLowerCase());
            })
        );
        }

        return result;
    }, [data, searchQuery, columnFilters, searchableKeys, serverSide]);

    return {
        filteredData,
        searchQuery,
        setSearchQuery,
        columnFilters,
        setColumnFilter,
        clearFilters,
        hasActiveFilter,
    };
}