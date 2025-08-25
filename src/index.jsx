// Main table component
export { DataTable } from './components/DataTable'

// Custom hook
export { useTableInstance } from './hooks/useTableInstance'

// Pre-built column definitions
export {
  createTextColumn,
  createNumberColumn,
  createDateColumn,
  createSelectColumn,
  createStatusColumn,
  createActionsColumn,
  createCheckboxColumn,
  createExpandColumn,
} from './columns'

// Cell components
export { EditableTextCell } from './components/cells/EditableTextCell'
export { EditableNumberCell } from './components/cells/EditableNumberCell'
export { EditableDateCell } from './components/cells/EditableDateCell'
export { EditableSelectCell } from './components/cells/EditableSelectCell'
export { EditableStatusCell } from './components/cells/EditableStatusCell'
export { StatusBadge } from './components/cells/StatusBadge'
export { ActionsCell } from './components/cells/ActionsCell'

// TanStack Table utilities (just re-export functions you actually use)
export {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues,
  useReactTable,
} from '@tanstack/react-table'
