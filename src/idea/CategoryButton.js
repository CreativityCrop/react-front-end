import { useNavigate } from 'react-router-dom';

export default function Filters(props) {
    const navigate = useNavigate();

    const redirect = (event) => {
        event.preventDefault();
        navigate('/marketplace/buy?cat=' + props.category, { replace: false })
    };
    
    window.scrollTo(0, 0);
    
    return(
        <button type="button" className="bg-blue-300 h-8 w-fit p-1 px-3" onClick={(e) => redirect(e)}>
            {props.category}
        </button>
    );
}