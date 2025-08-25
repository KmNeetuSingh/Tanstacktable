import React, { useState } from 'react'
import { 
  Button, 
  ButtonGroup, 
  IconButton, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  Box,
  Text
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

export const ActionsCell = ({
  actions,
  row,
  maxVisible = 2,
  showMoreLabel = 'More',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const visibleActions = actions.slice(0, maxVisible)
  const hiddenActions = actions.slice(maxVisible)

  const handleActionClick = (action) => {
    action.onClick(row)
  }

  const isActionDisabled = (action) => {
    return action.isDisabled ? action.isDisabled(row) : false
  }

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {visibleActions.map((action, index) => (
        <IconButton
          key={index}
          aria-label={action.label}
          icon={action.icon}
          size={action.size || 'sm'}
          variant={action.variant || 'ghost'}
          colorScheme={action.colorScheme}
          onClick={() => handleActionClick(action)}
          isDisabled={isActionDisabled(action)}
        />
      ))}
      
      {hiddenActions.length > 0 && (
        <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            size="sm"
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {showMoreLabel}
          </MenuButton>
          <MenuList>
            {hiddenActions.map((action, index) => (
              <MenuItem
                key={index}
                icon={action.icon}
                onClick={() => {
                  handleActionClick(action)
                  setIsMenuOpen(false)
                }}
                isDisabled={isActionDisabled(action)}
              >
                {action.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      )}
    </Box>
  )
}
