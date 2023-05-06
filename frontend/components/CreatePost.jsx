import { useRef, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";


export default function CreatePost({user,url, popUp}){
    const [text,setText] = useState("")
    const [images,setImages] = useState([])
    const [video,setVideo] = useState(null)
    const [message,setMessage] = useState("")
    const [uploadingImage,setUploadingI] = useState(false)
    const [uploadingVideo,setUploadingV] = useState(false)
    const [verifyingUrl, setVerifyingUrl] = useState(false)
    const [showLink, setShowLink] = useState(url.length)
    const [editingLink, setEditingLink] = useState(false)
    const [reposting, setReposting] = useState(url)

    const textRef = useRef()
    const linkRef = useRef()
    const router = useRouter()

    const handleShowLink=()=>{
        //toggle the reposting link input
        if(!showLink){
            setShowLink(true)
            setEditingLink(true)
        }
        if(showLink&&editingLink){
            setShowLink(false)
        }
        if(showLink&&!editingLink){
            setEditingLink(true)
            setTimeout(()=>{
                linkRef.current.value=reposting
            },10)
        }
    }

    //verigy whther it is a valid link to repost
    const verifyLink=()=>{
        setVerifyingUrl(true)
        setMessage("")
        let link = linkRef.current.value
        if(link==""){
            setMessage("Please provide your link first.")
            linkRef.current.focus()
            setVerifyingUrl(false)
            return
        }
        let splited = link.split("/")
        // check if empty link or it is not from the website or it is about a valid post
        if(!splited.length|
            splited[splited.length-3]!==window.location.host||
            splited[splited.length-2]!=="post"||
            isNaN(splited[splited.length-1])){
                setMessage("Your link is not a valid link of Tertwit post.")
                console.log(splited)
                setVerifyingUrl(false)
                return
        }
        // todo fetch post data
        //set message if post not exist
        setVerifyingUrl(false)
        setReposting(link)
        setEditingLink(false)
        return
    }

    const removeImage = (target) =>{
        setImages((prev)=>{
            return prev.filter((file)=>target!==file)
        })
    }

    //upload image
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

    //upload video
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

    //add new post
    const handleCreate = async(e) =>{
        console.log(user)
        setMessage("")
        // reject empty body
        if(!text.length){
            setMessage("Text is required.")
            return
        }
        let imageNames = []
        //upload images and get names
        if(images.length){
           imageNames= await handleImage()
           if(!imageNames.length){
            return
           }
            //console.log(images)
        }
        //upload video and get name
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
        let repostingId = null
        //console.log(reposting)
        //get the postId or the reposting link
        if(reposting){
            let splited = reposting.split("/")
            repostingId = Number(splited[splited.length-1])
        }
        let body = {
            userId: user.userId,
            text:content,
            reposting:repostingId,
            date: date,
            images:imageNames,
            video: videoName,
          }
        //fetching backend
        try {
            // console.log(body)
            let {data} = await axios.post(`http://${process.env.NEXT_PUBLIC_DB }/post`,body)
            //console.log(data)
            if(data){
                //redirect to the new post
                window.open(`/post/${data.postId}`,"_self")
            }
          } catch (error) {
            console.log(error)
          }
           
        setText("")
        textRef.current.value=""
        setImages([])
        setVideo(null)
    }
    
    

    return(
        <>
        <div className="flex mx-2 item-center text-base flex-wrap w-[99%] h-full">
            <img className="dark:bg-white h-8 round-full m-4 flex-none" src ={`/avatar/${user.avatar?user.avatar:"user.png"}`}/>
            <div className="flex-grow">
                {/* text body */}
                <textarea ref={textRef} className="dark:bg-gray-500 w-full border-none dark:placeholder:text-white " placeholder="What's happening?" onChange={e=>setText(e.target.value)}/>
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
                {/* reposting */}
                <div className="flex mx-1 ">
                {showLink?editingLink?
                    <div className=" align-middle flex-grow-0 flex m-1 text-sm items-center w-4/6">
                        <input ref={linkRef} className="w-4/6 mr-1 flex-grow" placeholder=" Paste your Tertwit link here"></input>
                        <Icon icon="fluent-mdl2:completed-solid" color="green" onClick={verifyLink}/>
                        </div>:
                     <div className=" align-middle flex-shrink-0 flex m-1 px-3 py-2 bg-violet-400 text-sm font-semibold rounded-md items-center"><a>{reposting}</a>
                      <Icon className="ml-1" onClick={()=>{
                        setEditingLink(true)
                        setTimeout(()=>{
                            linkRef.current.value=reposting
                        },10)
                      }} width="16" icon="material-symbols:edit" />
                      <Icon className="ml-1" onClick={()=>{
                        setReposting("")
                        setShowLink(false)
                      }} width="16" icon="ic:sharp-clear" /></div>
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
                    {/* toggle repost link */}
                    <label className="" onClick={handleShowLink}>
                        <Icon icon="mdi:link-plus" width="34"/>
                    </label>
                    
                    <div className=" flex-grow"/>
                    <button disabled={uploadingImage||uploadingVideo||verifyingUrl} className="hover:bg-violet-400 bg-violet-500 text-white rounded-full font-semibold px-3 py-1 flex-wrap" onClick={handleCreate}>{uploadingImage||uploadingVideo||verifyingUrl?"Wait...":"Post!"}</button>
                </div>
            </div>
                
        </div>
        </>
    )

}