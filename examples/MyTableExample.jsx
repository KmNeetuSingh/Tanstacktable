import React, { useState } from "react";
import { Box, Heading, useToast } from "@chakra-ui/react";
import {
  DataTable,
  createTextColumn,
  createNumberColumn,
  createDateColumn,
  createActionsColumn,
} from "../src";

// Example data
const initialData = [
  { id: 1, name: "Amit", age: 25, joinDate: "2023-01-15" },
  { id: 2, name: "Priya", age: 30, joinDate: "2023-02-20" },
  { id: 3, name: "Rahul", age: 28, joinDate: "2023-03-10" },
];

export default function MyTableExample() {
  const [data, setData] = useState(initialData);
  const toast = useToast();

  // Inline cell edit handler
  const handleCellEdit = (row, columnId, newValue) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, [columnId]: newValue } : item
      )
    );
    toast({ title: `${columnId} updated`, status: "success", duration: 1500 });
  };

  // Columns definition (Actions column disabled and filtered out)
  const columns = [
    createTextColumn("name", "Name", {
      isEditable: true,
      onEdit: (val, row) => handleCellEdit(row, "name", val),
    }),
    createNumberColumn("age", "Age", {
      isEditable: true,
      onEdit: (val, row) => handleCellEdit(row, "age", val),
    }),
    createDateColumn("joinDate", "Join Date", {
      isEditable: true,
      onEdit: (val, row) => handleCellEdit(row, "joinDate", val),
    }),
    createActionsColumn("Actions", { enable: false }),
  ].filter(Boolean); // removes the Actions column if disabled

  return (
    <Box p={6}>
      <Heading size="lg" mb={6} textAlign="center">
        Basic table...
      </Heading>
      <DataTable
        columns={columns}
        data={data}
        enableGlobalFilter={true}
        enableSorting={true}
        enablePagination={true}
      />
    </Box>
  );
}
