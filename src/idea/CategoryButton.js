import { useNavigate } from 'react-router-dom';

export default function Filters(props) {
    const navigate = useNavigate();

    const redirect = (event) => {
        event.preventDefault();
        navigate('/marketplace/buy?cat=' + props.category, { replace: false })
    };
    
    return(
        <button type="button" className="bg-green-300 h-8 w-fit" onClick={(e) => redirect(e)}>
            {props.category}
        </button>
    );
}