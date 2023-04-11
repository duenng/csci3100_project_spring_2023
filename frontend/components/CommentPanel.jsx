import { useRef, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";


export default function CommentPanel(props){
    const [text,setText] = useState("")
    const [images,setImages] = useState([])
    const [video,setVideo] = useState()
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
        //need change to current user info
        let newComment={
            userID: 123,
            name: "testnew",
            tag:"@new",
            avatar:null,
            replying:props.tag,
            text:text,
            image:imageNames,
            video:"",
            like:[],
            date:Number(new Date())
        }
        if(props.inPost){
            props.handler(newComment)
            // console.log(1,newComment)
        }
        setText("")
        textRef.current.value=""
        setImages([])
        //todo: fetch
    }
    
    

    return(
        <>
        <div className="flex item-center mx-2 text-base flex-wrap">
            <img className="h-8 round-full m-4 flex-none" src ={`avatar/${user?.avatar?user.avatar:"user.png"}`}/>
            <div className="flex-grow">
                <p className="m-1  text-gray-500">Reply {props.tag}</p>
                <textarea ref={textRef} className=" w-full" placeholder="Comments here..." onChange={e=>setText(e.target.value)}/>
                <div className="flex mx-1 flex-wrap">
                    {images.length?
                        images.map((file,index)=>{
                            let name = file.name
                            if( name.length>10){
                                name = name.slice(0,10)+"..."
                            }
                            return <div className="  flex-shrink-0 flex m-1 px-3 py-2 bg-sky-300 text-sm font-semibold rounded-md "><a>{name}</a> <Icon onClick={()=>removeImage(file)} width="16" icon="material-symbols:scan-delete" /></div>
                        })
                    :null}
                </div>
                <p className="w-full text-red-600 font-semibold text-sm">{message?message:null}</p>
                <div className="flex m-2 flex-warp">
                    <div className="flex-grow flex-warp">
                    <label>
                        <input type="file" hidden multiple="multiple"
                        onChange={({ target }) => {
                            if (target.files) {
                                setMessage("")
                                const uploadedFiles = target.files;
                                const newFiles = Array.from(uploadedFiles);
                                newFiles.forEach(file=>{
                                    let type = file.type.split('/')[0]
                                    if(type!=="image"){
                                       setMessage("You can only upload images.")
                                       return
                                    }
                                })
                                setImages((prev) => {
                                    return [...prev, ...newFiles]});
                                }
                            }
                        }
                        />
                        <Icon icon="mdi:picture-360" width="34"/>
                    </label>
                    </div>
                    <button disabled={uploadingImage||uploadingVideo} className="bg-violet-500 text-white rounded-full font-semibold px-3 py-1 flex-wrap" onClick={handleAdd}>{uploadingImage||uploadingVideo?"Uploading":"Comment!"}</button>
                </div>
            </div>
                
        </div>
        </>
    )

}