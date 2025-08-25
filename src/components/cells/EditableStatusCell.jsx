import React, { useState, useRef, useEffect } from 'react'
import { Select, Box } from '@chakra-ui/react'
import { StatusBadge } from './StatusBadge'

export const EditableStatusCell = ({
  value,
  options,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const selectRef = useRef(null)

  useEffect(() => {
    setEditValue(value)
  }, [value])

  useEffect(() => {
    if (isEditing && selectRef.current) {
      selectRef.current.focus()
    }
  }, [isEditing])

  const handleDoubleClick = () => setIsEditing(true)

  const handleBlur = () => {
    setIsEditing(false)
    if (editValue !== value) {
      onEdit(editValue)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
      if (editValue !== value) {
        onEdit(editValue)
      }
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditValue(value)
    }
  }

  const handleChange = (e) => setEditValue(e.target.value)

  const selectedOption = options.find(opt => opt.value === value)

  if (isEditing) {
    return (
      <Select
        ref={selectRef}
        value={editValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        size="sm"
        variant="unstyled"           // removes default white background
        bg="transparent"             // transparent background
        color="white"                // white text for dark background
        _focus={{ bg: 'transparent', borderColor: 'blue.400' }}
        _hover={{ bg: 'transparent' }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} style={{ color: 'black' }}>
            {option.label}
          </option>
        ))}
      </Select>
    )
  }

  return (
    <Box
      onDoubleClick={handleDoubleClick}
      cursor="pointer"
      _hover={{ bg: 'transparent' }} // removes hover white background
      p={1}
      borderRadius="md"
      minH="32px"
      display="flex"
      alignItems="center"
    >
      {selectedOption && <StatusBadge statusOption={selectedOption} />}
    </Box>
  )
}
