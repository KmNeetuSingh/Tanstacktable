import React, { useState, useRef, useEffect } from 'react'
import { Select, Box } from '@chakra-ui/react'

export const EditableSelectCell = ({
  value,
  options,
  placeholder,
  isClearable = false,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value?.toString() || '')
  const selectRef = useRef(null)

  useEffect(() => {
    setEditValue(value?.toString() || '')
  }, [value])

  useEffect(() => {
    if (isEditing && selectRef.current) {
      selectRef.current.focus()
    }
  }, [isEditing])

  const handleDoubleClick = () => setIsEditing(true)

  const handleBlur = () => {
    setIsEditing(false)
    if (editValue !== value?.toString()) {
      const selectedOption = options.find(opt => opt.value.toString() === editValue)
      if (selectedOption) {
        onEdit(selectedOption.value)
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
      if (editValue !== value?.toString()) {
        const selectedOption = options.find(opt => opt.value.toString() === editValue)
        if (selectedOption) {
          onEdit(selectedOption.value)
        }
      }
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditValue(value?.toString() || '')
    }
  }

  const handleChange = (e) => setEditValue(e.target.value)

  const selectedOption = options.find(opt => opt.value === value)
  const displayValue = selectedOption?.label || value?.toString() || placeholder || '-'

  if (isEditing) {
    return (
      <Select
        ref={selectRef}
        value={editValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        size="sm"
        variant="unstyled"         // removes Chakra default white background
        bg="transparent"           // transparent background
        color="white"              // visible text on dark background
        _focus={{ bg: 'transparent', borderColor: 'blue.400' }}
        _hover={{ bg: 'transparent' }}
      >
        {isClearable && (
          <option value="">{placeholder || 'Select...'}</option>
        )}
        {options.map(option => (
          <option key={option.value.toString()} value={option.value.toString()}>
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
      _hover={{ bg: 'transparent' }} // no white background on hover
      p={1}
      borderRadius="md"
      minH="32px"
      display="flex"
      alignItems="center"
      color="white"
    >
      {displayValue}
    </Box>
  )
}
