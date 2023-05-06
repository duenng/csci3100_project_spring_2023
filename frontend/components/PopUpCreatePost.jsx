import CreatePost from "./CreatePost";

export default function PopUpCreate({user,url,handler}){
    
    const clickHandler=(e)=>{
        let classes = e.target.classList
        if(classes.contains("backdrop-blur-sm")){
            handler()
        }
    }
    
    return(
        <>
        {/* blur thw whole screen and pop up the craete post panel*/}
        <div className="fixed w-screen h-screen z-50 top-0 left-0 justify-items-center grid items-center bg-opacity-75 backdrop-blur-sm bg-slate-400" 
            onClick={(e)=>clickHandler(e)}>
            <div className="w-2/5 min-h-1/4 p-2 pr-4 pt-4 bg-slate-200 rounded-xl shadow-lg shadow-violet-400">
                <CreatePost user={user} url={url} popUp={true}/>
            </div>
        </div>
        </>
    )
}