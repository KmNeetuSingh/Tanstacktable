import React, { useState, useRef, useEffect } from 'react'
import { Input, Box, Popover, PopoverTrigger, PopoverContent, PopoverBody } from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'

export const EditableDateCell = ({
  value,
  placeholder,
  format: dateFormat = 'MMM dd, yyyy',
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
    }
  }, [isEditing])

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (editValue && editValue !== value) {
      onEdit(editValue)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
      if (editValue && editValue !== value) {
        onEdit(editValue)
      }
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditValue(value)
    }
  }

  const handleDateChange = (date) => {
    setEditValue(date)
    if (date) {
      onEdit(date)
      setIsEditing(false)
    }
  }

  const displayValue = value ? format(value, dateFormat) : placeholder || '-'

  if (isEditing) {
    return (
      <Popover isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <PopoverTrigger>
          <Input
            ref={inputRef}
            value={editValue ? format(editValue, dateFormat) : ''}
            onChange={() => {}} // Controlled by DatePicker
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            size="sm"
            variant="filled"
            autoComplete="off"
            readOnly
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody p={0}>
            <DatePicker
              selected={editValue}
              onChange={handleDateChange}
              dateFormat={dateFormat}
              inline
              autoFocus
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Box
      onDoubleClick={handleDoubleClick}
      cursor="pointer"
      _hover={{ bg: 'gray.50' }}
      p={1}
      borderRadius="md"
      minH="32px"
      display="flex"
      alignItems="center"
    >
      {displayValue}
    </Box>
  )
}
