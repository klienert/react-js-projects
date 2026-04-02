import { useState } from 'react';
import Table from './TableComp/Table';
import './styles.css';
import { DEMO_COLS, DEMO_DATA } from './sampleData1.jsx';

const TableDemo = () => {

    const [data, setData] = useState(DEMO_DATA);

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
}

export default TableDemo;