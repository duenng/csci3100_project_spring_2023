import "./widget.scss"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CommentIcon from '@mui/icons-material/Comment';

const Widget = ({type}) => {
let data;

    switch(type){
        case"user":
            data={
                title:"USERS",
                link:"See all users",
                icon:
                    <PersonOutlineIcon className="icon"/>,
            };
            break;

            case"post":
            data={
                title:"POSTS",
                link:"View all posts",
                icon:
                    <ChatBubbleIcon className="icon"/>,
            };
            break;

            case"comment":
            data={
                title:"COMMENTS",
                link:"View all comments",
                icon:
                    <CommentIcon className="icon"/>,
            };
            break;

            case"balance":
            data={
                title:"BALANCE",
                link:"See details",
                icon:
                    <PersonOutlineIcon className="icon"/>,
            };
            break;


            default:
                break;
            
    }
//counter can be ID ( userid post id from database)
  return (
    <div className="widget">
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter"></span>     
            <span className="link">{data.link}</span>
        </div>
        <div className="right">
            <div className="percentage">
                <KeyboardArrowUpIcon/>
            </div>
            {data.icon}
        </div>
        
      
    </div>
  )
}

export default Widget
