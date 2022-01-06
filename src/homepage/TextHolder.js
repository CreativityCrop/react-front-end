export default function TextHolder(props){
    return (
        <div>
            <div>
                <p>img</p>
            </div>
            <div className="w-52">
                {props.title}
                {props.desc}
            </div>
        </div>
    );
}