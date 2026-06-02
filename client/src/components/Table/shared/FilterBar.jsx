import React from 'react';

/**
 * FilterBar
 *
 * Renders a row of button groups, one per column that has a `filters` array.
 *
 * Props:
 *   filterColumns  {array}   - columns with filters defined (from useFilterBar)
 *   isActive       {fn}      - (colKey, value) => bool
 *   onFilter       {fn}      - (colKey, value) => void
 *   onClearAll     {fn}      - clears all filters
 *   hasActiveFilter {bool}
 *   filterMode     {string}  - 'single' | 'multi'
 *   disabled       {bool}    - disable all buttons (e.g. during server fetch)
 */
export default function FilterBar({
  filterColumns = [],
  isActive,
  onFilter,
  onClearAll,
  hasActiveFilter,
  filterMode = 'single',
  disabled = false,
}) {
  if (filterColumns.length === 0) return null;

  return (
        <div className="fb-bar" role="group" aria-label="Filter options">
        {filterColumns.map((col) => (
            <div key={col.key} className="fb-group">
            <span className="fb-group-label">{col.header}</span>
            <div
                className="fb-buttons"
                role={filterMode === 'multi' ? 'group' : 'radiogroup'}
                aria-label={`Filter by ${col.header}`}
            >
                {col.filters.map((filter) => {
                const active = isActive(col.key, filter.value);
                return (
                    <button
                    key={filter.value ?? '__all__'}
                    className={[
                        'fb-btn',
                        active ? 'fb-btn--active' : '',
                        filter.value === null ? 'fb-btn--all' : '',
                    ].filter(Boolean).join(' ')}
                    onClick={() => onFilter(col.key, filter.value)}
                    disabled={disabled}
                    aria-pressed={filterMode === 'multi' ? active : undefined}
                    aria-checked={filterMode === 'single' ? active : undefined}
                    role={filterMode === 'single' ? 'radio' : 'checkbox'}
                    >
                    {filter.label}
                    {/* Multi mode — show count badge if active and not "All" */}
                    {filterMode === 'multi' && active && filter.value !== null && (
                        <span className="fb-btn-check" aria-hidden="true">✓</span>
                    )}
                    </button>
                );
                })}
            </div>
            </div>
        ))}

        {/* Global clear — only shown when something is active */}
        {hasActiveFilter && (
            <button
                className="fb-clear-all"
                onClick={onClearAll}
                disabled={disabled}
                aria-label="Clear all filters"
            >
            Clear all
            </button>
        )}
        </div>
    );
}