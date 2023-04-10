function Trending() {
  const exampleTrends = [
    { id: 1, name: "Trend 1", tweets: "10.2K Tweets" },
    { id: 2, name: "Trend 2", tweets: "15.3K Tweets" },
    { id: 3, name: "Trend 3", tweets: "5.1K Tweets" },
  ];

  return (
    <div className="trending">
      <h2>Trending</h2>
      {exampleTrends.map((trend) => (
        <div key={trend.id} className="trend">
          <p>
            <strong>{trend.name}</strong> - {trend.tweets}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Trending;
