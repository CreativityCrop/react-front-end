export default function Illustrations(props) {
    return(
        <div className="bg-slate-300 w-44 h-64">
            <img alt={props.alt} src={props.src} />
        </div>
    );
}