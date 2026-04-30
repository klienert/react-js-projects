import './table.css';
import BasicTable from "./variants/BasicTable";
import SortableTable from './variants/SortableTable';


const TABLE_REGISTRY = {
    basic: BasicTable,
    sortable: SortableTable,
    // data
    // server
    // etc.
};


/**
 * TableController - Single entry point for table variants
 * 
 * Required props:
 * - variant         {string}        - one of the keys in TABLE_REGISTRY (basic, sortable, ...)
 * - columns         {array}         - column definitions
 * - data            {array}         - array of row objects
 * 
 * Optional props:
 *  - onAction        {fn}            - (actionId, row) => void
 *  - onRowClick      {fn}            - (row) => void
 *  - onFetch         {fn}            - (params) => void (ServerTable only)
 *  - caption         {string}        - accessible table caption
 *  - emptyMessage    {string}        - shown when data is empty
 *  - className       {string}        - extra class on the wrapper
 *  - renderModal     {fn}            - (row) -> <JSX> (DataTable+ only)
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