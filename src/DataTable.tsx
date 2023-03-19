import React, { useState } from 'react';
import ModifyElement from './ModifyDataElement';
import AddNewElement from './CreateNewElement';
import returnJson from './ts/returnJsonfile';

type DataType = 'string' | 'number'; // define possible data types

interface Column {
  name: string;
  type: DataType;
}

interface DataTableProps {
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  data: any[];
  columns: Column[];
}

function DataTable({ setData, data, columns }: DataTableProps) {
  const [modify, setModify] = useState<any>(0);
  const [modifyData, setModifyData] = useState<any>({});

  const renderCell = (row: any, column: Column) => {
    if (modify === row.id) {
      return (
        <td>
          <input
            type="text"
            value={modifyData[column.name]}
            onChange={(e) =>
              setModifyData({ ...modifyData, [column.name]: e.target.value })
            }
          />
        </td>
      );
    }
    return <td>{row[column.name]}</td>;
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.name}>{column.name}</th>
          ))}
          <th><br /></th>
          <th>Tools</th>
          <th>
            <button onClick={() => AddNewElement({ data, setData, setModify })}>
              Add new
            </button>
          </th>
          <th>
            <button onClick={() => returnJson(data)}>Create Copy</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              renderCell(row, column)
            ))}
            <td><br /></td>
            <td>
              <ModifyElement
                data={data}
                setData={setData}
                Modify={modify}
                setModify={setModify}
                usId={row.id}
                ModifyData={modifyData}
                setModifyData={setModifyData}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
