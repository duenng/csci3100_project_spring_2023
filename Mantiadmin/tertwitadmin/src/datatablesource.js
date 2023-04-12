export const userColumns = [

    { field: 'id', headerName: 'ID', width: 70 },
    { field: "user", headerName:"User", width: 230, renderCell: (params)=>{
        return(
            <div className="cellWithImg">
                <img className="cellImg" src={params.row.img} alt=""/>
                {params.row.username}
            </div>

        );

    },
  },

    { field:"email", headerName: "Email", width:230,},

    { field:"age", headerName: "Age", width:100,},

    { field:"status", headerName: "Status", width:160,
    renderCell:(params)=>{
        return <div className={`cellwithStatus ${params.row.status}`}>
                {params.row.status}
                </div>
        
    },
},
];

// 連database
export const userRows = [
    {
        id:1,
        username: "Snow",
        img: "https://images.pexels.com/photos/16167170/pexels-photo-16167170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        status: "online",
        email: "snow@gmail.com",
        age: 35,
    },
    {
        id: 2,
        username: "Snow",
        img: "https://images.pexels.com/photos/16167170/pexels-photo-16167170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        status: "online",
        email: "snow@gmail.com",
        age: 35,
    },
    {
        id: 3,
        username: "Snow",
        img: "https://images.pexels.com/photos/16167170/pexels-photo-16167170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        status: "offline",
        email: "snow@gmail.com",
        age: 35,
    },
    












]