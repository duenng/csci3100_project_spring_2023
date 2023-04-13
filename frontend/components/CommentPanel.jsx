import { useRef, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";


export default function CommentPanel(props){
    const [text,setText] = useState("")
    const [images,setImages] = useState([])
    const [video,setVideo] = useState(null)
    const [message,setMessage] = useState("")
    const [uploadingImage,setUploadingI] = useState(false)
    const [uploadingVideo,setUploadingV] = useState(false)
    const textRef = useRef()
    let user = props.user

    const removeImage = (target) =>{
        setImages((prev)=>{
            return prev.filter((file)=>target!==file)
        })
    }

    const handleImage = async()=>{
        setUploadingI(true);
        let names = []
        try {
            const formData = new FormData();
            images.forEach((file,i)=>{
                formData.append("myImage_"+i, file);
            })
            const { data } = await axios.post("/api/image", formData);
            let files = data.data
            //console.log(files,typeof(files),Object.keys(files))
            Object.keys(files).forEach((key)=>{
                names = [...names,files[key]["newFilename"]]
            })
            console.log(names)
            setUploadingI(false)
            return names

        }catch (error) {
            console.log(error.response?.data);
            setUploadingI(false);
            return []
        }
    }

    const handleVideo = async()=>{
        setUploadingV(true);
        try {
            const formData = new FormData();
            formData.append("myVideo", video);
            const { data } = await axios.post("/api/video", formData);
            //console.log(data.data["myVideo"]["newFilename"]);
            setUploadingV(false);
            return data.data["myVideo"]["newFilename"]
        } catch (error) {
            console.log(error.response?.data);
            setUploadingV(false);
            return null
        }
    }

    const handleAdd = async(e) =>{
        setMessage("")
        if(!text.length){
            setMessage("Text is required.")
            return
        }
        let imageNames = []
        if(images.length){
           imageNames= await handleImage()
           if(!imageNames.length){
            return
           }
            //console.log(images)
        }
        let videoName = ""
        if(video){
            videoName = await handleVideo()
            //console.log(videoName)
            if(!videoName){
                return
            }
        }
        let date = new Date()
        let content = text
        //todo ftech comment to sever
        let data={
            userId:user.userId,
            postId:props.postId,
            replying:props.tag,
            text:content,
            image:imageNames,
            video:videoName,
            like:[],
            date:date
        }
        console.log(data)

        // post request, if res.status not ok, return

        //need change to current user info
        let newComment={
            user:user,
            replying:props.tag,
            text:content,
            image:imageNames,
            video:videoName,
            like:[],
            date:date
        }
        
        props.handler(newComment)
           
        setText("")
        textRef.current.value=""
        setImages([])
        setVideo(null)
        //todo: fetch
    }
    
    

    return(
        <>
        <div className="flex item-center mx-2 text-base flex-wrap">
            <img className="h-8 round-full m-4 flex-none" src ={`avatar/${user.avatar?user.avatar:"user.png"}`}/>
            <div className="flex-grow">
                <p className="m-1  text-gray-500">Reply {props.tag}</p>
                <textarea ref={textRef} className=" w-full border-none" placeholder="Comments here..." onChange={e=>setText(e.target.value)}/>
                {/* medias */}
                <div className="flex mx-1 flex-wrap">
                    {images.length?
                        images.map((file,index)=>{
                            let name = file.name
                            if( name.length>10){
                                name = name.slice(0,11)+"..."
                            }
                            return <div key={index} className=" align-middle flex-shrink-0 flex m-1 px-3 py-2 bg-sky-300 text-sm font-semibold rounded-md items-center"><a>{name}</a> <Icon className="ml-1" onClick={()=>removeImage(file)} width="16" icon="material-symbols:scan-delete" /></div>
                        })
                    :null}
                    {video?
                         <div className=" align-middle flex-shrink-0 flex m-1 px-3 py-2 bg-green-400 text-sm font-semibold rounded-md items-center"><a>{video.name>10?video.name.slice(0,11)+"...":video.name}</a> <Icon className="ml-1" onClick={()=>setVideo(null)} width="16" icon="material-symbols:scan-delete" /></div>
                        :null}
                </div>
                <p className="w-full text-red-600 font-semibold text-sm">{message?message:null}</p>
                <div className="flex m-2 flex-warp">
                    {/* image */}
                    <label>
                        <input type="file" hidden multiple
                        onChange={({ target }) => {
                            if (target.files) {
                                setMessage("")
                                const uploadedFiles = target.files;
                                const newFiles = Array.from(uploadedFiles);
                                for(let i = 0; i<newFiles.length;i++){
                                    let file = newFiles[i]
                                    let type = file.type.split('/')[0]
                                    if(type!=="image"){
                                       setMessage("You can only upload images.")
                                       return
                                    }
                                    if(file.size>4000 * 1024 * 1024){
                                        setMessage(`${file.name.length>50?file.name.slice(0,51)+"...":file.name} is too large.`)
                                       return
                                    }
                                }
                                setImages((prev) => {
                                    return [...prev, ...newFiles]});
                            }    
                            }
                        }
                        />
                        <Icon icon="mdi:picture-360" width="34"/>
                    </label>
                    {/* video */}
                    <label className="px-12">
                        <input type="file" hidden 
                        onChange={({ target }) => {
                            if (target.files) {
                                if(video){
                                    setMessage(`Video already exits, please discard it before upload.`)
                                    return
                                }
                                setMessage("")
                                const file = target.files[0];
                                let type = file.type.split('/')[0]
                                if(type!=="video"){
                                    setMessage("You can only upload video.")
                                    return
                                }
                                if(file.size>4000 * 1024 * 1024){
                                    setMessage(`${file.name.length>50?file.name.slice(0,51)+"...":file.name} is too large.`)
                                    return
                                }
                                setVideo(file)
                                }
                                
                            }
                        }
                        />
                        <Icon icon="icon-park-solid:video-two" width="34" />
                    </label>

                   
                    
                    <div className=" flex-grow"/>
                    <button disabled={uploadingImage||uploadingVideo} className="hover:bg-violet-400 bg-violet-500 text-white rounded-full font-semibold px-3 py-1 flex-wrap" onClick={handleAdd}>{uploadingImage||uploadingVideo?"Uploading":"Comment!"}</button>
                </div>
            </div>
                
        </div>
        </>
    )

}