// sub-components

const TableHeader = ({ columns }) => {
    return (
        <thead>
            <tr>
                {columns.map((col) => (
                    <th 
                        key={col.key}
                        style={{
                            width: col.width,
                            textAlign: col.align ?? 'left'
                        }}
                    >
                        {col.header}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

const TableRow = ({ row, columns, rowIndex }) => {
    return (
        <tr className={rowIndex % 2 === 0 ? 'row-even' : 'row-odd'}>
            {columns.map((col) => {
                const value = row[col.key];
                return (
                    <td
                        key={col.key}
                        style={{ textAlign: col.align ?? 'left'}}
                    >
                        {col.render ? col.render(value, row) : value ?? '-'}
                    </td>
                );
            })}
        </tr>
    );    
}

const EmptyState = ({ colCount, message = "No data to display."}) => {
    return (
        <tr>
            <td colSpan={colCount} className="empty-state">
                {message}
            </td>
        </tr>
    );
}

/**
 * @props - columns, data, emptyMessage, caption
 * @param {Object}
 * @returns 
 */
const Table = ({
    columns = [],
    data = [],
    emptyMessage,
    caption
}) => {

    return (
        <div className="table-wrapper">
            <table className="table">
                {caption && <caption>{caption}</caption>}
                <TableHeader columns={columns} />
                <tbody>
                    {data.length === 0 ? (
                        <EmptyState colCount={columns.length} message={emptyMessage} />
                    ): (
                        data.map((row, i) => (
                            <TableRow key={row.id ?? i} row={row} columns={columns} rowIndex={i} />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table;