import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { getToken, removeToken, AuthContext, MAIN_API_URL } from '../AuthAPI';

import CategoryButton  from "./CategoryButton";
import FileList from "./FileList";

export default function Idea(props) {
    return (
        <div className="flex flex-row mb-4 border-4 p-3 min-w-[44rem]" key={props.title}>
            <Image imgUrl={props.imgUrl} />
            <div>
                <div className="flex mb-2">
                    <Title title={props.title} />
                    <Likes likes={props.likes} ideaID={props.id} />
                </div>
                <ShortDescription text={props.shortDesc} listView={props.listView} />
                <LongDescription text={props.longDesc} />
                <CategoriesList categories={props.categories} />
                <div className="ml-2 mb-3 w-[30rem]">
                    <FileList files={props.files}/>
                </div>
                <div className="grid grid-cols-2 mt-3 ml-2">
                    <Price price={props.price} />
                    <div className="w-48 h-8">
                        <Button listView={props.listView} buyView={props.buyView} ideaID={props.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Image(props) {
    return(
        <div 
            className="bg-slate-300 w-40 h-40 mr-3 "
            style={
                    { 
                    backgroundImage: `url(${props.imgUrl})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center"
                }
            }
        >
        </div>
    );
}

function Title(props) {
    return(
        <div className="ml-2 break-all mr-12">
            <h3 className="text-2xl w-[24rem]">{props.title}</h3>
        </div>
    );
}

function Likes(props) {
    const [authContext, setAuthContext] = useContext(AuthContext);
    const [likeCount, setLikeCount] = useState(null);

    if(authContext !=="authenticated" && props.likes === undefined) {
        return(null);
    }

    const likeIdea = (event, id) => {
        event.preventDefault();
        axios.put(MAIN_API_URL + "/ideas/like?idea_id=" + id, {}, {
            headers: {
                "Token": getToken(),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(function (response) {
            switch(response.status) {
                case 200: setLikeCount(response.data.likes); break;
                default: break;
            }
        })
        .catch(function (error) {
            console.log(error) 
            switch(error.response.status) {
                case 401:
                    switch(error.response.data.detail.errno) {
                        case 103: 
                            removeToken();
                            setAuthContext("unathenticated");
                        break;
                        default: break;
                    }
                break;
                default: break;
            }
        });
    };
    
    return(
        <div className="flex w-fit h-8 object-right-top">
            <button
                className="text-xl"
                type="button"
                onClick={ (e) => likeIdea(e, props.ideaID) }
            >
                👍
            </button>
            <h3 className="ml-1 mt-[0.10rem] text-xl">{ likeCount===null ? props.likes : likeCount }</h3>
        </div> 
    );
}

function ShortDescription(props) {
    if(props.text === undefined) {
        return(null);
    }
    return(
        <div id="short-desc" className="ml-2 mb-3 w-[30rem]">
            <p className="text-base">
                { props.listView ?
                    props.text.substring(0, 150) + (props.text.length<=150 ? "" : " ...") :
                    props.text }
            </p>
        </div>
    );
}

function LongDescription(props) {
    if(props.text === undefined) {
        return(null);
    }
    return(
        <div id="long-desc" className="ml-2 mb-3 w-[30rem]">
            <p>{props.text}</p>
        </div>
    );
}

function CategoriesList(props) {
    if(props.categories === undefined) {
        return(null);
    }
    return(
        <div className="flex flex-row space-x-3 w-[30rem] ml-2 mb-3 overflow-y-auto">
            { props.categories.map( (category) => <CategoryButton key={category} category={category}/> ) }
        </div>
    );
}

function Price(props) {
    if(props.price === undefined) {
        return(null);
    }
    return(
        <div className="w-48 h-8 bg-red-200">
            <h3 className="text-lg text-center">${props.price}</h3>
        </div>
    );
}

function Button(props) {
    const navigate = useNavigate();

    if(props.listView === undefined && props.buyView === undefined) {
        return(null);
    }
    let url, text
    if(props.listView) {
        url = "/marketplace/buy/" + props.ideaID;
        text = "See More";
    }
    else if(props.buyView) {
        url = "/marketplace/buy/" + props.ideaID + "/checkout";
        text = "Buy Now!";
    }
    return(
        <button 
            className="text-lg text-center w-48 h-8 ml-12 bg-green-200 hover:bg-purple-200" 
            onClick={() => {navigate(url)}}
        >
            {text}
        </button>
    );
}