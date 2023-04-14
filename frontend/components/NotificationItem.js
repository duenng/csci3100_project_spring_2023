function NotificationItem({key, notification}) {
  return (
    
    <div className="pr-[00px] xl:ml-[370px] border-l border-r xl:min-w-[576px] sm:ml-[15%] max-w-xl ml-[px] flex-grow sm:pl-0 min-w-[15%]">
        <div className= " rounded-sm sticky z-30 top-0 flex  h-14 items-center bg-opacity-75 backdrop-blur-sm bg-violet-500" onClick={()=>handleTop()}>
              <h1 className=" font-bold dark:text-gray-800 text-white text-2xl ml-6" >Notification</h1>
            </div>
    </div>
    
  )
};

export default NotificationItem;