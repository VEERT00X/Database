import React, { useState } from 'react';
import ModifyElement from './ModifyDataElement';
import AddNewElement from './CreateNewElement';
import returnJson from './ts/returnJsonfile';

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

function DataTable({setData, data}: {setData: React.Dispatch<React.SetStateAction<DataTableElement[]>>, data: DataTableElement[];}) {
  const [Modify, setModify] = useState<any>(0);
  const [ModifyData, setModifyData] = useState<any>({});
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
          <th><br/></th>
          <th>Tools</th>
          <th><button onClick={() => AddNewElement({data, setData, setModify})}>Add new</button></th>
          <th><button onClick={() => returnJson(data)}>Create Copy</button></th>
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
            <td><input type="text" value={ModifyData.name} onChange={(e) => setModifyData({...ModifyData, name: e.target.value})}/></td>
            <td><input type="text" value={ModifyData.surname} onChange={(e) => setModifyData({...ModifyData, surname: e.target.value})}/></td>
            <td><input type="text" value={ModifyData.nickname} onChange={(e) => setModifyData({...ModifyData, nickname: e.target.value})}/></td>
            <td><input type="text" value={ModifyData.age} onChange={(e) => setModifyData({...ModifyData, age: e.target.value})}/></td>
            <td><input type="text" value={ModifyData.email} onChange={(e) => setModifyData({...ModifyData, email: e.target.value})}/></td>
            <td><input type="text" value={ModifyData.telephone} onChange={(e) => setModifyData({...ModifyData, telephone: e.target.value})}/></td>
            <td><input type="text" value={ModifyData.address} onChange={(e) => setModifyData({...ModifyData, address: e.target.value})}/></td>
            <td><input type="text" value={ModifyData.city} onChange={(e) => setModifyData({...ModifyData, city: e.target.value})}/></td>
            <td><input type="text" value={ModifyData.country} onChange={(e) => setModifyData({...ModifyData, country: e.target.value})}/></td>
            <td><input type="text" value={ModifyData.relationship} onChange={(e) => setModifyData({...ModifyData, relationship: e.target.value})}/></td>
            <td><input type="text" value={ModifyData.status} onChange={(e) => setModifyData({...ModifyData, status: e.target.value})}/></td>
            </>
          }
            <td><br/></td>
            <td><ModifyElement data={data} setData={setData} Modify={Modify} setModify={setModify} usId={row.id} ModifyData={ModifyData} setModifyData={setModifyData} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
