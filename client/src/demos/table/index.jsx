import { useEffect, useMemo, useState } from 'react';
import { useThemeContext } from '../../contexts/ThemeProvider.jsx';
import Table from './TableComp/Table';
import './styles.css';
import { DEMO_COLS, DEMO_DATA } from './sampleData1.jsx';
import TableController from '../../components/Table/TableController.jsx';

const TableDemo = () => {
    const { theme } = useThemeContext();
    const tableViews = ['basic', 'sortable', 'data'];
    const [currentTable, setCurrentTable] = useState(null);
    const [dataCol, setDataCol] = useState([
        { key: "name", header: "Group Name", width: "200px", sortable: true, filterable: true },
        { key: "region", header: "Region", sortable: true, filterable: true, filterType: "select" },
        { key: "district", header: "District", sortable: true, filterable: true, filterType: "select" },
        { key: "numMembers", header: "Members", align: "center", sortable: true, filterable: true, filterType: "number" },
        { key: 'createdAt', header: 'Created', align: 'center', sortable: true, filterable: false },
        { key: "action", header: "Action", render: (val, row) => 
            <button
                type='button'
                className='btn btn-secondary'
                onClick={() => handleAction(val, row)}
            >
                {val}
            </button>
        }
    ]);
    
    const [data, setData] = useState([
        {id: 1, name: 'Group for Teachers', region: 'Demo', district: 'LOTR ISD', numMembers: 120, createdAt: '2026-01-01', action: 'edit' },
        {id: 2, name: 'Group for Coaches', region: 'Demo', district: 'LOTR ISD', numMembers: 18, createdAt: '2025-12-31', action: 'edit'},
        {id: 3, name: 'Group for Admin', region: '6', district: 'ESC Region 6', numMembers: 4, createdAt: '2026-03-31', action: 'edit'},
        {id: 4, name: 'Group for Graphic Designers', region: '6', district: 'ESC Region 6', numMembers: 3, createdAt: '2026-02-27', action: 'edit'}
    ]);
    const handleAction = (actionId, row) => {
        console.log('actionId: ', actionId, '\nrow: ', row);
        
        // if (actionId === 'edit') console.log('edit', row);
        // if (actionId === 'delete') console.log('delete', row);
    }


    const toggleTableView = (v) => {
        if(!tableViews.includes(v)) {
            console.error('not viable view: ', v);
            setCurrentTable(null);
            throw new Error('not a viable table view'); 
        }
        setCurrentTable(v);
    }

    useEffect(() => {
        if(currentTable === null) {
            setCurrentTable('basic');
        }
        // console.log('tableViews? ', tableViews);
    }, [currentTable]);
    
    return (
        <section className='table-demo'>
            {tableViews.length > 0 && (
                <div className='table-selection'>
                    {tableViews.map(v => (
                        <button
                            key={v}
                            className={`btn btn-${theme === 'light' ? 'dark' : 'light'} table-selection-btn`}
                            onClick={() => toggleTableView(v)}
                        >
                            {v.charAt(0).toUpperCase() + v.slice(1, v.length)}
                        </button>
                    ))}
                </div>
                
            )}
            
            {currentTable && (
                <div className='table-view'>
                    <h4>{currentTable.charAt(0).toUpperCase() + currentTable.slice(1, currentTable.length)} Table</h4>
                    <TableController 
                        variant={currentTable}
                        columns={dataCol}
                        data={data}
                        onAction={handleAction}
                        rowClickable={true}
                        modalTitle={'Modal Title'}
                        
                    />
                    <hr />
                </div>
            )}
        </section>        
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