import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline"

function Input() {
  return (
    <div className="flex pt-4 xl:ml-[370px] border-l border-r xl:min-w-[576px] sm:ml-[10%] max-w-xl ml-[px] flex-grow sm:pl-0 min-w-[15%]">
        <img src="/usericon.jpg" 
        alt="Profile Picture" 
        className="ml-2 mr-1 h-10 w-10 rounded-full " 
        /> {/* xl:mr-2 */}
        <div className="w-full divide-y divide-purple-200 ">{/* hidden xl:inline leading-5 */}
            <div className="">
                <textarea rows={2} className="text-lg tracking-wide min-h-[50px] placeholder-gray-400 w-full focus:ring-0 border-none " placeholder="What's happening?" />
            </div>
        <div className="flex pt-2.5 justify-between items-center">
            <div className="flex ">
                <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-violet-500 hover:bg-violet-200"/>
                <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-violet-500 hover:bg-violet-200"/>
            </div>
            <button className="bg-purple-500 px-5 py-1.5 text-white hover:brightness-95 rounded-full  font-bold shadow-md text-lg hidden xl:inline">Post</button>
            </div>
        </div>
    </div>
  )
}

export default Input

{/* <div className="flex items-center space-x-4 p-4 border-b">
 */}