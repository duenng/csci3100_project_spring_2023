export default function SidebarMenuItem({text, Icon, active}) {
  return (
    <div className="hoverEffect space-x-3 justify-center xl:justify-start text-lg text-gray-700 items-center flex">
        <Icon className="h-7" />
        <div className="inline-onlarge">{active? (<span className="font-bold">{text}</span>):(<span>{text}</span>)}</div> 
    </div>
  )
}
