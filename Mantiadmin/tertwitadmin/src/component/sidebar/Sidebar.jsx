import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Link} from "react-router-dom"
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";


const Sidebar = () => {
    const { dispatch } = useContext(DarkModeContext);
  return (
    <div className='sidebar'>
       
        <div className="top">
            <Link to="/" style={{textDecoration: "none"}}>
            <span className="logo">tertwitadmin</span></Link></div>
        <hr />
        <div className="center">
            <ul>
                <p className="title">Main</p>
                
                <li>
                     <DashboardIcon className="icon"/>
                    <span>Dashboard</span>
                </li>
                <p className="title">List</p>
                <Link to="/users/123" style={{textDecoration: "none"}}>
                <li>
                     <AccountBoxIcon className="icon"/>
                    <span>profile</span>
                </li>
                </Link>
                <Link to="/users" style={{textDecoration: "none"}}>
                <li>
                    <PersonIcon className="icon"/>
                    <span>Users</span>
                </li>
                </Link>
                <li>
                    <ChatBubbleIcon className="icon"/>
                    <span>Posts</span>
                </li>
                <p className="title">Service</p>
                <Link to="/users" style={{textDecoration: "none"}}>
                <li>
                     <PersonOffIcon className="icon"/>
                    <span>Del users</span>
                </li>
                </Link>
                <li>
                     <DeleteForeverIcon className="icon"/>
                    <span>Del comments</span>
                </li>
                <p className="title">User</p>
                <li>
                    <SettingsIcon className="icon"/>
                    <span>settings</span>
                </li>
                <li>
                    <LogoutIcon className="icon"/>
                    <span>logout </span>
                </li>
            </ul>
            </div>
            <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
