import React from 'react';
import { render } from 'react-dom';

type DataType = 'string' | 'number'; // define possible data types

interface Column {
  name: string;
  type: DataType;
}

interface DataTableProps {
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  columns: Column[];
}

interface EditTableIndexesProps extends DataTableProps {
  modifyColumns: number;
  setModifyColumns: React.Dispatch<React.SetStateAction<number>>;
}

export default function EditTableIndexes({ columns, setColumns, modifyColumns, setModifyColumns }: EditTableIndexesProps) {
  return (
    <>
      {modifyColumns === 0 && (
        <button type="button" className="btn btn-primary" onClick={() => setModifyColumns(1)}>
          Edit Table Columns
        </button>
      )}
      {modifyColumns === 1 && (
        <div className="EditTableColumns">
          <table>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <td key={index}>
                    {index !== 0 &&
                    <input
                      type="text"
                      value={column.name}
                      onChange={(e) => {
                        const newColumns = [...columns];
                        newColumns[index].name = e.target.value;
                        setColumns(newColumns);
                      }}
                    />
                    }
                  </td>
                ))}
                <td>
                  <button type="button" className="btn btn-primary" onClick={() => setModifyColumns(0)}>
                    Done
                  </button>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      )}
    </>
  );
}
