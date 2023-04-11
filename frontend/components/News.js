function News({article}) {
  return (
    <a href={article.url} target="_blank" >
        <div className="">
            <div className="">
                <h6>{article.title}</h6>
            </div>
        </div>
    </a>
  )
}

export default News
//rel="noreferrer" className="flex items-center space-x-4 p-4 hover:bg-gray-200 rounded-xl"