// columns.js
import { createTextColumn, createNumberColumn } from "../src/index";

export const columns = [
  createTextColumn("name", "Name", {
    enableGlobalFilter: true,
    isEditable: true
  }),
  createNumberColumn("age", "Age", {
    enableGlobalFilter: true
  }),
  createTextColumn("role", "Role")
];
