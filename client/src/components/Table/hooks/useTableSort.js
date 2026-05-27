import { useState, useMemo } from "react";

/**
 * useTableSort
 *
 * Manages sort state and returns a sorted copy of the data.
 * Works for both client-side sorting (pass `data`) and server-side
 * (omit `data` — the hook just tracks state for you to pass to onFetch).
 * 
 * @param {object}   options
 * @param {array}    options.data        - full client-side dataset (omit for server)
 * @param {string}   options.initialKey  - column key to sort by on mount (default: null)
 * @param {string}   options.initialDir  - 'asc' | 'desc' (default: 'asc')
 * @param {boolean}  options.serverSide  - if true, skip client sort, just track state
 * 
 * @returns {object}
 *   sortedData   {array}   - sorted data (same as input if serverSide)
 *   sortKey      {string}  - active sort column key
 *   sortDir      {string}  - 'asc' | 'desc' | null
 *   setSort      {fn}      - (key, dir) => void — set both at once
 *   cycleSort    {fn}      - (key) => void — click-to-cycle: none → asc → desc → none
 */
export function useTableSort({
    data = [],
    initialKey = null,
    initialDir = 'asc',
    serverSide = false
} = {}) {
    const [sortKey, setSortKey] = useState(initialKey);
    const [sortDir, setSortDir] = useState(initialKey ? initialDir : null);

    // click column, cycles through asc -> desc -> clear
    const cycleSort = (key) => {
        if (sortKey !== key) {
            setSortKey(key);
            setSortDir('asc');
        } else if (sortDir === 'asc') {
            setSortDir('desc');
        } else if (sortDir === 'desc') {
            setSortKey(null);
            setSortDir(null);
        } else {
            setSortDir('asc');
        }
    };

    const setSort = (key, dir) => {
        setSort(key || null);
        setSortDir(key ? (dir || 'asc') : null);
    }

    const sortedData = useMemo(() => {
        if (serverSide || !sortKey || !sortDir || data.length === 0) return data;

        return [...data].sort((a, b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];

            // Nulls 
            if (aVal == null || aVal === undefined) return 1;
            if (bVal === null || bVal === undefined) return -1;

            let comparison = 0;

            if (typeof aVal === 'number' && typeof bVal === 'number') {
                comparison = aVal - bVal;
            } else if (aVal instanceof Date && bVal instanceof Date) {
                comparison = aVal.getTime() - bVal.getTime();
            } else {
                // strings
                comparison = String(aVal).localeCompare(String(bVal), undefined, {
                    sensitivity: 'base',
                    numeric: true
                });
            }

            return sortDir === 'asc' ? comparison : -comparison;
        })
    }, [data, sortKey, sortDir, serverSide]);

    return { sortedData, sortKey, sortDir, cycleSort }
}