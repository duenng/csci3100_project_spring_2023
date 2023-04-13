import { SparklesIcon } from "@heroicons/react/outline";

function Feed() {
  const exampleTweets = [
    {
      id: 1,
      user: {
        name: "John Doe",
        handle: "@johndoe",
        avatar: "https://i.pravatar.cc/100?u=1",
      },
      content: "Hello, this is my first tweet!",
    },
    {
      id: 2,
      user: {
        name: "Jane Doe",
        handle: "@janedoe",
        avatar: "https://i.pravatar.cc/100?u=2",
      },
      content: "Wow, loving this platform!",
    },
  ];

  return (
    <div className="pt-4 xl:ml-[370px] border-l border-r xl:min-w-[576px] sm:ml-[10%] max-w-xl ml-[px] flex-grow sm:pl-0 min-w-[15%]">
      <div className="top-0 z-50 bg-white border-b border-purple-200 flex py-2 px-3 sticky">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        {/* can add a search bar here */}
        <div className="hoverEffect flex items-center justify-center ml-auto pt-0 w-11 h-11">
          <SparklesIcon className="h-5"/>
        </div> 
      </div>
      {/* {exampleTweets.map((tweet) => (
        <div key={tweet.id} className="tweet">
          <img
            src={tweet.user.avatar}
            alt={tweet.user.name}
            width="50"
            height="50"
            className="rounded-full"
          />
          <div>
            <strong>{tweet.user.name}</strong> {tweet.user.handle}
            <p>{tweet.content}</p>
          </div>
        </div>
      ))} */}
    </div>
  );
}

export default Feed;
