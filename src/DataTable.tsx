import React, { useState } from 'react';

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

interface DataTableProps {
  data: DataTableElement[];
}

function DeleteElement({data, setData, usId}: {data: DataTableElement[], setData: React.Dispatch<React.SetStateAction<DataTableElement[]>>, usId: number;}) {
  const handleDelete = () => {
    console.log("Deleting element with id of " + usId);
    setData(data.filter((row) => row.id !== usId));
  };  
  return (
    <button onClick={handleDelete}>Delete</button>
  );
}

function ModifyElement({data, setData, usId, Modify, setModify}: {data: DataTableElement[], setData: React.Dispatch<React.SetStateAction<DataTableElement[]>>, usId: number, Modify: number, setModify: React.Dispatch<React.SetStateAction<number>>;}) {
  const startModify = () => {
    setModify(usId);
  };
  return (
    <button onClick={startModify}>Modify</button>
  );
}


function DataTable({setData, data}: {setData: React.Dispatch<React.SetStateAction<DataTableElement[]>>, data: DataTableElement[];}) {
  const [Modify, setModify] = useState<number>(0);
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Nickname</th>
          <th>Age</th>
          <th>Email</th>
          <th>Telephone</th>
          <th>Address</th>
          <th>City</th>
          <th>Country</th>
          <th>Relationship</th>
          <th>Status</th>
          <th>Delete</th>
          <th>Modify</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            {Modify !== row.id ? <>
            <td>{row.name}</td>
            <td>{row.surname}</td>
            <td>{row.nickname}</td>
            <td>{row.age}</td>
            <td className='small'>{row.email}</td>
            <td>{row.telephone}</td>
            <td>{row.address}</td>
            <td>{row.city}</td>
            <td>{row.country}</td>
            <td>{row.relationship}</td>
            <td>{row.status}</td>
            </>
          : 
            <>
            <td><input type="text" value={row.name} onChange={(e) => setData(data.map((row) => row.id === Modify ? {...row, name: e.target.value} : row))}/></td>
            <td><input type="text" value={row.surname} onChange={(e) => setData(data.map((row) => row.id === Modify ? {...row, surname: e.target.value} : row))}/></td>
            <td><input type="text" value={row.nickname} onChange={(e) => setData(data.map((row) => row.id === Modify ? {...row, nickname: e.target.value} : row))}/></td>
            <td><input type="text" value={row.age} onChange={(e) => setData(data.map((row) => row.id === Modify ? {...row, age: e.target.value} : row))}/></td>
            <td><input type="text" value={row.email} className='small' onChange={(e) => setData(data.map((row) => row.id === Modify ? {...row, email: e.target.value} : row))}/></td>
            <td><input type="text" value={row.telephone} onChange={(e) => setData(data.map((row) => row.id === Modify ? {...row, telephone: e.target.value} : row))}/></td>
            <td><input type="text" value={row.address} onChange={(e) => setData(data.map((row) => row.id === Modify ? {...row, address: e.target.value} : row))}/></td>
            <td><input type="text" value={row.city} onChange={(e) => setData(data.map((row) => row.id === Modify ? {...row, city: e.target.value} : row))}/></td>
            <td><input type="text" value={row.country} onChange={(e) => setData(data.map((row) => row.id === Modify ? {...row, country: e.target.value} : row))}/></td>
            <td><input type="text" value={row.relationship} onChange={(e) => setData(data.map((row) => row.id === Modify ? {...row, relationship: e.target.value} : row))}/></td>
            <td><input type="text" value={row.status} onChange={(e) => setData(data.map((row) => row.id === Modify ? {...row, status: e.target.value} : row))}/></td>
            </>
          }
            <td><DeleteElement data={data} setData={setData} usId={row.id}/></td>
            <td><ModifyElement data={data} setData={setData} Modify={Modify} setModify={setModify} usId={row.id}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
