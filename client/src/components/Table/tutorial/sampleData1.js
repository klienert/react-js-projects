// ==============================================
//      HOW THE TABLE CONTROLLER WORKS
// ==============================================

/*
    In your component, import the <TableController />
    takes at the very least 4 props:
        variant     - type of table (basic, sortable, etc.)
        columns     - data columns (headers)
        data        - actual data to be displayed
        onAction    - function that can handle an action (button/link)
       
    Example:

        // create your handleActionFn
        const myActionBtnHandler = () => {
            
        }

        <div class='my basic table'>
            <TableController
                variant='basic'
                columns={MY_COLS}
                data={MY_DATA}
                onAction={handleActionFn}
            />
        </div>

        NOTE: Your handleActionFn() should be in the same or 
        higher component than where the TableController is 
        instantiated
*/