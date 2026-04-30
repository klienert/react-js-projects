// Main entry point - import everything form here
export { default as TableController } from './TableController';

// Export individual variants if needed directly
export { default as BasicTable } from './variants/BasicTable';
export { default as SortableTable } from './variants/SortableTable';

// export hooks
export { useTableSort } from './hooks/useTableSort';
export { useTableFilter } from './hooks/useTableFilter';

// export shared components if needed as standalone
export { default as TableHeader } from './shared/TableHeader';
export { default as TableRow } from './shared/TableRow';
export { default as SearchBar } from './shared/SearchBar';
export { default as SortControls } from './shared/SortControls';