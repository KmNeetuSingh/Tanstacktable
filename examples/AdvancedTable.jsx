import React, { useState, useEffect } from 'react'
import { 
  Box, Heading, useToast, Alert, AlertIcon, Spinner, Center 
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import { 
  DataTable, 
  createTextColumn, 
  createNumberColumn, 
  createDateColumn,
  createSelectColumn,
  createStatusColumn,
  createActionsColumn,
  createCheckboxColumn,
  createExpandColumn,
} from '../src'

// Options for select and status columns
const categoryOptions = [
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Accessories', label: 'Accessories' },
  { value: 'Gaming', label: 'Gaming' },
  { value: 'Office', label: 'Office' },
]

const statusOptions = [
  { value: 'active', label: 'Active', color: 'green', bgColor: 'green.100' },
  { value: 'inactive', label: 'Inactive', color: 'gray', bgColor: 'gray.100' },
  { value: 'out_of_stock', label: 'Out of Stock', color: 'red', bgColor: 'red.100' },
  { value: 'low_stock', label: 'Low Stock', color: 'orange', bgColor: 'orange.100' },
]

export function AdvancedTable() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRows, setSelectedRows] = useState({})
  const toast = useToast()

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://mocki.io/v1/a0ff716d-ba9b-4ee0-abc9-23a839e24b34")
        const result = await res.json()
        setData(result)
      } catch (error) {
        toast({
          title: "Error loading data",
          description: error.message,
          status: "error",
          duration: 4000,
        })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [toast])

  // Action handlers
  const handleView = (row) => {
    toast({
      title: 'View Product',
      description: `Viewing ${row.name}`,
      status: 'info',
      duration: 3000,
    })
  }

  const handleEdit = (row) => {
    const newName = window.prompt("Edit product name:", row.name) || row.name
    const newCategory = window.prompt("Edit category:", row.category) || row.category
    const newPrice = parseFloat(window.prompt("Edit price:", row.price)) || row.price
    const newStatus = window.prompt("Edit status (active/inactive/out_of_stock/low_stock):", row.status) || row.status

    setData(prev =>
      prev.map(item =>
        item.id === row.id
          ? { ...item, name: newName, category: newCategory, price: newPrice, status: newStatus }
          : item
      )
    )

    toast({
      title: 'Product updated',
      description: `${row.name} has been updated`,
      status: 'success',
      duration: 3000,
    })
  }

  const handleDelete = (row) => {
    if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
      setData(prev => prev.filter(item => item.id !== row.id))
      toast({
        title: 'Deleted',
        description: `${row.name} was removed`,
        status: 'success',
        duration: 3000,
      })
    }
  }

  // Action buttons config
  const actionButtons = [
    {
      label: 'View',
      icon: <ViewIcon />,
      onClick: handleView,
      variant: 'ghost',
      colorScheme: 'blue',
      size: 'sm',
    },
    {
      label: 'Edit',
      icon: <EditIcon />,
      onClick: handleEdit,
      variant: 'ghost',
      colorScheme: 'green',
      size: 'sm',
    },
    {
      label: 'Delete',
      icon: <DeleteIcon />,
      onClick: handleDelete,
      variant: 'ghost',
      colorScheme: 'red',
      size: 'sm',
    },
  ]

  // Table columns
  const columns = [
    createCheckboxColumn(),
    createExpandColumn(),
    createTextColumn('name', 'Product Name'),
    createSelectColumn('category', 'Category', { options: categoryOptions }),
    createNumberColumn('price', 'Price ($)', {
      format: { style: 'currency', currency: 'USD', minimumFractionDigits: 2 },
    }),
    createNumberColumn('stock', 'Stock'),
    createStatusColumn('status', 'Status', { options: statusOptions }),
    createDateColumn('lastUpdated', 'Last Updated'),
    createActionsColumn('Actions', { actions: actionButtons, maxVisible: 2, showMoreLabel: 'More' }),
  ]

  if (loading) {
    return (
      <Center p={10}>
        <Spinner size="xl" />
      </Center>
    )
  }

  return (
    <Box p={6}>
      <Heading size="lg" mb={6}>
        Advanced Table Example (API Data with Edit/Delete)
      </Heading>

      {/* Selection summary */}
      {Object.keys(selectedRows).length > 0 && (
        <Alert status="info" mb={4}>
          <AlertIcon />
          {Object.keys(selectedRows).length} product(s) selected
        </Alert>
      )}

      <DataTable
        data={data}
        columns={columns}
        enableSorting
        enableMultiSort
        enableFiltering
        enableGlobalFilter
        enableColumnFilters
        enablePagination
        enableRowSelection
        enableMultiRowSelection
        enableRowExpansion
        enableColumnResizing
        pageSize={10}
        pageSizeOptions={[5, 10, 20, 50]}
        variant="striped"
        colorScheme="purple"
        size="md"
        onRowSelectionChange={setSelectedRows}
        ariaLabel="Products table"
        emptyMessage="No products found"
      />
    </Box>
  )
}
