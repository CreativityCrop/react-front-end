import test from '../assets/test.png';

export default function Illustrations(props) {
    return(
        <div className={"bg-slate-300 w-44 h-64 " + props.className}>
            <img alt={props.alt} src={test} />
        </div>
    );
}