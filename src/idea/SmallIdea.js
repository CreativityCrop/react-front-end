import { useNavigate } from 'react-router-dom'

export default function SmallIdea(props) {
    const navigate = useNavigate();

    return(
        <div className="flex-none xl:flex-initial relative group w-36 mb-4 aspect-square bg-slate-200 cursor-pointer sm:w-28
        hover:scale-110 hover:shadow-lg transition delay-75" onClick={() => navigate("/marketplace/buy/" + props.id) }>
            <img className = "h-[100%] w-[100%] "src={props.imgUrl} alt="" />
            <div className="w-full h-full text-center absolute invisible font-medium
                group-hover:visible top-0 hover:bg-slate-200 hover:bg-opacity-60 overflow-hidden ">    
                    {props.title}
            </div>
        </div>
    );
}