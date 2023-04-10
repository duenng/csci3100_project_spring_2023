import { DotsHorizontalIcon} from "@heroicons/react/outline";


export default function Post(){

    return(
        <div style={{display:'flex'}} className="items-center justify-center text-gray-700 hoverElement justify-start-onlarge" >
        {/* User Profile Picture, Need to import from database*/}
        <img
			src="/usericon.jpg"
			alt="Profile Picture"
			className="w-1 h-1 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full"
		/>
        <div className="ml-2">
        {/* User Name, Need to import from database*/}
          <h4 style={{padding:0, margin:0}} className="text-sm font-medium">Username</h4>
          <p style={{padding:0, margin:0}} className="text-gray-500 text-xs">@username</p>
        </div>
        <DotsHorizontalIcon className="h-4"/>
      </div>
    )
}
