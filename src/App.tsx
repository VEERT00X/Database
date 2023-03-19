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

  const columns: any[] = [
    { name: 'id', type: 'number' },
    { name: 'name', type: 'string' },
    { name: 'surname', type: 'string' },
    { name: 'nickname', type: 'string' },
    { name: 'age', type: 'number' },
    { name: 'email', type: 'string' },
    { name: 'telephone', type: 'string' },
    { name: 'address', type: 'string' },
    { name: 'city', type: 'string' },
    { name: 'country', type: 'string' },
    { name: 'relationship', type: 'string' },
    { name: 'status', type: 'string' },
    { name: 'color', type: 'string'}
  ];
  
  return (
    <div className="App">
      <h1 className="App-header">Database</h1>
      <div className="GetJsonDataButton">
        <input type="file" onChange={handleJsonUpload} />
      </div>
      <div className="DataTableContainer">
      <DataTable setData={setData} data={data} columns={columns} />
      </div>
    </div>
  );
}

export default App;
