import { DataTable } from "../src/index"; 
import { columns } from "../examples/Column"; 

const data = [
  { name: "Neetu", age: 24, role: "Frontend Dev" },
  { name: "Arjun", age: 28, role: "Backend Dev" },
  { name: "Priya", age: 22, role: "Designer" }
];

const MyTable = () => {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default MyTable;
