import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues,
} from '@tanstack/react-table'

export function useTableInstance(options) {
  // Initialize state
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [expanded, setExpanded] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: options.pageSize || 10,
  })
  const [globalFilter, setGlobalFilter] = useState('')

  // Create table instance
  const table = useReactTable({
    data: options.data,
    columns: options.columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
      pagination,
      globalFilter, // ✅ connect global filter state
    },
    enableSorting: options.enableSorting ?? true,
    enableMultiSort: options.enableMultiSort ?? false,
    enableFiltering: options.enableFiltering ?? true,
    enableGlobalFilter: options.enableGlobalFilter ?? true,
    enableColumnFilters: options.enableColumnFilters ?? true,
    enablePagination: options.enablePagination ?? true,
    enableRowSelection: options.enableRowSelection ?? false,
    enableMultiRowSelection: options.enableMultiRowSelection ?? false,
    enableRowExpansion: options.enableRowExpansion ?? false,
    enableColumnResizing: options.enableColumnResizing ?? false,
    enableVirtualization: options.enableVirtualization ?? false,

    // State change handlers
    onSortingChange: (updater) => {
      const newSorting = typeof updater === 'function' ? updater(sorting) : updater
      setSorting(newSorting)
      options.onSortingChange?.(newSorting)
    },
    onColumnFiltersChange: (updater) => {
      const newFilters = typeof updater === 'function' ? updater(columnFilters) : updater
      setColumnFilters(newFilters)
      options.onColumnFiltersChange?.(newFilters)
    },
    onColumnVisibilityChange: (updater) => {
      const newVisibility = typeof updater === 'function' ? updater(columnVisibility) : updater
      setColumnVisibility(newVisibility)
      options.onColumnVisibilityChange?.(newVisibility)
    },
    onRowSelectionChange: (updater) => {
      const newSelection = typeof updater === 'function' ? updater(rowSelection) : updater
      setRowSelection(newSelection)
      options.onRowSelectionChange?.(newSelection)
    },
    onExpandedChange: (updater) => {
      const newExpanded = typeof updater === 'function' ? updater(expanded) : updater
      setExpanded(newExpanded)
      options.onExpandedChange?.(newExpanded)
    },
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' ? updater(pagination) : updater
      setPagination(newPagination)
      options.onPaginationChange?.(newPagination)
    },
    onGlobalFilterChange: (updater) => { // ✅ new handler
      const newGlobalFilter = typeof updater === 'function' ? updater(globalFilter) : updater
      setGlobalFilter(newGlobalFilter)
      options.onGlobalFilterChange?.(newGlobalFilter)
    },

    // Row models
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  })

  // Memoize state object
  const state = useMemo(
    () => ({
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
      pagination,
      globalFilter,
    }),
    [sorting, columnFilters, columnVisibility, rowSelection, expanded, pagination, globalFilter]
  )

  // Memoize setState object
  const setState = useMemo(
    () => ({
      setSorting,
      setColumnFilters,
      setColumnVisibility,
      setRowSelection,
      setExpanded,
      setPagination,
      setGlobalFilter,
    }),
    []
  )

  return {
    table,
    state,
    setState,
  }
}
