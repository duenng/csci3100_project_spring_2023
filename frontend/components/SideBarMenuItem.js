export default function SideBarMenuItem({text, Icon, active}) {
  return (
    <div className="hoverElement navbar space-x-3">
        <Icon className="h-7 flex-none" />
        <div className="inline-onlarge">{active? (<span className="font-bold">{text}</span>):(<span>{text}</span>)}</div> 
    </div>
  )
}
