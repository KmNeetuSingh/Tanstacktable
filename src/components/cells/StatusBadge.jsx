import React from 'react'
import { Badge } from '@chakra-ui/react'

export const StatusBadge = ({ statusOption, value }) => {
  if (!statusOption && !value) {
    return (
      <Badge
        variant="outline"
        bg="transparent"
        _hover={{ bg: "transparent" }}
        _focus={{ bg: "transparent", boxShadow: "none" }}
      >
        Unknown
      </Badge>
    )
  }

  if (statusOption) {
    return (
      <Badge
        colorScheme={statusOption.color}
        bg={statusOption.bgColor || "transparent"}
        color={statusOption.color}
        variant="solid"
        borderRadius="full"
        px={2}
        py={1}
        fontSize="xs"
        fontWeight="medium"
        _hover={{ bg: statusOption.bgColor || "transparent" }}
        _focus={{ bg: statusOption.bgColor || "transparent", boxShadow: "none" }}
      >
        {statusOption.label}
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      colorScheme="gray"
      bg="transparent"
      _hover={{ bg: "transparent" }}
      _focus={{ bg: "transparent", boxShadow: "none" }}
    >
      {value}
    </Badge>
  )
}
