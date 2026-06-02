// Main entry point - import everything form here
export { default as TableController } from './TableController';

// Export individual variants if needed directly
export { default as BasicTable } from './variants/BasicTable';
export { default as SortableTable } from './variants/SortableTable';
export { default as ServerTable } from './variants/ServerTable';
export { default as FilteredDataTable } from './variants/FilteredDataTable';
export { default as FilteredServerTable } from './variants/FilteredServerTable';

// export hooks
export { useTableSort } from './hooks/useTableSort';
export { useTableFilter } from './hooks/useTableFilter';
export { useTablePagination } from './hooks/useTablePagination';
export { useRowModal } from './hooks/useRowModal';
export { useServerSync } from './hooks/useServerSync';
export { useUrlState } from './hooks/useUrlState';
export { useFilterBar } from './hooks/useFilterBar';

// export shared components if needed as standalone
export { default as TableHeader } from './shared/TableHeader';
export { default as TableRow } from './shared/TableRow';
export { default as SearchBar } from './shared/SearchBar';
export { default as SortControls } from './shared/SortControls';
export { default as TablePagination } from './shared/TablePagination';
export { default as RowModal } from './shared/RowModal';