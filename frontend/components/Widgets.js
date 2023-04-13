import {SeacrhIcon, SearchIcon} from "@heroicons/react/outline"
import News from "./News"
import { useState } from "react";

function Widgets({newsResults}) {
  const [articleNum, setArticleNum] = useState(3);
  return (
    <div className="w-[200px] sm:block md:w-[400px] hidden space-y-5 lg:ml-8 ml-4 md:inline py-4"> 
      {/* search bar */}
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
        <div className="flex bg-red-300 relative items-center p-3 rounded-full ">
          <SearchIcon className="h-5 z-50 text-gray-500 " />
          <input className="pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-purple-100 bg-gray-100 rounded-full inset-0 absolute" 
          type="text" 
          placeholder="Search Tertwit" 
          />
        </div>
      </div>

      {/* news bar*/}
      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%] ">
        <h2 className="px-4 text-xl font-bold">What's News</h2>
        {newsResults.slice(0,articleNum).map((article)=> (
        <News key={article.title} article={article} />
        ))}
        <button onClick={()=>setArticleNum(articleNum+3)} className="text-purple-300 pl-4 pb-3 hover:text-purple-400 ">Show more</button>
      </div>
    </div>
  )
}

export default Widgets