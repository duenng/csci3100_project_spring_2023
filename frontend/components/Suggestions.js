function Suggestions() {
  const exampleSuggestions = [
    { id: 1, name: "User 1", handle: "@user1", avatar: "https://i.pravatar.cc/100?u=3" },
    { id: 2, name: "User 2", handle: "@user2", avatar: "https://i.pravatar.cc/100?u=4" },
    { id: 3, name: "User 3", handle: "@user3", avatar: "https://i.pravatar.cc/100?u=5" },
  ];

  return (
    <div className="suggestions">
      <h2>Suggestions</h2>
      {exampleSuggestions.map((suggestion) => (
        <div key={suggestion.id} className="suggestion">
          <img
            src={suggestion.avatar}
            alt={suggestion.name}
            width="50"
            height="50"
            className="rounded-full"
          />
          <div>
            <strong>{suggestion.name}</strong> {suggestion.handle}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;