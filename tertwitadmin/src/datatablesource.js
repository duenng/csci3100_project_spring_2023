import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

// Import your userColumns
// import { userColumns } from './your_columns_file';

export const userColumns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'user',
    headerName: 'Username',
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="" />
          {params.row.username}
        </div>
      );
    },
  },
  { field: 'tag', headerName: 'Tag', width: 170 },
  { field: 'following', headerName: 'Following', width: 100 },
  { field: 'follower', headerName: 'Follower', width: 100 },
];

export default function UserTable() {
  const [userRows, setUserRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3001/admin/user');
        const data = await res.json();
        console.log('Fetched data:', data); // Check if data is fetched correctly
        const formattedUserRows = data.map((user) => ({
          id: user.userId,
          username: user.username,
          tag: user.tag,
          img: user.avatar,
          following: user.following.length,
          follower: user.follower.length,
        }));
        console.log('Formatted user rows:', formattedUserRows); // Check if rows are formatted correctly
        setUserRows(formattedUserRows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={userRows}
        columns={userColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
