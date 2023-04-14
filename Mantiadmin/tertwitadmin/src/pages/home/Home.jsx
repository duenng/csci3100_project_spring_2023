import Navbar from "../../component/navbar/Navbar"
import Sidebar from "../../component/sidebar/Sidebar"
import Table from "../../component/table/Table"
import Widget from "../../component/widget/Widget"
import "./home.scss"

const Home = () => {
  return (
    <div className="home">
     <Sidebar/>
     <div className="homecontainer">
        <Navbar/>
        <div className="widgets">
            <Widget type="user"/>
            <Widget type="post"/>
            <Widget type="comment"/>
            <Widget type="balance"/>
        </div>
        <div className="listContainer">
            <div className="listTitle">Recent Users</div>
            <Table/>

        </div>
     </div>
    </div>
  )
}

export default Home
