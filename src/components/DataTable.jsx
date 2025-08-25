import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  HStack,
  VStack,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Select,
  ButtonGroup,
  IconButton,
  useColorModeValue,
  Collapse,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { flexRender } from "@tanstack/react-table";
import { useTableInstance } from "../hooks/useTableInstance";

// ✅ Editable Text Cell
export const EditableTextCell = ({ value, placeholder, onEdit }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editValue, setEditValue] = React.useState(value || "");
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setEditValue(value || "");
  }, [value]);

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue !== value) {
      onEdit(editValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      if (editValue !== value) {
        onEdit(editValue);
      }
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditValue(value || "");
    }
  };

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
        variant="unstyled"
        bg="transparent"
        _focus={{ boxShadow: "none", borderColor: "blue.400" }}
        autoComplete="off"
      />
    );
  }

  return (
    <Box
      onDoubleClick={() => setIsEditing(true)}
      cursor="pointer"
      _hover={{ bg: "gray.100" }}
      p={1}
      borderRadius="md"
      minH="32px"
      display="flex"
      alignItems="center"
    >
      {value || placeholder || "-"}
    </Box>
  );
};

// ✅ Editable Number Cell
export const EditableNumberCell = ({
  value,
  placeholder,
  min,
  max,
  step,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editValue, setEditValue] = React.useState(value?.toString() || "");
  const [error, setError] = React.useState(null);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setEditValue(value?.toString() || "");
  }, [value]);

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const validateValue = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return null;
    if (min !== undefined && num < min) {
      setError(`Value must be at least ${min}`);
      return null;
    }
    if (max !== undefined && num > max) {
      setError(`Value must be at most ${max}`);
      return null;
    }
    setError(null);
    return num;
  };

  const handleBlur = () => {
    setIsEditing(false);
    const validatedValue = validateValue(editValue);
    if (validatedValue !== null && validatedValue !== value) {
      onEdit(validatedValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      const validatedValue = validateValue(editValue);
      if (validatedValue !== null && validatedValue !== value) {
        onEdit(validatedValue);
      }
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditValue(value?.toString() || "");
      setError(null);
    }
  };

  if (isEditing) {
    return (
      <VStack align="start" spacing={1}>
        <Input
          ref={inputRef}
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          size="sm"
          variant="unstyled"
          bg="transparent"
          _focus={{ boxShadow: "none", borderColor: "blue.400" }}
          isInvalid={!!error}
          autoComplete="off"
        />
        {error && (
          <Text fontSize="xs" color="red.500" ml={1}>
            {error}
          </Text>
        )}
      </VStack>
    );
  }

  return (
    <Box
      onDoubleClick={() => setIsEditing(true)}
      cursor="pointer"
      _hover={{ bg: "gray.100" }}
      p={1}
      borderRadius="md"
      minH="32px"
      display="flex"
      alignItems="center"
    >
      {value?.toString() || placeholder || "-"}
    </Box>
  );
};

