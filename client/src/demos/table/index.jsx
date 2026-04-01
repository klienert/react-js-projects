import { useState } from 'react';
import Table from './TableComp/Table';
import './TableComp/table.css';

// import { DEMO_COLS, DEMO_DATA } from './sampleData1';

const DEMO_COLS = [
    { key: 'name', header: 'Group Name', width: '200px' },
    { key: 'region', header: 'Region' },
    { key: 'district', header: 'District' },
    { key: 'numMembers', header: 'Number of Members', align: 'center' },
    { key: 'action', header: 'Action', render: (val) => <a href={`#`}>{val}</a> }
];

const DEMO_DATA = [
    {id: 1, name: 'Group for Teachers', region: 'Demo', district: 'LOTR ISD', numMembers: 120, action: 'edit'},
    {id: 2, name: 'Group for Coaches', region: 'Demo', district: 'LOTR ISD', numMembers: 18, action: 'edit'},
    {id: 3, name: 'Group for Admin', region: '6', district: 'ESC Region 6', numMembers: 4, action: 'edit'},
    {id: 4, name: 'Group for Bus Drivers', region: 'Demo', district: 'LOTR ISD', numMembers: 11, action: 'edit'},
];


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