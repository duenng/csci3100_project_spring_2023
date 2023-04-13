export default function SidebarMenuItem({ text, Icon, active, onClick }) {
  return (
    <div
      className="hoverEffect space-x-3 justify-center xl:justify-start text-lg text-gray-700 items-center flex"
      onClick={onClick} // Add the onClick prop here
    >
      <Icon className="h-7" />
      <div className="inline-onlarge">
        {active ? (
          <span className="font-bold">{text}</span>
        ) : (
          <span>{text}</span>
        )}
      </div>
    </div>
  );
}
