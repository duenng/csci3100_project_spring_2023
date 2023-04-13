import { SearchIcon} from "@heroicons/react/outline"
import News from "./News"
import { useEffect, useRef, useState } from "react"
import { Icon } from '@iconify/react';

function Widgets({newsResults}) {
  return (
    <>
    <Searchbar/>

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
      <NewsBox newsResults={newsResults}/>
     
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

          <div className="z-20 top-14 fixed bg-slate-500 bg-opacity-30 justify-center" style={{right:"12.5%"}}>
              {result.map((n,i)=>{
                  return <p>hi</p>
              })}
          </div>
              
              
      </>
     
  )
}

export default Widgets