import React, { useState } from "react";
import DataTable from "./DataTable";
import "./scss/index.css";

interface DataTableElement {
  [key: string]: string | number | boolean;
}

function App() {
  const [data, setData] = useState<DataTableElement[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [config, setConfig] = useState<any[]>([]);

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
        {data.length == 0 && <input type="file" onChange={handleJsonUpload} />}
      </div>
      <div className="DataTable">
        {data.length > 0 && (
          <DataTable
            setData={setData}
            data={data}
            columns={columns}
            setColumns={setColumns}
            config={config}
          />
        )}
      </div>
    </div>
  );
}

export default App;
