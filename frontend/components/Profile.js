function Profile() {
  return (
    <div className="pt-4 pr-[00px] xl:ml-[370px] border-l border-r xl:min-w-[576px] sm:ml-[15%] max-w-xl ml-[px] flex-grow sm:pl-0 min-w-[15%]">
        <div className="top-0 z-50 bg-white border-b border-purple-200 flex py-2 px-3 sticky">
        <h2 className="text-lg sm:text-xl font-bold">Profile</h2>
        </div>
        <div className="flex pt-4  pl-4 pb-4 border-b w-[600px]  ">
            <img src="/usericon.jpg" 
            alt="Profile Picture" 
            className="ml-2 mr-1 h-32 w-32 rounded-full " 
            />
        {/* hidden xl:inline leading-5 */}
        <div className="flex flex-col ml-5">
        <div className="flex">
            <h4 className="font-bold pr-3">Username</h4>
            <h4 className="font-bold text-gray-500">@username</h4>
        </div>
        <div className="flex mt-2">
            <p className="pr-10">Follower:</p>
            <p>Following:</p>
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