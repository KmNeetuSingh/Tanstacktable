import React, { useState } from 'react'
import { Box, Heading, Avatar, Badge, Progress, Text, VStack, HStack } from '@chakra-ui/react'
import { DataTable } from '../src'

// Sample data
const sampleData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    salary: 95000,
    performance: 92,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    skills: ['React', 'TypeScript', 'Node.js'],
    isActive: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    department: 'Design',
    position: 'UI/UX Designer',
    salary: 85000,
    performance: 88,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    skills: ['Figma', 'Sketch', 'Adobe Creative Suite'],
    isActive: true,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    department: 'Marketing',
    position: 'Marketing Manager',
    salary: 78000,
    performance: 95,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    skills: ['Digital Marketing', 'SEO', 'Analytics'],
    isActive: false,
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.kim@company.com',
    department: 'Engineering',
    position: 'DevOps Engineer',
    salary: 92000,
    performance: 87,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    skills: ['Docker', 'Kubernetes', 'AWS'],
    isActive: true,
  },
  {
    id: 5,
    name: 'Lisa Wang',
    email: 'lisa.wang@company.com',
    department: 'Sales',
    position: 'Sales Representative',
    salary: 65000,
    performance: 91,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    skills: ['CRM', 'Negotiation', 'Client Relations'],
    isActive: true,
  },
]

export function CustomTable() {
  const [data] = useState(sampleData)

  // Custom column definitions
  const columns = [
    {
      accessorKey: 'avatar',
      header: 'Employee',
      size: 200,
      cell: ({ getValue, row }) => {
        const avatar = getValue()
        const name = row.original.name
        const email = row.original.email
        const isActive = row.original.isActive

        return (
          <HStack spacing={3}>
            <Avatar size="sm" src={avatar} name={name} />
            <VStack align="start" spacing={0}>
              <Text fontWeight="medium" fontSize="sm">
                {name}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {email}
              </Text>
              <Badge
                size="sm"
                colorScheme={isActive ? 'green' : 'gray'}
                variant="subtle"
              >
                {isActive ? 'Active' : 'Inactive'}
              </Badge>
            </VStack>
          </HStack>
        )
      },
    },
    {
      accessorKey: 'department',
      header: 'Department',
      size: 150,
      cell: ({ getValue }) => {
        const department = getValue()
        const colorMap = {
          Engineering: 'blue',
          Design: 'purple',
          Marketing: 'green',
          Sales: 'orange',
        }

        return (
          <Badge colorScheme={colorMap[department] || 'gray'} variant="subtle">
            {department}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'position',
      header: 'Position',
      size: 180,
    },
    {
      accessorKey: 'salary',
      header: 'Salary',
      size: 120,
      cell: ({ getValue }) => {
        const salary = getValue()
        return (
          <Text fontWeight="medium">
            ${salary.toLocaleString()}
          </Text>
        )
      },
    },
    {
      accessorKey: 'performance',
      header: 'Performance',
      size: 150,
      cell: ({ getValue }) => {
        const performance = getValue()
        const colorScheme = performance >= 90 ? 'green' : performance >= 80 ? 'yellow' : 'red'

        return (
          <VStack align="start" spacing={1}>
            <Progress
              value={performance}
              colorScheme={colorScheme}
              size="sm"
              width="100px"
            />
            <Text fontSize="sm" fontWeight="medium">
              {performance}%
            </Text>
          </VStack>
        )
      },
    },
    {
      accessorKey: 'skills',
      header: 'Skills',
      size: 200,
      cell: ({ getValue }) => {
        const skills = getValue()
        return (
          <HStack spacing={1} wrap="wrap">
            {skills.map((skill, index) => (
              <Badge key={index} size="sm" variant="outline" colorScheme="blue">
                {skill}
              </Badge>
            ))}
          </HStack>
        )
      },
    },
  ]

  return (
    <Box p={6}>
      <Heading size="lg" mb={6}>
        Custom Table Example
      </Heading>
      <DataTable
        data={data}
        columns={columns}
        enableSorting={true}
        enableFiltering={true}
        enableGlobalFilter={true}
        enablePagination={true}
        pageSize={10}
        variant="simple"
        colorScheme="teal"
        size="md"
        ariaLabel="Employees table"
        emptyMessage="No employees found"
      />
    </Box>
  )
}
