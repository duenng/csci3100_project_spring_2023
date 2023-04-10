import { DotsHorizontalIcon} from "@heroicons/react/outline";

export default function Post(){

    return(
        <>
        <div style={{display:'flex'}} className="items-center justify-center text-red-700 justify-start-onlarge" >
        {/* User Profile Picture, Need to import from database*/}
        <img
            src="/usericon.jpg"
            alt="Profile Picture"
            className=" w-10 h-10 rounded-full"
        />

        <div className="">
        {/* User Name, Need to import from database*/}
          <h4 style={{padding:0, margin:0}}>Username</h4>
          <p style={{padding:0, margin:0}}>@username</p>
        </div>
        <DotsHorizontalIcon className="h-5"/>
      </div>
        </> 
    )
}
