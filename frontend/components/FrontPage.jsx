import { useEffect, useRef, useState } from "react"
import PreviewPost from "./PostPreview"
import { Icon } from '@iconify/react';



let testUser ={
    userId:1,
    username:"test",
    tag:"@test",
    avatar:null,
    following:[],
    follower:[],
  }

let testComment = [
    {
        user:testUser,
        replying:"@test",
        text:"The intricacies of language and the human mind are fascinating, as our ability to communicate complex ideas through speech and writing has shaped the course of human history, allowing us to build civilizations, share knowledge and connect with one another across time and space.",
        images:["corgi.jpeg","doll.jpeg"],
        video:"catVideo.mp4",
        like:[1,2,3],
        date: new Date(1681145476102)
    }
  ]
  
  let testPost = {
    postId:1,
    user:testUser,
    text:"here is the testing content.",
    like:[1,3,12,4,9,17],
    reposting:null,
    repost:[1,3,4],
    date: new Date(2023, 3, 10, 13, 0, 20),
    images:["corgi.jpeg","doll.jpeg","golden.png","munchkin.png","persian.png","samoyed.png","shiba.jpeg"],
    video: "catVideo.mp4",
    comment: testComment,
  }

  let testData = new Array(10)
  testData.fill(testPost)

export default function FrontPage(){
    const [posts,setPosts] = useState([])

    useEffect(()=>{
        // shd get pots by userId
        setPosts(testData)
    },[])

    return(
        <>
            <Searchbar/>

            {posts.length?posts.map((post,index)=>{
                return <PreviewPost post={post} user={testUser} key={index}/>
            }):null}


        </>
    )
}

let testResult = ["test","@test"]

function Searchbar(){
    const [keyword,setKeyword] = useState("")
    const [result,setResult] = useState([])
    const [focus,setFocus] = useState(false)
    const searchRef = useRef()

    useEffect(()=>{
        if(!keyword){
            setResult([])
            return
        }
        // todo: request search users
        
        // for test
        let list = new Array(keyword.length)
        list.fill(testResult)
        setResult(list)
        console.log(result)
    },[keyword])

    return(
        <>  
            <div className= " rounded-sm sticky z-30 top-0 flex justify-center h-12 items-center bg-opacity-25 backdrop-blur-sm bg-slate-800">
                <Icon icon="ic:outline-search" color="gray" />
                <input ref={searchRef} placeholder="Search user.." className=" text-gray-100 font-semibold placeholder-gray-200 bg-transparent w-3/5 h-3/5 mx-2" onChange={e=>setKeyword(e.target.value)}></input>
                <Icon icon="ic:round-clear" color="gray" onClick={()=>{
                    setKeyword("")
                    searchRef.current.value=""
                }}/>
            </div>

            <div className="z-20 top-14 left-1/2 fixed bg-slate-500 bg-opacity-30 justify-center">
                {result.map((n,i)=>{
                    return <p>hi</p>
                })}
            </div>
                
                
        </>
       
    )
}