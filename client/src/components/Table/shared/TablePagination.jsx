import React from 'react';

/**
 * TablePagination
 *
 * Renders the full pagination bar:
 *   [rows-per-page select]  [range text]  [first][prev]...[next][last]
 *
 * Props: spread the return value of useTablePagination directly.
 */
const TablePagination = ({
    page,
    perPage,
    perPageOptions,
    totalPages,
    totalRows,
    rangeStart,
    rangeEnd,
    setPage,
    setPerPage,
    goToFirst,
    goToPrev,
    goToNext,
    goToLast,
    canPrev,
    canNext,
}) => {
    if (totalRows === 0) return null;

    // Build a compact page-window: always show first, last, current ± 1
    const pageNumbers = buildPageWindow(page, totalPages);

    return (
        <div className="pg-bar" role="navigation" aria-label="Table pagination">

            {/* Rows per page */}
            <div className="pg-perpage">
                <label className="pg-perpage-label" htmlFor="pg-perpage-select">Rows</label>
                <select
                    id="pg-perpage-select"
                    className="pg-select"
                    value={perPage}
                    onChange={(e) => setPerPage(Number(e.target.value))}
                    aria-label="Rows per page"
                >
                {perPageOptions.map((n) => (
                    <option key={n} value={n}>{n}</option>
                ))}
                </select>
            </div>

            {/* Range summary */}
            <span className="pg-range" aria-live="polite" aria-atomic="true">
                {rangeStart}–{rangeEnd} of {totalRows}
            </span>

            {/* Page controls */}
            <div className="pg-controls">
                <button
                    className="pg-btn"
                    onClick={goToFirst}
                    disabled={!canPrev}
                    aria-label="First page"
                >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 2V12M7 2L3 7L7 12M11 2L7 7L11 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </button>

                <button
                    className="pg-btn"
                    onClick={goToPrev}
                    disabled={!canPrev}
                    aria-label="Previous page"
                >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 2L5 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </button>

                {pageNumbers.map((p, i) =>
                    p === '...' ? (
                        <span key={`ellipsis-${i}`} className="pg-ellipsis">…</span>
                ) : (
                    <button
                        key={p}
                        className={`pg-btn pg-btn--page ${p === page ? 'pg-btn--active' : ''}`}
                        aria-label={`Page ${p}`}
                        aria-current={p === page ? 'page' : undefined}
                        onClick={() => setPage(p)}
                        data-page={p}
                    >
                        {p}
                    </button>
                )
                )}
                <button
                    className="pg-btn"
                    onClick={goToNext}
                    disabled={!canNext}
                    aria-label="Next page"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M5 2L9 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                <button
                    className="pg-btn"
                    onClick={goToLast}
                    disabled={!canNext}
                    aria-label="Last page"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M11 2V12M7 2L11 7L7 12M3 2L7 7L3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

// Produces a compact window e.g. [1, '...', 4, 5, 6, '...', 12]
function buildPageWindow(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const pages = new Set([1, total, current, current - 1, current + 1]);
    const sorted = [...pages]
        .filter((p) => p >= 1 && p <= total)
        .sort((a, b) => a - b);

    const result = [];
    for (let i = 0; i < sorted.length; i++) {
        if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('...');
        result.push(sorted[i]);
    }
    return result;
}

export default TablePagination;