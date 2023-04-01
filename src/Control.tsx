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
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => isConfigured()}
        >
          {text}
        </button>
      )}
      {modifyColumns === 1 && (
        <>
          <div className="EditTableColumns">
            <h1>Columns</h1>
            <table>
              <thead>
                <tr>
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
                  <td>
                    <p>Tools</p>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
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
                          Delete
                        </button>
                      )}
                    </td>
                  ))}
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        const newColumns = [...columns];
                        newColumns.push({ name: "New Column", type: "string" });
                        setColumns(newColumns);
                      }}
                    >
                      New
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setModifyColumns(0)}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="EditTableConfig">
            <h1>Config</h1>
            <table>
              <thead>
                <tr>
                  <td>Settings</td>
                  {Object.keys(config[0]).map((key) => (
                    <td key={key}>{key}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {config.map((row: any, index: any) => (
                  <tr key={index}>
                    <td>Value</td>
                    {Object.values(row).map((value: any, index) => (
                      <td key={index}>
                        {typeof value === "string" && (
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => {
                              let newConfig = [...config];
                              newConfig[index][Object.keys(row)[index]] =
                                e.target.value;
                              setconfig(newConfig);
                            }}
                          />
                        )}
                        {typeof value === "number" && (
                          <input
                            type="number"
                            value={value}
                            onChange={(e) => {
                              let newConfig = [...config];
                              newConfig[index][Object.keys(row)[index]] =
                                e.target.value;
                              setconfig(newConfig);
                            }}
                          />
                        )}
                        {typeof value === "boolean" && (
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => {
                              let newConfig = [...config];
                              newConfig[index][Object.keys(row)[index]] =
                                e.target.checked;
                              setconfig(newConfig);
                            }}
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
        // so the code of the cheakbox dosent work for now so you will have to wait for the next update
      )}
    </>
  );
}
