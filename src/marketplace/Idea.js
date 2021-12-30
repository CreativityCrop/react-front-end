import { useParams } from "react-router-dom";

export default function Idea() {
    let params = useParams();
    return (
        <div>
            <h1>Idea # {params.ideaID}</h1>
        </div>
    );
}