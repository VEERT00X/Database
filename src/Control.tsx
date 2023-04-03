import React from "react";
import generatekey from "./ts/generatekey";

type DataType = "string" | "number"; // define possible data types

interface Column {
  name: string;
  type: DataType;
}

interface DataTableProps {
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  columns: Column[];
}
interface Configure extends DataTableProps {
  modifyColumns: number;
  text: string;
  setModifyColumns: React.Dispatch<React.SetStateAction<number>>;
  config: any;
  setconfig: React.Dispatch<React.SetStateAction<any>>;
}

export default function Config({
  columns,
  setColumns,
  modifyColumns,
  setModifyColumns,
  text,
  config,
  setconfig,
}: Configure) {
  const isConfigured = () => {
    let res = generatekey(config);
    if (res != true) {
      setModifyColumns(0);
      return;
    }
    setModifyColumns(1);
  };
  return (
    <>
      {modifyColumns === 0 && (
        <button type="button" className="w-100" onClick={() => isConfigured()}>
          {text}
        </button>
      )}
      {modifyColumns === 1 && (
        <>
          <div className="EditTable">
            <table>
              <thead>
                <tr>
                  <td>
                    <button
                      type="button"
                      className="w-50"
                      onClick={() => {
                        setModifyColumns(0);
                      }}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="w-50"
                      onClick={() => {
                        const newColumns = [...columns];
                        newColumns.push({ name: "New Column", type: "string" });
                        setColumns(newColumns);
                      }}
                    >
                      New
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Column</td>
                  {columns.map((column, index) => (
                    <td key={index}>
                      {index !== 0 && (
                        <input
                          type="text"
                          value={column.name}
                          onChange={(e) => {
                            const newColumns = [...columns];
                            newColumns[index].name = e.target.value;
                            setColumns(newColumns);
                          }}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tools</td>
                  {columns.map((column, index) => (
                    <td key={index + column.name + column.type}>
                      {index !== 0 && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            const newColumns = [...columns];
                            newColumns.splice(index, 1);
                            setColumns(newColumns);
                          }}
                        >
                          Delete Column
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
              <thead>
                <tr>
                  <td>Settings</td>
                  <td></td>
                  {config.map((row: any, index: number) =>
                    Object.values(row).map((value: any, index) => (
                      <td key={index}>{Object.keys(row)[index]}</td>
                    ))
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Value</td>
                  <td></td>
                  {config.map((row: any, rowIndex: number) =>
                    Object.values(row).map((value: any, valueIndex: number) => (
                      <td key={`${rowIndex}-${valueIndex}`}>
                        {typeof value === "string" && (
                          <input
                            key={`${rowIndex}-${valueIndex}-input`}
                            type="text"
                            value={value}
                            onChange={(e) => {
                              let newConfig = [...config];
                              newConfig[rowIndex][
                                Object.keys(row)[valueIndex]
                              ] = e.target.value;
                              setconfig(newConfig);
                            }}
                          />
                        )}
                        {typeof value === "number" && (
                          <input
                            key={`${rowIndex}-${valueIndex}-input`}
                            type="number"
                            value={value}
                            onChange={(e) => {
                              let newConfig = [...config];
                              newConfig[rowIndex][
                                Object.keys(row)[valueIndex]
                              ] = e.target.value;
                              setconfig(newConfig);
                            }}
                          />
                        )}
                        {typeof value === "boolean" && (
                          <input
                            key={`${rowIndex}-${valueIndex}-input`}
                            type="checkbox"
                            checked={value}
                            onChange={(e) => {
                              let newConfig = [...config];
                              newConfig[rowIndex][
                                Object.keys(row)[valueIndex]
                              ] = e.target.checked;
                              setconfig(newConfig);
                            }}
                          />
                        )}
                      </td>
                    ))
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
