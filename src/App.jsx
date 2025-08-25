import React, { useState } from 'react'
import {
  ChakraProvider,
  Box,
  HStack,
  Button,
  Heading,
  Text,
  useColorMode,
  IconButton
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

import MyTableExample from '../examples/MyTableExample'
import { BasicTable } from '../examples/BasicTable'
import { AdvancedTable } from '../examples/AdvancedTable'
import { CustomTable } from '../examples/CustomTable'

function App() {
  const [currentExample, setCurrentExample] = useState('mytable')
  const { colorMode, toggleColorMode } = useColorMode()

  const examples = [
    { id: 'mytable', name: 'My Table Example' },
    { id: 'basic', name: 'Basic Table' },
    { id: 'advanced', name: 'Advanced Table' },
    { id: 'custom', name: 'Custom Table' },
  ]

  const renderExample = () => {
    switch (currentExample) {
      case 'mytable': return <MyTableExample />
      case 'basic': return <BasicTable />
      case 'advanced': return <AdvancedTable />
      case 'custom': return <CustomTable />
      default: return <BasicTable />
    }
  }

  return (
    <ChakraProvider>
      <Box minH="100vh" bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}>

        {/* Header */}
        <Box
          bg={colorMode === 'dark' ? 'gray.800' : 'white'}
          borderBottom="1px"
          borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
          px={6}
          py={4}
          position="relative"
        >
          <Heading
            size="lg"
            textAlign="center"
            color={colorMode === 'dark' ? 'white' : 'gray.800'}
          >
            TanStack Table
          </Heading>
          <Text
            textAlign="center"
            color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
            mt={1}
          >
            Highly customizable and reusable table component
          </Text>

          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            position="absolute"
            top="50%"
            right="16px"
            transform="translateY(-50%)"
          />
        </Box>

        {/* Navigation */}
        <Box
          bg={colorMode === 'dark' ? 'gray.800' : 'white'}
          borderBottom="1px"
          borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
          px={6}
          py={3}
        >
          <HStack spacing={4}>
            {examples.map(({ id, name }) => (
              <Button
                key={id}
                variant={currentExample === id ? 'solid' : 'ghost'}
                colorScheme="blue"
                onClick={() => setCurrentExample(id)}
                size="sm"
              >
                {name}
              </Button>
            ))}
          </HStack>
        </Box>

        {/* Content */}
        <Box p={6}>{renderExample()}</Box>
      </Box>
    </ChakraProvider>
  )
}

export default App
