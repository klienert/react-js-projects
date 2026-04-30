const SortIndicator = ({ direction }) => {
    return (
        <span className="th-sort-icon" aria-hidden="true">
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
            {/* Up chevron — active when asc */}
                <path
                    d="M5 1L9 6H1L5 1Z"
                    fill={direction === 'asc' ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                    opacity={direction === 'asc' ? 1 : 0.3}
                />
                {/* Down chevron — active when desc */}
                <path
                    d="M5 13L1 8H9L5 13Z"
                    fill={direction === 'desc' ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                    opacity={direction === 'desc' ? 1 : 0.3}
                />
            </svg>
        </span>
    )
}


/**
 * Renders Table Header <thead> row
 * 
 * Props:
 *   columns      {array}  - column definitions
 *   sortKey      {string} - currently sorted column key (col.sortKey ?? col.key)
 *   sortDir      {string} - 'asc' | 'desc' | null
 *   onSort       {fn}     - (colKey) => void — called when a sortable header is clicked
 */
const TableHeader = ({ columns, sortKey, sortDir, onSort}) => {
    const handleKeyDown = (e, col) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSort?.(col.sortKey ?? col.key);
        }
    };
    return (
        <thead>
            <tr>
                {columns
                .filter((col) => !col.hidden)
                .map((col) => {
                    const activeSortKey = col.sortKey ?? col.key;
                    const isActive = sortKey === activeSortKey;
                    const isSortable = col.sortable && typeof onSort === 'function';

                    return (
                    <th
                        key={col.key}
                        className={[
                        'th-cell',
                        isSortable ? 'th-cell--sortable' : '',
                        isActive ? 'th-cell--active' : '',
                        ]
                        .filter(Boolean)
                        .join(' ')}
                        style={{
                        width: col.width ?? undefined,
                        textAlign: col.align ?? 'left',
                        }}
                        onClick={isSortable ? () => onSort(activeSortKey) : undefined}
                        onKeyDown={isSortable ? (e) => handleKeyDown(e, col) : undefined}
                        tabIndex={isSortable ? 0 : undefined}
                        aria-sort={
                        isActive
                            ? sortDir === 'asc'
                            ? 'ascending'
                            : 'descending'
                            : isSortable
                            ? 'none'
                            : undefined
                        }
                        scope="col"
                        title={col.ariaLabel ?? col.header}
                    >
                        <span className="th-cell-inner">
                        <span className="th-label">
                            {col.header}
                        </span>
                        {isSortable && (
                            <SortIndicator direction={isActive ? sortDir : null} />
                        )}
                        </span>
                    </th>
                    );
                })}
            </tr>
        </thead>
    )
}

export default TableHeader;