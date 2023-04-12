import { SparklesIcon } from "@heroicons/react/outline"
import SettingBarItem from "./SettingBarItem"

function SettingBar() {
  return (
    <>
    <div className="pt-7 xl:ml-[370px] border-l border-r xl:min-w-[270px] sm:ml-[10%] ml-[px] sm:pl-0 min-w-[15%]">
      {/* <div className="py-2 px-3 flex sticky"> */}
        <h2 className="items-center pl-3 pr- text-lg sm:text-xl font-bold">Setting</h2>
        
        <div className="mt-4 mb-3 xl:items-start">
        <SettingBarItem text="Account" active/>
        <SettingBarItem text="Personal Information" />
        <SettingBarItem text="Privacy" />
        <SettingBarItem text="Notification" />
        <SettingBarItem text="Display"  />
      </div>

      </div>
    </>
  )
}

export default SettingBar

//move to feeds.js
{/* <div className="py-2 px-3 flex sticky"> 
<h2 className="items-center text-lg sm:text-xl font-bold">Setting</h2>
<div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
  <SparklesIcon className="h-5 "/>
</div> */}