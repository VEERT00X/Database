import React, { useState } from "react";
import ModifyElement from "./ModifyDataElement";
import AddNewElement from "./CreateNewElement";
import returnJson from "./ts/returnJsonfile";
import EditTableIndexes from "./EditTableIndexes";

type DataType = "string" | "number"; // define possible data types

interface Column {
  name: string;
  type: DataType;
}

interface DataTableProps {
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  data: any[];
  columns: Column[];
  config: any;
}

function DataTable({
  setData,
  data,
  columns,
  setColumns,
  config,
}: DataTableProps) {
  const [modify, setModify] = useState<any>(0);
  const [modifyData, setModifyData] = useState<any>({});
  const [modifyColumns, setModifyColumns] = useState<any>(0);

  const renderCell = (row: any, column: Column) => {
    if (modify === row.id && column.name !== "id") {
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
    <>
      <div className="TableControls">
        <th>
          <EditTableIndexes
            columns={columns}
            setColumns={setColumns}
            modifyColumns={modifyColumns}
            setModifyColumns={setModifyColumns}
            config={config}
            text="Edit columns"
          />
        </th>
        {modifyColumns == 0 && (
          <>
            <th>
              <button
                onClick={() =>
                  AddNewElement({ data, setData, setModify, config })
                }
              >
                New element
              </button>
            </th>
            <th>
              <button onClick={() => returnJson(data, columns, config)}>
                Save JSON
              </button>
            </th>
          </>
        )}
      </div>
      <table className="MainTable">
        <thead>
          <tr>
            {modifyColumns == 0 && (
              <>
                {columns.map((column, index) => (
                  <th key={index + column.name + column.type}>{column.name}</th>
                ))}
                <th>modify</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {modifyColumns == 0 && (
            <>
              {data.map((row) => (
                <tr key={row.id + row.name}>
                  {columns.map((column) => renderCell(row, column))}
                  <td>
                    <ModifyElement
                      data={data}
                      setData={setData}
                      Modify={modify}
                      setModify={setModify}
                      usId={row.id}
                      ModifyData={modifyData}
                      setModifyData={setModifyData}
                      config={config}
                    />
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </>
  );
}
export default DataTable;
