import React, { useState } from 'react';
import ModifyElement from './ModifyDataElement';
import AddNewElement from './CreateNewElement';
import returnJson from './ts/returnJsonfile';
import EditTableIndexes from './EditTableIndexes';

type DataType = 'string' | 'number'; // define possible data types

interface Column {
  name: string;
  type: DataType;
}

interface DataTableProps {
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  data: any[];
  columns: Column[];
}

function DataTable({ setData ,data, columns, setColumns }: DataTableProps) {
  const [modify, setModify] = useState<any>(0);
  const [modifyData, setModifyData] = useState<any>({});
  const [modifyColumns, setModifyColumns] = useState<any>(0);

  const renderCell = (row: any, column: Column) => {
    if (modify === row.id && column.name !== "id"){
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
          {modifyColumns == 0 && <>
            {columns.map((column) => (
              <th key={column.name}>{column.name}</th>
            ))}
            <th><br /></th>
            <th>Tools</th>
            <th>
            <button onClick={() => AddNewElement({ data, setData, setModify })}>
              Add new element
            </button>
            </th>
            <th>
              <button onClick={() => returnJson(data, columns)}>Create Copy</button>
            </th>
          </>}
          <th>
            <EditTableIndexes columns={columns} setColumns={setColumns} modifyColumns={modifyColumns} setModifyColumns={setModifyColumns} />
          </th>
          </tr>
      </thead>
      <tbody>{modifyColumns == 0 && <>
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
        </>}
      </tbody>
    </table>
  );
}

export default DataTable;
