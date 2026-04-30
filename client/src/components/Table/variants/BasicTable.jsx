import React from "react";
import TableHeader from '../shared/TableHeader';
import TableRow from '../shared/TableRow';

/**
 * Renders the basic table
 * 
 * Props:
 *  columns         {array}
 *  data            {array}
 *  onAction        {fn}
 *  caption         {string}
 *  className       {string}
 *  emptyMessage    {string}
 *  
 *  TableHeader     {@link TableHeader}
 *  TableRow        {@link TableRow}
 */
const BasicTable = ({
    columns = [],
    data = [],
    onAction,
    caption,
    className = '',
    emptyMessage = 'No Data Available',
}) => {
    const visibleColumns = columns.filter((col) => !col.hidden);

    return (
        <div className={`bt-wrapper ${className}`.trim()}>
            <table className="bt-table" role="grid" aria-label={caption ?? undefined}>
                {caption && <caption className="bt-caption">{caption}</caption>}
                <TableHeader
                    columns={visibleColumns}
                    sortKey={null}
                    sortDir={null}
                    onSort={null}
                />
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={visibleColumns.length}
                                className="bt-empty"
                                aria-live="polite"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, index) => (
                            <TableRow
                                key={row.id ?? index}
                                row={row}
                                columns={visibleColumns}
                                onAction={onAction}
                                rowIndex={index + 1}
                            />
                        ))
                    )}
                </tbody>
          </table>
        </div>
      );
}

export default BasicTable;