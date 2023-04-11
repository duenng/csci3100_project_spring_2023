import {SeacrhIcon, SearchIcon} from "@heroicons/react/outline"
import News from "./News"

function Widgets({newsResults}) {
  return (
    <div className="xl:w-[600px] hidden space-y-5 ml-8 lg:inline"> 
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
        <div className="flex bg-red-300 relative items-center p-3 rounded-full ">
          <SearchIcon className="h-5 z-50 text-gray-500 " />
          <input className="pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 rounded-full inset-0 absolute" 
          type="text" 
          placeholder="Search Tertwit" 
          />
        </div>
      </div>

      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%] ">
        <h2 className="px-4 text-xl font-bold">What's happening</h2>
        {newsResults.map((article)=> (
        <News key={article.title} news={article} />
        ))}
        <button className="text-purple-300 pl-4 pb-3 hover:text-purple-400 ">Show more</button>
      </div>
    </div>
  )
}

export default Widgets