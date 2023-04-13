export const userColumns = [

    { field: 'id', headerName: 'ID', width: 100 },
    { field: "user", headerName:"Username", width: 230, renderCell: (params)=>{
        return(
            <div className="cellWithImg">
                <img className="cellImg" src={params.row.img} alt=""/>
                {params.row.username}
            </div>

        );

    },
  },
  { field:"tag", headerName: "Tag", width:170,},
  
    { field:"following", headerName: "Following", width:100,},

    { field:"follower", headerName: "Follower", width:100,},

  //  { field:"status", headerName: "Status", width:160,
   // renderCell:(params)=>{
   //     return <div className={`cellwithStatus ${params.row.status}`}>
    //            {params.row.status}
  //              </div>
        
    //},
//},

];

// 連database
export const userRows = [
    {
        id:1,
        username: "Snow",
        tag:125,
        img: "https://images.pexels.com/photos/16167170/pexels-photo-16167170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        status: "online",
        following: "snow@gmail.com",
        follower: "snow@gmail.com",
    },
    {
        id: 2,
        username: "Snow",
        tag:127,
        img: "https://images.pexels.com/photos/16167170/pexels-photo-16167170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        status: "online",
        following: "snow@gmail.com",
        follower: "snow@gmail.com",
    },
    {
        id: 100,
        username: "Snow",
        tag:129,
        img: "https://images.pexels.com/photos/16167170/pexels-photo-16167170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        status: "offline",
        following: "snow@gmail.com",
        follower: "snow@gmail.com",
    },
    












]