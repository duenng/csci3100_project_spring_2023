import "./navbar.scss"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ParkIcon from '@mui/icons-material/Park';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="wrapper">
          <div className="search">
            <input type="text" placeholder="search..."/>
            <SearchOutlinedIcon/>
          </div>
          <div className="items">
            <div className="item">
            <ParkIcon className="icon"/>
            </div>
            <div className="item">
            <WbCloudyIcon className="icon"/>
            </div>
            <div className="item">
            <AddIcon className="icon"/>
            </div>
            <div className="item">
            <CreateIcon className="icon"/>
            </div>
            <div className="item">
            <img src="https://images.pexels.com/photos/16198167/pexels-photo-16198167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="avatar"/>
            
            </div>
          
          </div>
        </div>
    </div>
  );
};
export default Navbar
