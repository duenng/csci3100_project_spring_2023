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
    <div className="feed">
      <h2>Feed</h2>
      {exampleTweets.map((tweet) => (
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
      ))}
    </div>
  );
}

export default Feed;
