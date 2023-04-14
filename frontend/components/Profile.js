function Profile({users}) {
  return (
    <div className="pr-[00px] xl:ml-[370px] border-l border-r xl:min-w-[576px] sm:ml-[15%] max-w-xl ml-[px] flex-grow sm:pl-0 min-w-[15%]">
        <div className= " rounded-sm sticky z-30 top-0 flex  h-14 items-center bg-opacity-75 backdrop-blur-sm bg-violet-500" onClick={()=>handleTop()}>
              <h1 className=" font-bold dark:text-gray-800 text-white text-2xl ml-6" >Profile</h1>
            </div>
   
        <div className="flex pt-4  pl-4 pb-4 border-b w-[600px]  ">
            <img src="/usericon.jpg" 
            alt="Profile Picture" 
            className="ml-2 mr-1 h-32 w-32 rounded-full " 
            />
        {/* hidden xl:inline leading-5 */}
        <div className="flex flex-col ml-5">
        <div className="flex">
            <h4 className="font-bold pr-3">{users.username}</h4>
            <h4 className="font-bold text-gray-500">{users.tag}</h4>
        </div>
        <div className="flex mt-2">
            <p className="pr-10">Follower: {users.follower}</p>
            <p>Following: {users.following}</p>
        </div>
        <div className="flex mt-2">
            <p className="pr-10">Caption</p>
            
            </div>
        </div>
        </div>        
            
        
        
    </div>
  )
}

export default Profile