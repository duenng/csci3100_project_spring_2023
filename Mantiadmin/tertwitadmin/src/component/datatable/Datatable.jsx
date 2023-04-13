import "./datatable.scss"
import { DataGrid} from '@mui/x-data-grid';
import {userColumns, userRows } from "../../datatablesource" ;
import {Link} from "react-router-dom"

const Datatable = () => {

 

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => console.log(params.row.id)}
              
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
  )
}

export default Datatable
