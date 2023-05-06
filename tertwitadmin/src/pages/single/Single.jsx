import "./single.scss"
import Navbar from "../../component/navbar/Navbar"
import Sidebar from "../../component/sidebar/Sidebar"
import List from "../../component/table/Table"

const Single = () => {
  return (
    <div className="single">
      <Sidebar/>
      <div className="singleContainer">
        <Navbar/>
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src="https://images.pexels.com/photos/16167163/pexels-photo-16167163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="itemImg"/>
              <div className="details">
                <h1 className="itemTitle">Duen Ng</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">ngsuiyat2002@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+852 6360 6590</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">赤泥坪33A</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">Hong Kong</span>
                </div>
              </div>

            </div>
            
          </div>
          <div className="right"></div>
          <div className="bottom">
          <h1 className="title">recent users</h1>
            <List/>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Single
