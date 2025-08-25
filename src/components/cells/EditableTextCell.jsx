import React, { useState, useRef, useEffect } from 'react'
import { Input, Box } from '@chakra-ui/react'

export const EditableTextCell = ({
  value,
  placeholder,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const inputRef = useRef(null)

  useEffect(() => {
    setEditValue(value)
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleDoubleClick = () => setIsEditing(true)

  const handleBlur = () => {
    setIsEditing(false)
    if (editValue !== value) onEdit(editValue)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
      if (editValue !== value) onEdit(editValue)
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditValue(value)
    }
  }

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        size="sm"
        variant="unstyled"         // no white background
        bg="transparent"           // transparent background
        color="white"              // white text on dark background
        _hover={{ bg: "transparent" }}
        _focus={{ bg: "transparent", borderColor: "blue.400" }}
        autoComplete="off"
      />
    )
  }

  return (
    <Box
      onDoubleClick={handleDoubleClick}
      cursor="pointer"
      _hover={{ bg: 'transparent' }} // no hover white
      p={1}
      borderRadius="md"
      minH="32px"
      display="flex"
      alignItems="center"
      color="white"
    >
      {value || placeholder || '-'}
    </Box>
  )
}
