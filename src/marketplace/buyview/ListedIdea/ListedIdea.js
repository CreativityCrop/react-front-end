import Filters  from "./Filter";

export default function ListedIdea(){
    return(
        <div>
            <div className="w-20">
            <img src=""/>
            </div>
            <h4>title</h4>
            <p>short description that ppl will understand what it is about</p>
            <Filters/>
            <Filters/>
            <Filters/>
            <h4>price</h4>
            <div className="bg-green-300">
                <p>buy it!!!</p>
            </div>
        </div>
    );
}