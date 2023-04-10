import { DotsHorizontalIcon} from "@heroicons/react/outline";

export default function Post(){

    return(
        <>
        <div  className=" flex items-center justify-left text-black-700 justify-start-onlarge" >
        {/* User Profile Picture, Need to import from database*/}
        <img
            src="/usericon.jpg"
            alt="Profile Picture"
            className=" w-12 h-12 rounded-full"
        />

        <div className="">
        {/* User Name, Need to import from database*/}
          <h4 style={{padding:0, margin:0}}>Username</h4>
          <p style={{padding:0, margin:0}}>@username</p>
        </div>
        <DotsHorizontalIcon className="h-5 ml-auto"/>
      </div>
        </> 
    )
}
