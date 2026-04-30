import { useState } from 'react';
import Table from './TableComp/Table';
import './styles.css';
import { DEMO_COLS, DEMO_DATA } from './sampleData1.jsx';
import TableController from '../../components/Table/TableController.jsx';

const TableDemo = () => {

    const [data, setData] = useState(DEMO_DATA);
    const handleAction = (actionId, row) => {
        if (actionId === 'edit') console.log('edit', row);
        if (actionId === 'delete') console.log('delete', row);
    }
    
    return (
        <>
            {/* Basic Table */}
            <TableController 
                variant='basic'
                columns={DEMO_COLS}
                data={DEMO_DATA}
                onAction={handleAction}
            />
            <br /><hr /><br />
            {/* Sortable */}
            <TableController 
                variant='sortable'
                columns={DEMO_COLS}
                data={DEMO_DATA}
                onAction={handleAction}
                searchPlaceholder={'Search...'}
                showSortControls={true}
            />
        </>        
    )

    /* 
    return (<>        
        {data.length > 0 && 
            <>
                <p>{data.length} records</p>
                <Table 
                    columns={DEMO_COLS}
                    data={data}
                    emptyMessage='No data, try again...'
                />
            </>            
        }
        {(!data || data.length === 0) && 
            <p>No Table Data</p>
        } 
    </>)
    */
    
}

export default TableDemo;