import React from "react";
import { format } from "date-fns";
import { EditableTextCell } from "../components/cells/EditableTextCell";
import { EditableNumberCell } from "../components/cells/EditableNumberCell";
import { EditableDateCell } from "../components/cells/EditableDateCell";
import { EditableSelectCell } from "../components/cells/EditableSelectCell";
import { EditableStatusCell } from "../components/cells/EditableStatusCell";
import { StatusBadge } from "../components/cells/StatusBadge";
import { ActionsCell } from "../components/cells/ActionsCell";
import { Checkbox, IconButton } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";

// Text column
export function createTextColumn(accessorKey, header, options = {}) {
  return {
    accessorKey,
    id: options.id || accessorKey, // <-- Ensure ID exists
    header,
    type: "text",
    isEditable: options.isEditable || false,
    cell: ({ getValue, row }) => {
      const value = getValue();
      return options.isEditable ? (
        <EditableTextCell
          value={value}
          placeholder={options.placeholder}
          onEdit={(newValue) => options.onEdit?.(newValue, row.original)}
        />
      ) : (
        <span>{value || "-"}</span>
      );
    },
  };
}

// Number column
export function createNumberColumn(accessorKey, header, options = {}) {
  return {
    accessorKey,
    id: options.id || accessorKey,
    header,
    type: "number",
    isEditable: options.isEditable || false,
    cell: ({ getValue, row }) => {
      const value = getValue();
      const formattedValue = options.format
        ? new Intl.NumberFormat(undefined, options.format).format(value || 0)
        : value?.toString() || "-";

      return options.isEditable ? (
        <EditableNumberCell
          value={value}
          placeholder={options.placeholder}
          min={options.min}
          max={options.max}
          step={options.step}
          onEdit={(newValue) => options.onEdit?.(newValue, row.original)}
        />
      ) : (
        <span>{formattedValue}</span>
      );
    },
  };
}

// Date column
export function createDateColumn(accessorKey, header, options = {}) {
  return {
    accessorKey,
    id: options.id || accessorKey,
    header,
    type: "date",
    isEditable: options.isEditable || false,
    cell: ({ getValue, row }) => {
      const value = getValue();
      const date = value ? new Date(value) : null;
      const formattedDate = date
        ? format(date, options.format || "MMM dd, yyyy")
        : "-";

      return options.isEditable ? (
        <EditableDateCell
          value={date}
          placeholder={options.placeholder}
          format={options.format}
          onEdit={(newValue) => options.onEdit?.(newValue, row.original)}
        />
      ) : (
        <span>{formattedDate}</span>
      );
    },
  };
}

// Select column
export function createSelectColumn(accessorKey, header, options) {
  return {
    accessorKey,
    id: options.id || accessorKey,
    header,
    type: "select",
    isEditable: true,
    cell: ({ getValue, row }) => {
      const value = getValue();
      return (
        <EditableSelectCell
          value={value}
          options={options.options}
          placeholder={options.placeholder}
          isClearable={options.isClearable}
          isSearchable={options.isSearchable}
          onEdit={(newValue) => options.onEdit?.(newValue, row.original)}
        />
      );
    },
  };
}

// Status column
export function createStatusColumn(accessorKey, header, options) {
  return {
    accessorKey,
    id: options.id || accessorKey,
    header,
    type: "status",
    isEditable: !!options.onEdit,
    cell: ({ getValue, row }) => {
      const value = getValue();
      const statusOption = options.options.find((opt) => opt.value === value);

      return options.onEdit ? (
        <EditableStatusCell
          value={value}
          options={options.options}
          onEdit={(newValue) => options.onEdit?.(newValue, row.original)}
        />
      ) : (
        <StatusBadge statusOption={statusOption} />
      );
    },
  };
}

// Actions column with enable flag (UPDATED)
export function createActionsColumn(header = "Actions", options = {}) {
  if (options.enable === false) return null;

  return {
    id: options.id || "actions", // <-- Always provide ID
    header: header || "Actions",
    type: "actions",
    enableSorting: false,
    enableColumnFilter: false,
    cell: ({ row }) => (
      <ActionsCell
        actions={options.actions}
        row={row.original}
        maxVisible={options.maxVisible}
        showMoreLabel={options.showMoreLabel}
      />
    ),
  };
}

// Checkbox column for row selection
export function createCheckboxColumn() {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        isChecked={table.getIsAllPageRowsSelected()}
        isIndeterminate={table.getIsSomePageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        isChecked={row.getIsSelected()}
        isIndeterminate={row.getIsSomeSelected()}
        onChange={row.getToggleSelectedHandler()}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableColumnFilter: false,
    size: 50,
  };
}

// Expand column for row expansion
export function createExpandColumn() {
  return {
    id: "expand",
    header: () => null,
    cell: ({ row }) => (
      <IconButton
        aria-label="Expand row"
        icon={row.getIsExpanded() ? <ChevronDownIcon /> : <ChevronRightIcon />}
        variant="ghost"
        size="sm"
        onClick={row.getToggleExpandedHandler()}
      />
    ),
    enableSorting: false,
    enableColumnFilter: false,
    size: 50,
  };
}
