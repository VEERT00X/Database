import React, { useState } from 'react';
import DataTable from './DataTable';
import './scss/index.css';

interface DataTableElement {
  id: number,
  name: string,
  surname: string,
  nickname: string,
  age: string,
  email: string,
  telephone: string,
  address: string,
  city: string,
  country: string,
  relationship: string,
  status: string,
}

function App() {
  const [data, setData] = useState<DataTableElement[]>([]);
  
  function handleJsonUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('json')) {
      alert('Only JSON files are allowed!');
      return;
    }

    const reader = new FileReader();
    reader.onload = function() {
      const text = reader.result;
      const json = JSON.parse(text as string);
      setData(json);
    }
    reader.readAsText(file);
  }

  return (
    <div className="App">
      <h1 className="App-header">Hello World... I may replace this later </h1>
      <div className="GetJsonDataButton">
        <input type="file" onChange={handleJsonUpload} />
      </div>
      <DataTable data={data} setData={setData} />
    </div>
  );
}

export default App;
