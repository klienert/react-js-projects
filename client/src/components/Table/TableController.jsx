import './table.css';
import BasicTable from "./variants/BasicTable";
import DataTable from './variants/DataTable';
import SortableTable from './variants/SortableTable';
import ServerTable from './variants/ServerTable';

const TABLE_REGISTRY = {
    basic: BasicTable,
    sortable: SortableTable,
    data: DataTable,
    server: ServerTable
    // etc.
};


/**
 * TableController - Single entry point for table variants
 * 
 * Required props:
 * - variant         {string}        - one of the keys in TABLE_REGISTRY
 * - columns         {array}         - column definitions
 * - data            {array}         - array of row objects
 * 
 * **variant keys: 
 * - basic      - {@link BasicTable}
 * - sortable   - {@link SortableTable}
 * - data       - {@link DataTable}
 * - server     - {@link ServerTable}
 * 
 * Optional props:
 *  - onAction        {fn}            - (actionId, row) => void
 *  - onRowClick      {fn}            - (row) => void
 *  - onFetch         {fn}            - (params) => void (ServerTable only)
 *  - caption         {string}        - accessible table caption
 *  - emptyMessage    {string}        - shown when data is empty
 *  - className       {string}        - extra class on the wrapper
 *  - renderModal     {fn}            - (row) -> <JSX> 
 *  - modalTitle      {string}
 * 
 *  - onFetch         {fn}            - ({ page, perPage, sortKey, sortDir, search }) => void
 *  - totalRows       {number}        - total row count (ServerTable)
 *  - loading         {bool}          - loading state (ServerTable)
 *  - syncToUrl       {bool}          - sync state to URL params (ServerTable)
 *  - urlPrefix       {string}        - namespace URL params (ServerTable)
 * 
 */
const TableController = ({ variant = 'basic', ...props }) => {
    const TableComponent = TABLE_REGISTRY[variant];

    if (!TableComponent) {
        const available = Object.keys(TABLE_REGISTRY).join(', ');
        console.error(
            `[TableController Unknown variant "${variant}" . Available.: ${available}]`
        );
        return (
            <div style={{ padding: '1rem', color: '#dc2626', fontSize: '0.9rem' }}>
                Unknown table variant <strong>"{variant}"</strong>. Available: {available}
            </div>
        )
    }

    return <TableComponent {...props} />;
}

export default TableController;