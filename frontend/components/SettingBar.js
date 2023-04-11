import { SparklesIcon } from "@heroicons/react/outline"

function SettingBar() {
  return (
    <>
    <div className="feed xl:ml-[370px] border-l border-r xl:min-w-[270px]">
      <div className="py-2 px-3 flex sticky">
        <h2>Setting</h2>
        <div className="">
          <SparklesIcon className="h-5 "/>
        </div>
      </div>
    </div>
    </>
  )
}

export default SettingBar