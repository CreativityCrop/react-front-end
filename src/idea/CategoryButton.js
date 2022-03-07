import { useNavigate } from 'react-router-dom';

// Component for category button that takes its value as a prop
export default function CategoryButton(props) {
    const navigate = useNavigate();

    const redirect = (event) => {
        event.preventDefault();
        navigate('/marketplace/buy?cat=' + props.category, { replace: false })
    };
    
    return(
        <button type="button" className="bg-jasmine opacity-60 hover:opacity-100 transition h-8 w-fit p-1 px-3" onClick={(e) => redirect(e)}>
            {props.category}
        </button>
    );
}