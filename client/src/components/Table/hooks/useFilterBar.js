import { useState, useMemo, useCallback } from 'react';

/**
 * useFilterBar
 *
 * Manages filter button state for columns that have a `filters` array defined.
 * Supports single-select and multi-select modes per the `filterMode` prop.
 *
 * Single mode: one value active per column at a time.
 *   state shape: { status: 'active', region: 'Demo' }
 *
 * Multi mode: multiple values can be active per column.
 *   state shape: { status: ['active', 'pending'], region: ['Demo'] }
 *   Selecting a null-value button clears that column's filter entirely.
 *
 * @param {object} options
 * @param {array}   options.data        - dataset to filter (omit for server-side)
 * @param {array}   options.columns     - column definitions
 * @param {string}  options.filterMode  - 'single' | 'multi' (default: 'single')
 * @param {boolean} options.serverSide  - if true, skip client filtering
 *
 * @returns {object}
 *   filteredData    {array}   - data after applying all active button filters
 *   activeFilters   {object}  - current filter state map
 *   setFilter       {fn}      - (colKey, value) => void
 *   clearFilters    {fn}      - resets all filters
 *   isActive        {fn}      - (colKey, value) => bool — for button active state
 *   hasActiveFilter {bool}    - true if any filter is currently applied
 *   filterColumns   {array}   - columns that have a filters array defined
 */
export function useFilterBar({
    data = [],
    columns = [],
    filterMode = 'single',
  serverSide = false,
} = {}) {
    const isMulti = filterMode === 'multi';

    // Columns that have filter button definitions
    const filterColumns = useMemo(
        () => columns.filter((col) => Array.isArray(col.filters) && col.filters.length > 0),
        [columns]
    );

    // Initial state — all filters null (no filter applied)
    const buildInitialState = useCallback(() =>
        filterColumns.reduce((acc, col) => {
        acc[col.key] = isMulti ? [] : null;
        return acc;
        }, {}),
        [filterColumns, isMulti]
    );

    const [activeFilters, setActiveFilters] = useState(() => buildInitialState());

    // ── setFilter ────────────────────────────────────────────────────────
    const setFilter = useCallback((colKey, value) => {
        setActiveFilters((prev) => {
        if (!isMulti) {
            // Single mode — just set the value (null clears it)
            return { ...prev, [colKey]: value };
        }

        // Multi mode
        if (value === null) {
            // null value button = "All" = clear this column's filter
            return { ...prev, [colKey]: [] };
        }

        const current = prev[colKey] ?? [];
        const alreadyActive = current.includes(value);

        // Toggle off if already active
        const next = alreadyActive
            ? current.filter((v) => v !== value)
            : [...current, value];

        return { ...prev, [colKey]: next };
        });
    }, [isMulti]);

    const clearFilters = useCallback(() => {
        setActiveFilters(buildInitialState());
    }, [buildInitialState]);

    // ── isActive — drives the active button style ────────────────────────
    const isActive = useCallback((colKey, value) => {
        const current = activeFilters[colKey];
        if (!isMulti) {
        // Single: null value button is active when filter is null (nothing selected)
        return value === null ? current === null : current === value;
        }
        // Multi: null value button is active when array is empty
        if (value === null) return !current || current.length === 0;
        return Array.isArray(current) && current.includes(value);
    }, [activeFilters, isMulti]);

    const hasActiveFilter = useMemo(() => {
        return Object.entries(activeFilters).some(([, v]) =>
        isMulti ? Array.isArray(v) && v.length > 0 : v !== null
        );
    }, [activeFilters, isMulti]);

    // ── Client-side filtering ────────────────────────────────────────────
    const filteredData = useMemo(() => {
        if (serverSide) return data;
        if (!hasActiveFilter) return data;

        return data.filter((row) =>
        Object.entries(activeFilters).every(([colKey, filterVal]) => {
            // No filter active on this column — pass through
            if (!isMulti && filterVal === null) return true;
            if (isMulti && (!filterVal || filterVal.length === 0)) return true;

            const rowVal = row[colKey];

            if (!isMulti) {
            return String(rowVal).toLowerCase() === String(filterVal).toLowerCase();
            }

            // Multi — row value must match at least one active filter
            return filterVal.some(
            (v) => String(rowVal).toLowerCase() === String(v).toLowerCase()
            );
        })
        );
    }, [data, activeFilters, hasActiveFilter, isMulti, serverSide]);

    return {
        filteredData,
        activeFilters,
        setFilter,
        clearFilters,
        isActive,
        hasActiveFilter,
        filterColumns,
    };
}