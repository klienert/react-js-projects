import { useState } from 'react';
import Table from './TableComp/Table';
import './TableComp/table.css';
import { DEMO_COLS, DEMO_DATA } from './sampleData1.jsx';

const TableDemo = () => {

    const [data, setData] = useState(DEMO_DATA);

    return (<>        
        {data.length > 0 && 
            <div className='table-demo'>
                <p>{data.length} records</p>
                <Table 
                    columns={DEMO_COLS}
                    data={data}
                    emptyMessage='No data, try again...'
                />
            </div>
        }
        {(!data || data.length === 0) && 
            <div className='table-demo'>
                <p>No Table Data</p>
            </div>            
        } 
    </>)
}

export default TableDemo;