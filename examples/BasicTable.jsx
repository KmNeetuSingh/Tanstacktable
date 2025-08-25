import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { DataTable, createTextColumn, createNumberColumn, createDateColumn } from '../src'

// Sample data
const sampleData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30,
    joinDate: '2023-01-15',
    department: 'Engineering',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    age: 28,
    joinDate: '2023-02-20',
    department: 'Marketing',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    age: 35,
    joinDate: '2022-11-10',
    department: 'Sales',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    age: 32,
    joinDate: '2023-03-05',
    department: 'Engineering',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    age: 29,
    joinDate: '2023-01-30',
    department: 'HR',
  },
]

// Column definitions
const columns = [
  createTextColumn('name', 'Name'),
  createTextColumn('email', 'Email'),
  createNumberColumn('age', 'Age'),
  createDateColumn('joinDate', 'Join Date'),
  createTextColumn('department', 'Department'),
]

export function BasicTable() {
  return (
    <Box p={6}>
      <Heading size="lg" mb={6}>
        Basic Table Example
      </Heading>
      <DataTable
        data={sampleData}
        columns={columns}
        enableSorting={true}
        enableFiltering={true}
        enablePagination={true}
        pageSize={10}
        variant="simple"
        colorScheme="blue"
        size="md"
      />
    </Box>
  )
}
