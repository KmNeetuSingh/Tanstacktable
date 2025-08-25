import React, { useState, useRef, useEffect } from 'react'
import { Input, Box } from '@chakra-ui/react'

export const EditableNumberCell = ({
  value,
  placeholder,
  min,
  max,
  step,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value?.toString() || '')
  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    setEditValue(value?.toString() || '')
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const validateValue = (val) => {
    const num = parseFloat(val)
    if (isNaN(num)) {
      return null
    }
    if (min !== undefined && num < min) {
      setError(`Value must be at least ${min}`)
      return null
    }
    if (max !== undefined && num > max) {
      setError(`Value must be at most ${max}`)
      return null
    }
    setError(null)
    return num
  }

  const handleBlur = () => {
    setIsEditing(false)
    const validatedValue = validateValue(editValue)
    if (validatedValue !== null && validatedValue !== value) {
      onEdit(validatedValue)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
      const validatedValue = validateValue(editValue)
      if (validatedValue !== null && validatedValue !== value) {
        onEdit(validatedValue)
      }
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditValue(value?.toString() || '')
      setError(null)
    }
  }

  const handleChange = (e) => {
    const newValue = e.target.value
    setEditValue(newValue)
    if (newValue === '') {
      setError(null)
    } else {
      validateValue(newValue)
    }
  }

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        type="number"
        value={editValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        size="sm"
        variant="unstyled"   // <-- remove Chakra's filled white background
        bg="transparent"     // <-- ensure background stays transparent
        _focus={{ boxShadow: 'none', borderColor: 'blue.400' }} // keep focus outline minimal
        isInvalid={!!error}
        autoComplete="off"
      />
    )
  }

  return (
    <Box
      onDoubleClick={handleDoubleClick}
      cursor="pointer"
      _hover={{ bg: 'gray.100' }} // ✅ use valid chakra gray shade
      p={1}
      borderRadius="md"
      minH="32px"
      display="flex"
      alignItems="center"
    >
      {value?.toString() || placeholder || '-'}
    </Box>
  )
}
