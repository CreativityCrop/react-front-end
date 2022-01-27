import { useNavigate } from 'react-router-dom'

export default function SmallIdea(props) {
    const navigate = useNavigate();

    return(
        <div className="w-36 min-h-36 bg-slate-200 cursor-pointer" onClick={() => navigate("/marketplace/buy/" + props.id) }>
            <img className = "h-[90%] w-[100%] "src={props.imgUrl} alt="" />
            <div className="w-36 text-center h-full absolute invisible font-medium
                group-hover:visible top-0 hover:bg-slate-200 hover:bg-opacity-60 overflow-hidden">    
                    {props.title}
                </div>
        </div>
    );
}