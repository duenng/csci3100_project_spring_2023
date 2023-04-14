function SettingBarItems({text, active}) {
  return (
    <div className="hoverEffect2 sm:pl-3 xl:justify-start text-lg text-gray-700 items-center flex">
        <div className="">{active? (<span className="font-bold ">{text}</span>):(<span>{text}</span>)}</div> 
    </div>
  )
}

export default SettingBarItems