# TanStack Table + Chakra UI Data Table Component

A highly customizable and reusable table component built with TanStack Table v8 and Chakra UI. This component provides a complete data table solution with advanced features like sorting, filtering, pagination, row selection, and inline editing.

## Features

- ✅ **Comprehensive Table Features**
  - Sorting (single/multi-column)
  - Filtering (global and column-specific)
  - Pagination (client-side)
  - Row selection (single/multi)
  - Row expansion
  - Column resizing
  - Virtualization support

- ✅ **Pre-built Column Types**
  - Text (editable/non-editable)
  - Number (with formatting)
  - Date (with date picker)
  - Select dropdowns
  - Status indicators with colors
  - Action buttons
  - Checkbox selection
  - Expand/collapse

- ✅ **Advanced Features**
  - Inline cell editing
  - Custom cell renderers
  - Responsive design
  - Dark/light theme support
  - Accessibility (ARIA labels, keyboard navigation)
  - Loading, error, and empty states
  - TypeScript support

- ✅ **Developer Experience**
  - Simple API for basic tables
  - Advanced configuration for complex needs
  - Comprehensive TypeScript types
  - Custom hooks for table instance access
  - Extensive examples and documentation

## Installation

```bash
npm install @tanstack/react-table @chakra-ui/react @chakra-ui/icons @emotion/react @emotion/styled framer-motion date-fns react-datepicker
```

## Quick Start

### Basic Table

```tsx
import React from 'react'
import { DataTable, createTextColumn, createNumberColumn, createDateColumn } from 'tanstack-table-chakra'

interface User {
  id: number
  name: string
  email: string
  age: number
  joinDate: string
}

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 28, joinDate: '2023-02-20' },
]

const columns = [
  createTextColumn<User>('name', 'Name'),
  createTextColumn<User>('email', 'Email'),
  createNumberColumn<User>('age', 'Age'),
  createDateColumn<User>('joinDate', 'Join Date'),
]

function App() {
  return (
    <DataTable
      data={data}
      columns={columns}
      enableSorting={true}
      enableFiltering={true}
      enablePagination={true}
    />
  )
}
```

### Advanced Table with Editable Cells

```tsx
import React, { useState } from 'react'
import { DataTable, createTextColumn, createSelectColumn, createStatusColumn } from 'tanstack-table-chakra'

interface Product {
  id: number
  name: string
  category: string
  status: string
}

const [data, setData] = useState<Product[]>([...])

const columns = [
  createTextColumn<Product>('name', 'Product Name', {
    isEditable: true,
    onEdit: (newValue, row) => {
      setData(prev => prev.map(item => 
        item.id === row.id ? { ...item, name: newValue } : item
      ))
    }
  }),
  createSelectColumn<Product>('category', 'Category', {
    options: [
      { value: 'Electronics', label: 'Electronics' },
      { value: 'Clothing', label: 'Clothing' },
    ],
    onEdit: (newValue, row) => {
      setData(prev => prev.map(item => 
        item.id === row.id ? { ...item, category: newValue as string } : item
      ))
    }
  }),
  createStatusColumn<Product>('status', 'Status', {
    options: [
      { value: 'active', label: 'Active', color: 'green', bgColor: 'green.100' },
      { value: 'inactive', label: 'Inactive', color: 'gray', bgColor: 'gray.100' },
    ],
    onEdit: (newValue, row) => {
      setData(prev => prev.map(item => 
        item.id === row.id ? { ...item, status: newValue } : item
      ))
    }
  })
]

function App() {
  return (
    <DataTable
      data={data}
      columns={columns}
      enableRowSelection={true}
      enableMultiRowSelection={true}
      enableRowExpansion={true}
      variant="striped"
      colorScheme="blue"
    />
  )
}
```

