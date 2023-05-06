import React, { useEffect, useState } from 'react';
import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from '../../datatablesource';
import { Link } from 'react-router-dom';

const Datatable = () => {
  const [userRows, setUserRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3001/admin/user');
      const data = await res.json();
      const formattedUserRows = data.map((user) => ({
        id: user.userId,
        username: user.username,
        tag: user.tag,
        img: user.avatar,
        following: user.following.length,
        follower: user.follower.length,
      }));
      setUserRows(formattedUserRows);
    };

    fetchData();
  }, []);

  const deleteUserRow = (userId) => {
    setUserRows((prevUserRows) => prevUserRows.filter((row) => row.id !== userId));
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row.id}`} style={{ textDecoration: 'none' }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={async () => {
                try {
                  const response = await fetch(`http://localhost:3001/admin/user/${params.row.id}`, {
                    method: 'DELETE',
                  });
                  if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                  }
                  console.log(`Deleted user ${params.row.id}`);
                  deleteUserRow(params.row.id);
                } catch (error) {
                  console.error('Error deleting user:', error);
                }
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={userRows}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Datatable;
