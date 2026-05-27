import { useEffect, useMemo, useState } from 'react';
import { useThemeContext } from '../../contexts/ThemeProvider.jsx';
import './styles.css';
import Table from './TableComp/Table';
import TableController from '../../components/Table/TableController.jsx';
import RowModal from '../../components/Table/shared/RowModal.jsx';

const TableDemo = () => {
    const { theme } = useThemeContext();
    const tableViews = ['basic', 'sortable', 'data', 'server'];
    const [currentTable, setCurrentTable] = useState('basic');
    const [dataCol, setDataCol] = useState([
        { key: "name", header: "Group Name", width: "200px", sortable: true, filterable: true },
        { key: "region", header: "Region", sortable: true, filterable: true, filterType: "select" },
        { key: "district", header: "District", sortable: true, filterable: true, filterType: "select" },
        { key: "numMembers", header: "Members", align: "center", sortable: true, filterable: true, filterType: "number" },
        { key: 'createdAt', header: 'Created', align: 'center', sortable: true, filterable: false },
        { key: "action", header: "Action", render: (val, row) => (
                <button
                    type='button'
                    className='btn btn-secondary'
                    onClick={() => handleAction(val, row)}
                >
                    {val}
                </button>
            )
        },
        // { key: 'action', header: 'Action', actions: [{
        //     label: 'Edit',
        //     actionId: 'edit'
        // }]}
    ]);
    
    const [data, setData] = useState([
        {id: 1, name: 'Group for Teachers', region: 'Demo', district: 'LOTR ISD', numMembers: 120, createdAt: '2026-01-01', action: 'edit' },
        {id: 2, name: 'Group for Coaches', region: 'Demo', district: 'LOTR ISD', numMembers: 18, createdAt: '2025-12-31', action: 'edit'},
        {id: 3, name: 'Group for Admin', region: '6', district: 'ESC Region 6', numMembers: 4, createdAt: '2026-03-31', action: 'edit'},
        {id: 4, name: 'Group for Graphic Designers', region: '6', district: 'ESC Region 6', numMembers: 3, createdAt: '2026-02-27', action: 'edit'},
        {id: 5, name: 'Some other group', region: 'Demo', district: 'LOTR ISD', numMembers: 20, createdAt: '2026-05-27', action: 'edit'},
        {id: 6, name: 'Another group...', region: '4', district: 'Aldine ISD', numMembers: 305, createdAt: '2026-05-26', action: 'edit'}
    ]);

    // Modal for Basic and Sortable
    const [modalState, setModalState] = useState({ isOpen: false, rowData: null });
    const openModal = (row) => setModalState({ isOpen: true, mode: null, rowData: row });
    const closeModal = () => setModalState((prev) => ({...prev, isOpen: false }));

    // server table state
    const [serverData, setServerData] = useState(data);
    const [totalRows, setTotalRows] = useState(data.length);
    const [serverLoading, setServerLoading] = useState(false);

    const handleFetch = async ({ page, perPage, sortKey, search }) => {
        setServerLoading(true);
        // Simulating an API call with the local data for demo purposes
        // Replace this block with your real API call
        await new Promise((r) => setTimeout(r, 400));
        let result = [...data];
        if (search) result = result.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
        if (sortKey) result.sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        return sortDir === 'asc'
            ? String(av).localeCompare(String(bv))
            : String(bv).localeCompare(String(av));
        });
        const start = (page - 1) * perPage;
        setServerData(result.slice(start, start + perPage));
        setTotalRows(result.length);
        setServerLoading(false);
    }

    const handleAction = (actionId, row) => {
        if (actionId === 'edit') openModal(row);        
    }

    const toggleTableView = (v) => {        
        if(!tableViews.includes(v)) return;
        setCurrentTable(v);
    }

    // which variants handle their own modal
    const hasInternalModal = currentTable === 'data' || currentTable === 'server';
    
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
            <div className='table-view'>
                <h4>{currentTable.charAt(0).toUpperCase() + currentTable.slice(1, currentTable.length)} Table</h4>
                {currentTable === 'basic' && (
                    <TableController
                        variant={currentTable}
                        columns={dataCol}
                        data={data}
                        onAction={handleAction}
                        // onRowClick={openModal}
                        // caption={`${currentTable} table`}
                        // searchPlaceholder={`Search in "${currentTable}" table`}
                        // showSortControls={true}
                        // showSearchBar={true}
                    />
                )}
                {currentTable === 'sortable' && (
                    <TableController
                        variant={currentTable}
                        columns={dataCol}
                        data={data}
                        onAction={handleAction}
                        onRowClick={openModal}
                        // caption={`${currentTable} table`}
                        searchPlaceholder={`Search in "${currentTable}" table`}
                        showSortControls={true}
                        showSearchBar={true}
                    />
                )}
                {currentTable === 'data' && (
                    <TableController
                        variant="data"
                        columns={dataCol}
                        data={data}
                        onAction={handleAction}
                        caption="Data table"
                        searchPlaceholder={`Search in '${currentTable}'`}
                        showSortControls={true}
                        rowClickable={true}
                        modalTitle={`${currentTable} table details`}
                    />
                )}
                {currentTable === 'server' && (
                    <TableController 
                        variant="server"
                        columns={dataCol}
                        data={serverData}
                        totalRows={totalRows}
                        loading={serverLoading}
                        onFetch={handleFetch}
                        onAction={handleAction}
                        // caption="Server table"
                        searchPlaceholder='Search groups…'
                        showSortControls={true}
                        syncToUrl={false}
                    />
                )}
                {!hasInternalModal && (
                    <RowModal 
                        isOpen={modalState.isOpen}
                        rowData={modalState.rowData}
                        onClose={closeModal}
                        columns={dataCol}
                        title={`${currentTable} table details`}
                    />
                )}
            </div>
        </section>        
    )
}

export default TableDemo;