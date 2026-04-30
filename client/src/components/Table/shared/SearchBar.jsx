import React, { useRef } from 'react';

/**
 * SearchBar
 *
 * Controlled search input used by SortableTable and DataTable.
 *
 * Props:
 *   value       {string}  - controlled value
 *   onChange    {fn}      - (query: string) => void
 *   placeholder {string}
 *   disabled    {bool}
 */
export default function SearchBar({
    value,
    onChange,
    placeholder = 'Search…',
    disabled = false,
}) {
    const inputRef = useRef(null);

    return (
        <div className="sb-wrapper">
        <span className="sb-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
        </span>

        <input
            ref={inputRef}
            className="sb-input"
            type="search"
            role="searchbox"
            aria-label={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            spellCheck={false}
        />

        {value && (
            <button
            className="sb-clear"
            onClick={() => { onChange(''); inputRef.current?.focus(); }}
            aria-label="Clear search"
            tabIndex={0}
            >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            </button>
        )}
        </div>
    );
}