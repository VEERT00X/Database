import React, { useState } from "react";
import DataTable from "./DataTable";
import "bootstrap/dist/css/bootstrap.min.css";

interface DataTableElement {
  [key: string]: string | number | boolean;
}

function App() {
  const [data, setData] = useState<DataTableElement[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [config, setConfig] = useState<any[]>([]);

  function createNewDatabase() {
    const newdata = [{ id: 1 }];
    const newcolumns = [{ name: "id", type: "number" }];
    const newconfig = [
      { promptcheck: false },
      { primarycolor: "" },
      { secondarycolor: "" },
    ];
    setData(newdata);
    setColumns(newcolumns);
    setConfig(newconfig);
  }

  function handleJsonUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("json")) {
      alert("Only JSON files are allowed!");
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      const text = reader.result;
      const json = JSON.parse(text as string);
      const { data, columns, config } = json;
      setData(data);
      setColumns(columns);
      setConfig(config);
    };
    reader.readAsText(file);
  }

  return (
    <div className="App">
      <h1 className="App-header">Database</h1>
      <div className="GetJsonDataButton">
        {data.length == 0 && (
          <div
            className="upload-btn"
            onClick={() => {
              document.getElementById("click")?.click();
            }}
          >
            <input type="file" id="click" onChange={handleJsonUpload} />
            File Upload
          </div>
        )}
        {data.length == 0 && (
          <button onClick={createNewDatabase}>New Database</button>
        )}
      </div>
      <div className="DataTable">
        {data.length > 0 && (
          <DataTable
            data={data}
            columns={columns}
            config={config}
            setColumns={setColumns}
            setConfig={setConfig}
            setData={setData}
          />
        )}
      </div>
    </div>
  );
}

export default App;
