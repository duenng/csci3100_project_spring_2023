import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline"

function Input() {
  return (
    <div className="flex items-center space-x-4 p-4 border-b">
        <img src="/usericon.jpg" 
        alt="Profile Picture" 
        className="h-10 w-10 rounded-full xl:mr-2"
        />
        <div className="w-full  ">{/* hidden xl:inline leading-5 */}
            <h1 className="font-bold">Username</h1>
                <textarea rows={2} className="w-full rounded-full px-4 py-2 outline-none resize-none" placeholder="What's happening?" />
        </div>
        <div className="">
            <div className="">
                <PhotographIcon className="h-9 w-9"/>
                <EmojiHappyIcon className="h-9 w-9"/>
            </div>
            <button className="bg-purple-500 text-white hover:brightness-95 rounded-full w-56 h-12 font-bold shadow-md text-lg hidden xl:inline">Post</button>
        </div>
    </div>
  )
}

export default Input