## API Reference

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TData[]` | - | Array of data objects |
| `columns` | `ExtendedColumnDef<TData>[]` | - | Column definitions |
| `enableSorting` | `boolean` | `true` | Enable column sorting |
| `enableMultiSort` | `boolean` | `false` | Enable multi-column sorting |
| `enableFiltering` | `boolean` | `true` | Enable filtering |
| `enableGlobalFilter` | `boolean` | `true` | Enable global search |
| `enableColumnFilters` | `boolean` | `true` | Enable column-specific filters |
| `enablePagination` | `boolean` | `true` | Enable pagination |
| `enableRowSelection` | `boolean` | `false` | Enable row selection |
| `enableMultiRowSelection` | `boolean` | `false` | Enable multi-row selection |
| `enableRowExpansion` | `boolean` | `false` | Enable row expansion |
| `enableColumnResizing` | `boolean` | `false` | Enable column resizing |
| `pageSize` | `number` | `10` | Number of rows per page |
| `pageSizeOptions` | `number[]` | `[10, 20, 30, 40, 50]` | Available page size options |
| `variant` | `'simple' \| 'striped' \| 'unstyled'` | `'simple'` | Table variant |
| `colorScheme` | `string` | `'blue'` | Chakra UI color scheme |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Table size |
| `isLoading` | `boolean` | `false` | Show loading state |
| `error` | `string \| null` | `null` | Show error state |
| `emptyMessage` | `string` | `'No data available'` | Message for empty state |

### Pre-built Column Functions

#### `createTextColumn<TData>(accessorKey, header, options?)`

Creates a text column with optional inline editing.

```tsx
createTextColumn<User>('name', 'Name', {
  isEditable: true,
  placeholder: 'Enter name',
  onEdit: (newValue, row) => console.log('Name changed:', newValue)
})
```

#### `createNumberColumn<TData>(accessorKey, header, options?)`

Creates a number column with formatting and validation.

```tsx
createNumberColumn<User>('salary', 'Salary', {
  isEditable: true,
  min: 0,
  max: 1000000,
  format: {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  },
  onEdit: (newValue, row) => console.log('Salary changed:', newValue)
})
```

#### `createDateColumn<TData>(accessorKey, header, options?)`

Creates a date column with date picker.

```tsx
createDateColumn<User>('birthDate', 'Birth Date', {
  isEditable: true,
  format: 'MMM dd, yyyy',
  onEdit: (newValue, row) => console.log('Date changed:', newValue)
})
```

#### `createSelectColumn<TData>(accessorKey, header, options)`

Creates a select dropdown column.

```tsx
createSelectColumn<User>('department', 'Department', {
  options: [
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' }
  ],
  isClearable: true,
  onEdit: (newValue, row) => console.log('Department changed:', newValue)
})
```

#### `createStatusColumn<TData>(accessorKey, header, options)`

Creates a status column with colored badges.

```tsx
createStatusColumn<User>('status', 'Status', {
  options: [
    { value: 'active', label: 'Active', color: 'green', bgColor: 'green.100' },
    { value: 'inactive', label: 'Inactive', color: 'gray', bgColor: 'gray.100' }
  ],
  onEdit: (newValue, row) => console.log('Status changed:', newValue)
})
```

#### `createActionsColumn<TData>(header, options)`

Creates an actions column with buttons.

```tsx
createActionsColumn<User>('Actions', {
  actions: [
    {
      label: 'Edit',
      icon: <EditIcon />,
      onClick: (row) => console.log('Edit:', row),
      variant: 'ghost',
      colorScheme: 'blue'
    },
    {
      label: 'Delete',
      icon: <DeleteIcon />,
      onClick: (row) => console.log('Delete:', row),
      variant: 'ghost',
      colorScheme: 'red'
    }
  ],
  maxVisible: 2,
  showMoreLabel: 'More'
})
```

### Custom Hooks

#### `useTableInstance(options)`

Provides access to the table instance and state management.

```tsx
import { useTableInstance } from 'tanstack-table-chakra'

function MyComponent() {
  const { table, state, setState } = useTableInstance({
    data,
    columns,
    enableSorting: true,
    // ... other options
  })

  // Access table methods
  console.log(table.getFilteredRowModel().rows)
  
  // Access state
  console.log(state.sorting, state.pagination)
  
  // Update state
  setState.setSorting([{ id: 'name', desc: false }])
}
```

## Custom Column Definitions

You can create custom column definitions by extending the `ExtendedColumnDef` interface:

```tsx
import { ExtendedColumnDef } from 'tanstack-table-chakra'

const customColumn: ExtendedColumnDef<User> = {
  accessorKey: 'avatar',
  header: 'Profile',
  cell: ({ getValue, row }) => {
    const avatar = getValue() as string
    const name = row.original.name
    
    return (
      <HStack>
        <Avatar src={avatar} name={name} size="sm" />
        <Text>{name}</Text>
      </HStack>
    )
  },
  size: 200,
  isSortable: true,
  isFilterable: true
}
```

## Examples

See the `examples/` directory for comprehensive examples:

- `BasicTable.tsx` - Simple table with basic features
- `AdvancedTable.tsx` - Advanced features with editable cells and actions
- `CustomTable.tsx` - Custom column definitions and cell renderers

## Best Practices

### 1. Type Safety

Always define your data types and use them with the table:

```tsx
interface User {
  id: number
  name: string
  email: string
}

const columns = [
  createTextColumn<User>('name', 'Name'),
  createTextColumn<User>('email', 'Email'),
]
```

### 2. Performance

For large datasets, consider enabling virtualization:

```tsx
<DataTable
  data={largeDataset}
  columns={columns}
  enableVirtualization={true}
  rowHeight={50}
  overscan={5}
/>
```

### 3. Accessibility

Always provide proper ARIA labels:

```tsx
<DataTable
  data={data}
  columns={columns}
  ariaLabel="Users table"
  ariaDescribedBy="users-table-description"
/>
```

### 4. State Management

Use the `useTableInstance` hook for complex state management:

```tsx
const { table, state, setState } = useTableInstance(options)

// Save state to localStorage
useEffect(() => {
  localStorage.setItem('tableState', JSON.stringify(state))
}, [state])

// Restore state from localStorage
useEffect(() => {
  const savedState = localStorage.getItem('tableState')
  if (savedState) {
    const parsedState = JSON.parse(savedState)
    setState.setSorting(parsedState.sorting)
    setState.setPagination(parsedState.pagination)
  }
}, [])
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
