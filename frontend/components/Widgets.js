import { SearchIcon} from "@heroicons/react/outline"
import News from "./News"
import { useEffect, useRef, useState } from "react"
import { Icon } from '@iconify/react';

function Widgets({newsResults}) {

  const [showResult,setShowResult] = useState(false)

  const handleClick= (inSearch)=>{
    if(inSearch&&!showResult){
      setShowResult(true)
    }

    if(!inSearch&&showResult){
      setShowResult(false)
    }

  }



  return (
    <>
    <Searchbar show = {showResult} click={handleClick}/>
    
    

    {/* <div className="w-full space-y-5  md:inline py-4 grid justify-items-center" >  */}
      {/* search bar */}
      {/* <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
        <div className="flex bg-red-300 relative items-center p-3 rounded-full ">
          <SearchIcon className="h-5 z-50 text-gray-500 " />
          <input className="pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-purple-100 bg-gray-100 rounded-full inset-0 absolute" 
          type="text" 
          placeholder="Search Tertwit" 
          />
        </div>
      </div> */}

      {/* news bar*/}
      <div onClick={()=>handleClick(false)}>
       <NewsBox newsResults={newsResults}/>
      </div>
      
     
    {/* </div> */}
    </>

    
  )
}

function NewsBox({newsResults}){
  const [articleNum, setArticleNum] = useState(6);

  return(
    <>
      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 mt-3 ml-4 w-[90%] xl:w-[75%] ">
        <h2 className="px-4 text-xl font-bold">What's News</h2>
        {newsResults.slice(0,articleNum).map((article)=> (
        <News key={article.title} article={article} />
        ))}
        <button onClick={()=>setArticleNum(articleNum+3)} className="text-purple-300 pl-4 pb-3 hover:text-purple-400 ">Show more</button>
      </div>
    </>
  )

}

let testUser ={
  userId:1,
  username:"test",
  tag:"@test",
  avatar:null,
  following:[],
  follower:[],
}

function Searchbar({show,click}){
  const [keyword,setKeyword] = useState("")
  const [result,setResult] = useState([])
  const [resultNum, setResultNum] = useState(10)
  let limitedResult = result.slice(0,resultNum)
  const searchRef = useRef()


  useEffect(()=>{
      setResultNum(10)
      if(!keyword){
          setResult([])
          return
      }
      // todo: request search users
      
      // for test
      let list = new Array(keyword.length)
      list.fill(testUser)
      setResult(list)
      //console.log(result)
  },[keyword])


  const addNum=()=>{
    if(resultNum>=result.length){
      return
    }
    setResultNum(prev=>prev+5)
  }


  return(
      <>  
          <div className= "  rounded-sm sticky z-30 top-0 flex justify-center h-12 items-center bg-opacity-75 backdrop-blur-sm bg-violet-400" onClick={()=>click(true)}>
              <Icon icon="ic:outline-search" color="gray" />
              <input ref={searchRef}  placeholder="Search user.." className=" text-gray-100 font-semibold placeholder-gray-200 bg-transparent w-3/5 h-3/5 mx-2" onChange={e=>setKeyword(e.target.value)}></input>
              <Icon icon="ic:round-clear" color="gray" onClick={()=>{
                  setKeyword("")
                  searchRef.current.value=""
              }}/>
          </div>
            
          {
            result.length&&show?
            <div className="z-20 top-14 fixed bg-slate-500 bg-opacity-25 backdrop-blur-sm  justify-center rounded-xl py-2 px-1" style={{right:"9.5%"}} onClick={()=>click(true)}>
                {limitedResult.map((item,i)=>{
                    return <>
                    {/* todo: add link */}
                    <div className="flex items-center hover:bg-slate-100 hover:bg-opacity-25 p-2 cursor-pointer rounded-lg" >
                      <img className="h-4 round-full" src ={`avatar/${item.avatar?item.avatar:"user.png"}`}/>
                      <a className="text-white mx-3">{item.username} </a>
                          <a className="text-gray-500"> {item.tag}</a>
                          </div>
                    </>
                })}
                <div className=" text-gray-500 text-sm hover:bg-slate-100 hover:bg-opacity-25 p-2 cursor-pointer rounded-lg hover:text-white" onClick={addNum}>Show more...</div>
            </div>:null
          }
          
              
              
      </>
     
  )
}

export default Widgets