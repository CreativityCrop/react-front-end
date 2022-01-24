import { useNavigate } from 'react-router-dom'

export default function SmallIdea(props) {
    const navigate = useNavigate();

    return(
        <div className="w-36 min-h-36 bg-slate-200 cursor-pointer" onClick={() => navigate("/marketplace/buy/" + props.id) }>
            <img className = "h-[90%] w-[100%] "src={props.imgUrl} alt={props.title} />
            <p>{props.title}</p>
        </div>
    );
}