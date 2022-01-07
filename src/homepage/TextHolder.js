export default function TextHolder(props){
    return (
        <div className="p-6">
            <div className="grid grid-cols-6 bg-slate-300 w-36 h-56">
                <p>img</p>
            </div>
            <div className="w-52">
                {props.title}
                {props.desc}
            </div>
        </div>
    );
}