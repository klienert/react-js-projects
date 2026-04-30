import { useState, useCallback } from 'react';

/**
 * useRowModal
 *
 * Manages the open/close state and active row data for the generic RowModal.
 * Handles Escape key and body scroll lock automatically when mounted inside
 * a component — the RowModal component calls these internally.
 *
 * @returns {object}
 *   isOpen      {bool}     - whether the modal is currently open
 *   rowData     {object}   - the row that was clicked (null when closed)
 *   openModal   {fn}       - (row) => void
 *   closeModal  {fn}       - () => void
 */
export function useRowModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [rowData, setRowData] = useState(null);

    const openModal = useCallback((row) => {
        setRowData(row);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        // Keep rowData populated briefly so the modal can animate out
        // without the content disappearing immediately
        setTimeout(() => setRowData(null), 200);
    }, []);

    return { isOpen, rowData, openModal, closeModal };
}