// ✅ Main DataTable
export function DataTable({
  data,
  columns,
  isLoading = false,
  error = null,
  emptyMessage = "No data available",
  variant = "unstyled",
  colorScheme = "blue",
  size = "md",
  ariaLabel = "Data table",
  ariaDescribedBy,
  emptyStateRenderer,
  loadingStateRenderer,
  errorStateRenderer,
  enableGlobalFilter = true, // ✅ Added global filter prop
  ...options
}) {
  const { table, state } = useTableInstance({
    data,
    columns,
    enableGlobalFilter,
    ...options,
  });

  const bgColor = "transparent";
  const borderColor = useColorModeValue("transparent", "transparent");

  // 🔄 Loading
  if (isLoading) {
    return loadingStateRenderer ? (
      <>{loadingStateRenderer}</>
    ) : (
      <Box textAlign="center" py={8}>
        <Spinner size="lg" color={`${colorScheme}.500`} />
        <Text mt={4}>Loading...</Text>
      </Box>
    );
  }

  // ⚠️ Error
  if (error) {
    return errorStateRenderer ? (
      <>{errorStateRenderer}</>
    ) : (
      <Alert status="error" bg="transparent" border="none">
        <AlertIcon />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // 🈳 Empty
  if (data.length === 0) {
    return emptyStateRenderer ? (
      <>{emptyStateRenderer}</>
    ) : (
      <Box textAlign="center" py={8}>
        <Text color="gray.400">{emptyMessage}</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      {/* 🔎 Global Search */}
      {enableGlobalFilter && (
        <HStack>
          <Box position="relative" flex={1}>
            <SearchIcon
              position="absolute"
              left={3}
              top="50%"
              transform="translateY(-50%)"
              color="gray.400"
              zIndex={1}
            />
            <Input
              placeholder="Search all columns..."
              value={state.globalFilter ?? ""}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              pl={10}
              size={size}
              variant="unstyled"
              bg="transparent"
              _hover={{ bg: "transparent" }}
              _focus={{ bg: "transparent", boxShadow: "none" }}
            />
          </Box>
        </HStack>
      )}

      {/* 📊 Table */}
      <TableContainer border="none" borderColor={borderColor} bg={bgColor}>
        <Table variant={variant} size={size} aria-label={ariaLabel}>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id} bg="transparent">
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                    cursor={header.column.getCanSort() ? "pointer" : "default"}
                    onClick={header.column.getToggleSortingHandler()}
                    bg="transparent"
                  >
                    <Flex align="center" justify="space-between">
                      <Box>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </Box>
                      {header.column.getCanSort() && (
                        <Box ml={2}>
                          {header.column.getIsSorted() === "asc" && "🔼"}
                          {header.column.getIsSorted() === "desc" && "🔽"}
                        </Box>
                      )}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <Tr bg="transparent">
                  {row.getVisibleCells().map((cell) => (
                    <Td
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      bg="transparent"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                </Tr>
                {row.getIsExpanded() && (
                  <Tr>
                    <Td colSpan={row.getVisibleCells().length} bg="transparent">
                      <Collapse in={row.getIsExpanded()} animateOpacity>
                        <Box p={4} bg="transparent" border="none">
                          <Text>Expanded content for row {row.id}</Text>
                        </Box>
                      </Collapse>
                    </Td>
                  </Tr>
                )}
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* ⏩ Pagination */}
      {options.enablePagination && (
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <HStack spacing={2}>
            <Text fontSize="sm" color="gray.400">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </Text>
            <Text fontSize="sm" color="gray.400">
              ({table.getFilteredRowModel().rows.length} total rows)
            </Text>
          </HStack>

          <HStack spacing={2}>
            <ButtonGroup size="sm" isAttached variant="unstyled">
              <IconButton
                aria-label="Go to first page"
                icon={<ChevronsLeft size={18} />}
                onClick={() => table.setPageIndex(0)}
                isDisabled={!table.getCanPreviousPage()}
                variant="unstyled"
              />
              <IconButton
                aria-label="Go to previous page"
                icon={<ChevronLeftIcon />}
                onClick={() => table.previousPage()}
                isDisabled={!table.getCanPreviousPage()}
                variant="unstyled"
              />
              <IconButton
                aria-label="Go to next page"
                icon={<ChevronRightIcon />}
                onClick={() => table.nextPage()}
                isDisabled={!table.getCanNextPage()}
                variant="unstyled"
              />
              <IconButton
                aria-label="Go to last page"
                icon={<ChevronsRight size={18} />}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                isDisabled={!table.getCanNextPage()}
                variant="unstyled"
              />
            </ButtonGroup>

            <HStack spacing={2}>
              <Text fontSize="sm">Rows per page:</Text>
              <Select
                size="sm"
                w="70px"
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                variant="unstyled"
                bg="transparent"
                _hover={{ bg: "transparent" }}
                _focus={{ bg: "transparent", boxShadow: "none" }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </Select>
            </HStack>
          </HStack>
        </Flex>
      )}

      {/* ✅ Row Selection Summary */}
      {options.enableRowSelection &&
        Object.keys(state.rowSelection).length > 0 && (
          <Alert status="info" bg="transparent" border="none">
            <AlertIcon />
            <AlertTitle>Selection:</AlertTitle>
            <AlertDescription>
              {Object.keys(state.rowSelection).length} row(s) selected
            </AlertDescription>
          </Alert>
        )}
    </VStack>
  );
}
