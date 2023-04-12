function News({article}) {
  return (
    <a href={article.url} target="_blank" >
        <div className="hover:bg-gray-200 px-4 py-2 transition duration-200 space-x-1 flex items-center justify-between ">
            <div className="space-y-1">
                <h6 className="text-sm font-bold" >{article.title}</h6>
                <p className="textt-xs font-medium text-gray-500" >{article.source.name}</p>
            </div>
            <img className="rounded-lg" width={70} src={article.urlToImage} alt="" />
        </div>
    </a>
  )
}

export default News
//rel="noreferrer" className="flex items-center space-x-4 p-4 hover:bg-gray-200 rounded-xl"