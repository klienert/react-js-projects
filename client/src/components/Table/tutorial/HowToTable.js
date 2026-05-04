// ==============================================
//      HOW THE TABLE CONTROLLER WORKS
// ==============================================

/*
    In your component, import the <TableController /> which takes at the very least 4 props:
        variant     - type of table (basic, sortable, data, etc.)
        columns     - data columns (headers)
        data        - actual data to be displayed
        onAction    - function that can handle an action (button/link)
       
    Basic Example:

        const myActionBtnHandler = (actionId, row) => {
            console.log('actionId: ', actionId, '\nrow: ', row);
            ** This will return the row data with actionId 
            (looks for the key 'action' in the data and returns its value)
        }

        <div class='my basic table'>
            <TableController
                variant='basic'
                columns={MY_COLS}
                data={MY_DATA}
                onAction={myActionBtnHandler} <-- your function
            />
        </div>

        NOTE: Your handleActionFn() should be in the same or higher component 
        than where the TableController is.


    Sortable Example:

        **Note - can (should) use the same action button handler

        <div class="my sortable table">
            <TableController 
                variant="sortable"
                columns={MY_COLS}
                data={MY_DATA}
                onAction={myActionBtnHandler}

                ************************
                **optional props:
                ************************

                onRowClick={fn}
                caption={accessible table caption}
                emptyMessage={string} // text for no match (default: 'No results found.')
                showSearchBar={bool} // show the search bar (default is true)
                searchPlaceholder={string} // placeholder text (default: 'Search...')
                showSortControls={bool} // default is false
                initialSortKey={string} // default is null
                initialSortDir={string} // 'asc' or 'desc' ('asc' is default)
            />
        </div>
*/

