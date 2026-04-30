const CellContent = ({ col, row, onAction }) => {
    const value = row[col.key];

    // plain value
    if (value === null || value === undefined) {
        return <span className="tr-empty">-</span>
    }
    
    // custom render
    if (typeof col.render === 'function') {
        return <>{col.render(value, row)}</>
    }
    
    // link
    if (typeof col.link === 'function') {
        const href = col.link(row);
        console.log('href? ', col, 'value: ', value);
        return (
            <a
                href={href}
                className="tr-link"
                onClick={(e) => e.stopPropagation()}
            >
                {value}
            </a>
        )
    }

    // array of buttons
    if (Array.isArray(col.actions) && col.actions.length > 0) {
        return (
            <div className="tr-actions">
                {col.actions.map((action) => (
                    <button
                        key={action.actionId}
                        className={`tr-action-btn tr-action-btn--${action.variant || 'default'}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            onAction?.(action.actionId, row);
                        }}
                        aria-label={`${action.label} ${row[col.key] ?? ''}`}
                    >
                        {action.label}
                    </button>
                ))}
            </div>
        )
    }

    return <>{String(value)}</>;
}

/**
 * Render the table row
 * 
 * Props: 
 *   row        {object}   - the data record
 *   columns    {array}    - column definitions
 *   onAction   {fn}       - (actionId, row) => void
 *   onRowClick {fn}       - (row) => void  — if provided, row is clickable
 *   isSelected {bool}     - highlights the row (for selection feature)
 *   rowIndex   {number}   - used for aria-rowindex
 * @returns single <tr> with cells
 */
const TableRow = ({
    row, 
    columns, 
    onAction,
    onRowClick, 
    isSelected = false, 
    rowIndex
}) => {
    const isClickable = typeof onRowClick === 'function';

    const handleKeyDown = (e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onRowClick(row);
        }
    }
    return (
        <tr
            className={['tr-row',
                rowIndex % 2 === 0 ? 'tr-odd' : 'tr-even',
                isClickable ? 'tr-row--clickable' : '',
                isSelected ? 'tr-row--selected' : '',
            ]
                .filter(Boolean)
                .join(' ')}
            onClick={isClickable ? () => onRowClick(row) : undefined}
            onKeyDown={handleKeyDown}
            tabIndex={isClickable ? 0 : undefined}
            role={isClickable ? 'button' : undefined}
            aria-rowindex={rowIndex}
            aria-selected={isSelected || undefined}
        >
            {columns
                .filter((col) => !col.hidden)
                .map((col) => (
                    <td
                        key={col.key}
                        className="tr-cell"
                        style={{
                            width: col.width ?? undefined,
                            textAlign: col.align ?? 'left',
                        }}
                    >
                        {col.truncate ? (
                            <span className="tr-truncate" title={String(row[col.key] ?? '')}>
                                <CellContent col={col} row={row} onAction={onAction} />
                            </span>
                        ) : (
                            <CellContent col={col} row={row} onAction={onAction} />
                        )}
                    </td>
                ))
            }
        </tr>
    )
}

export default TableRow;