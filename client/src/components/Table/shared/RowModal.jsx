import React, { useEffect, useRef } from 'react';

/**
 * RowModal
 *
 * Generic modal that displays row data when a table row is clicked.
 *
 * Content strategy:
 *   - Default: auto-renders all row fields as a key → value list,
 *     skipping keys that start with '_' or whose values are objects/arrays.
 *   - Override: pass renderModal={(row) => <JSX />} to take full control.
 *
 * Props:
 *   isOpen       {bool}    - controls visibility
 *   rowData      {object}  - the row object to display
 *   onClose      {fn}      - called when modal should close
 *   renderModal  {fn}      - optional: (row) => JSX — overrides auto-render
 *   title        {string}  - optional modal heading
 *   columns      {array}   - optional: used to get human-readable header labels
 *                            for the auto-render fallback
 */
export default function RowModal({
    isOpen,
    rowData,
    onClose,
    renderModal,
    title,
    columns = [],
}) {
    const overlayRef  = useRef(null);
    const closeBtnRef = useRef(null);

    // Escape key to close
    useEffect(() => {
            if (!isOpen) return;
            const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
            document.addEventListener('keydown', handleKey);
            return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    // Lock body scroll while open
    useEffect(() => {
        if (isOpen) {
        document.body.style.overflow = 'hidden';
        setTimeout(() => closeBtnRef.current?.focus(), 50);
        } else {
        document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Click outside to close
    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) onClose();
    };

    if (!isOpen && !rowData) return null;

    // Build a label map from column definitions for nicer auto-render keys
    const labelMap = columns.reduce((acc, col) => {
        acc[col.key] = col.header;
        return acc;
    }, {});

    return (
        <div
            ref={overlayRef}
            className={`rm-overlay ${isOpen ? 'rm-overlay--open' : ''}`}
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-label={title ?? 'Row details'}
        >
            <div className={`rm-panel ${isOpen ? 'rm-panel--open' : ''}`}>

                {/* Header */}
                <div className="rm-header">
                    <h2 className="rm-title">{title ?? 'Details'}</h2>
                    <button
                        ref={closeBtnRef}
                        className="rm-close"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="rm-body">
                    {typeof renderModal === 'function'
                        ? renderModal(rowData)
                        : rowData
                            ? <AutoRowContent row={rowData} labelMap={labelMap} />
                            : null
                    }
                </div>
            </div>
        </div>
    );
}

/**
 * AutoRowContent
 * Default render: displays each row field as a labelled key/value pair.
 * Skips keys starting with '_'.
 * Null/undefined renders as —.
 * Objects/arrays are JSON stringified.
 */
function AutoRowContent({ row, labelMap }) {
    const entries = Object.entries(row).filter(([key]) => !key.startsWith('_'));

    return (
        <dl className="rm-auto-list">
        {entries.map(([key, value]) => {
            const label = labelMap[key] ?? toLabel(key);
            let display;

            if (value === null || value === undefined) {
                display = <span className="rm-empty">—</span>;
            } else if (typeof value === 'object') {
                display = <code className="rm-code">{JSON.stringify(value, null, 2)}</code>;
            } else {
                display = String(value);
            }

            return (
            <div key={key} className="rm-auto-row">
                <dt className="rm-auto-label">{label}</dt>
                <dd className="rm-auto-value">{display}</dd>
            </div>
            );
        })}
        </dl>
    );
}

// "createdBy" → "Created By",  "updated_at" → "Updated At"
function toLabel(key) {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (s) => s.toUpperCase())
        .replace(/_/g, ' ')
        .trim();
}