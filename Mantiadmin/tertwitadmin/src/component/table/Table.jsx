import "./table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const List = () => {
    const rows = [
        {
            id: 115153155,
            user: "Duen ng",
            img: "https://images.pexels.com/photos/6656471/pexels-photo-6656471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            date: "12 April",
            status: "online",
        },

        {
            id: 115156666,
            user: "Tommy Shum",
            img: "https://images.pexels.com/photos/16173119/pexels-photo-16173119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            date: "12 April",
            status: "offline",
        },

        {
            id: 115157777,
            user: "Ricky Li",
            img: "https://images.pexels.com/photos/16167170/pexels-photo-16167170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            date: "12 April",
            status: "online",
        },
    ];




  return (
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell">User ID</TableCell>
          <TableCell className="tableCell">Username</TableCell>
          <TableCell className="tableCell">Date</TableCell>
          <TableCell className="tableCell">Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.id}>
            <TableCell className="tableCell">
              {row.id}
            </TableCell>
            <TableCell className="cellWrapper" >
              <img src={row.img} alt="" className="image"/>
              {row.user}</TableCell>
              
            <TableCell className="tableCell">{row.date}</TableCell>
            <TableCell className="tableCell">
              <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default List
