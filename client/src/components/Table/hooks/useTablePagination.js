import { useState, useMemo, useEffect } from 'react';

/**
 * useTablePagination
 *
 * Manages current page, rows-per-page, and returns the correct slice of data.
 * Automatically resets to page 1 when the dataset length changes
 * (e.g. after a filter is applied).
 *
 * @param {object} options
 * @param {array}   options.data           - filtered + sorted dataset to paginate
 * @param {number}  options.initialPage    - starting page (1-indexed, default: 1)
 * @param {number}  options.initialPerPage - rows per page on mount (default: 10)
 * @param {array}   options.perPageOptions - choices for the rows-per-page select
 * @param {boolean} options.serverSide     - if true, skip slicing, just track state
 * @param {number}  options.totalRows      - required when serverSide: true
 *
 * @returns {object}
 *   paginatedData  {array}   - the current page's rows
 *   page           {number}  - current page (1-indexed)
 *   perPage        {number}  - rows per page
 *   totalPages     {number}  - total number of pages
 *   totalRows      {number}  - total row count (before pagination)
 *   setPage        {fn}      - (page: number) => void
 *   setPerPage     {fn}      - (n: number) => void  — resets to page 1
 *   goToFirst      {fn}
 *   goToPrev       {fn}
 *   goToNext       {fn}
 *   goToLast       {fn}
 *   canPrev        {bool}
 *   canNext        {bool}
 *   rangeStart     {number}  - first row number on current page (1-indexed, for display)
 *   rangeEnd       {number}  - last row number on current page
 */
export function useTablePagination({
    data = [],
    initialPage = 1,
    initialPerPage = 10,
    perPageOptions = [10, 25, 50, 100],
    serverSide = false,
    totalRows: serverTotalRows,
} = {}) {
    const [page, setPageRaw] = useState(initialPage);
    const [perPage, setPerPageRaw] = useState(initialPerPage);

    const totalRows = serverSide ? (serverTotalRows ?? 0) : data.length;
    const totalPages = Math.max(1, Math.ceil(totalRows / perPage));

    // Reset to page 1 whenever the underlying data length changes
    // (covers filter changes, search updates, fresh fetches)
    useEffect(() => {
        setPageRaw(1);
    }, [data.length]);

    const setPage = (p) => {
        const clamped = Math.min(Math.max(1, p), totalPages);
        setPageRaw(clamped);
    };

    const setPerPage = (n) => {
        setPerPageRaw(n);
        setPageRaw(1); // always reset to page 1 when page size changes
    };

    const goToFirst = () => setPage(1);
    const goToPrev  = () => setPage(page - 1);
    const goToNext  = () => setPage(page + 1);
    const goToLast  = () => setPage(totalPages);

    const canPrev = page > 1;
    const canNext = page < totalPages;

    const rangeStart = totalRows === 0 ? 0 : (page - 1) * perPage + 1;
    const rangeEnd   = Math.min(page * perPage, totalRows);

    const paginatedData = useMemo(() => {
        if (serverSide) return data; // server already returned the right slice
        const start = (page - 1) * perPage;
        return data.slice(start, start + perPage);
    }, [data, page, perPage, serverSide]);

    return {
        paginatedData,
        page,
        perPage,
        perPageOptions,
        totalPages,
        totalRows,
        setPage,
        setPerPage,
        goToFirst,
        goToPrev,
        goToNext,
        goToLast,
        canPrev,
        canNext,
        rangeStart,
        rangeEnd,
    };
}