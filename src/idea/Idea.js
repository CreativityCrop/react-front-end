import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { getToken, removeToken, AuthContext, MAIN_API_URL } from '../AuthAPI';

import CategoryButton  from "./CategoryButton";

export default function Idea(props) {
    return (
        <div className="flex flex-row mb-4 border-4 p-3 min-w-[44rem]" key={props.title} ref={props.innerRef}>
            <Image {...props} />
            <div>
                <div className="flex mb-2">
                    <Title {...props} />
                    <Likes {...props} />
                </div>
                <ShortDescription {...props} />
                <LongDescription {...props} />
                <CategoriesList {...props} />
                <FileList {...props} />
                <div className="grid grid-cols-2 mt-3 ml-2">
                    <Price {...props} />
                    <Button 
                        className="w-48 h-8" 
                        {...props}
                    />
                    <PayoutButton {...props} />
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

    if(authContext !=="authenticated" || props.likes === undefined) {
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
            // console.log(response.data.is_liked);
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
                            setAuthContext("unauthenticated");
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
                onClick={ (e) => likeIdea(e, props.id) }
                disabled={(props.boughtView || props.soldView || authContext !== "authenticated")}
            >
                👍
            </button>
            <h3 className="ml-1 mt-[0.10rem] text-xl">{ likeCount===null ? props.likes : likeCount }</h3>
        </div> 
    );
}

function ShortDescription(props) {
    if(props.shortDesc === undefined) {
        return(null);
    }
    return(
        <div id="short-desc" className="ml-2 mb-3 break-words w-[30rem]">
            <p className="text-base">
                { props.listView ?
                    props.shortDesc.substring(0, 150) + (props.shortDesc.length<=150 ? "" : " ...") :
                    props.shortDesc }
            </p>
        </div>
    );
}

function LongDescription(props) {
    if(props.longDesc === undefined) {
        return(null);
    }
    return(
        <div id="long-desc" className="ml-2 mb-3 break-words w-[30rem]">
            <p>
                { props.listView ?
                        props.longDesc.substring(0, 150) + (props.longDesc.length<=150 ? "" : " ...") :
                        props.longDesc }
            </p>
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

function FileList(props) {
    function getFiles() {
        if(props.files === undefined) {
            return;
        }
        const filesArr = props.files.map( file => {
            return <File key={file.id} file={file}/>;
        });
        return filesArr;
    };
    return(
        <div className="ml-2 mb-3 w-[30rem]">
            {getFiles()}
        </div>
    );
}

const downloadLink = (file_id) => MAIN_API_URL + "/files/download?file_id=" + file_id + "&token=" + getToken();

function File(props) {
    const getIcon = (contentType) => {
        switch(contentType) {
            case "image/svg+xml":
            case "image/jpeg":
            case "image/png":
                return "image.svg";
            case "audio/mpeg":
                return "audio.svg";
            case "video/mp4":
            case "video/mpeg":
                return "video.svg";
            case "text/plain":
            case "text/csv":
            case "application/json":
            case "application/xml":
                return "text.svg";
            case "application/pdf":
                return "pdf.svg";
            case "application/msword":
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return "word.svg";
            case "application/vnd.ms-powerpoint":
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                return "powerpoint.svg";
            case "application/vnd.ms-excel":
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                return "excel.svg";
            case "application/vnd.rar":
            case "application/zip":
                return "archive.svg"
            default: return "text.svg"
        }
    }
    return(
        <div className="flex">
            <img 
                className="mr-4 flex-none w-10 h-10" 
                src={"/assets/icons/" + getIcon(props.file.content_type)} 
                alt={props.file.content_type}
            />
            <p className="mr-4 flex-auto w-64 self-center">
                {props.file.name.substring(0, 25) + (props.file.name.length<=25 ? "" : " ...")}
            </p>
            <a className="flex-initial self-center" href={downloadLink(props.file.id)} download>Download</a>
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
        if(props.boughtView) {
            url = "/idea/" + props.id;
        }
        else if(props.soldView) {
            return(null);
        }
        else {
            url = "/marketplace/buy/" + props.id;
        }
        text = "See More";
    }
    else if(props.buyView) {
        url = "/marketplace/buy/" + props.id + "/checkout";
        text = "Buy Now!";
    }

    return(
        <button
            type="button"
            className="text-lg text-center w-48 h-8 ml-12 bg-green-200 hover:bg-purple-200" 
            onClick={() => {navigate(url)}}
        >
            {text}
        </button>
    );
}

function PayoutButton(props) {
    if(props.payoutStatus === undefined) {
        return(null);
    }
    switch(props.payoutStatus) {
        case "created":
            return(
                <button
                    type="button"
                    className="text-lg text-center w-48 h-8 ml-12 bg-orange-200 hover:bg-purple-200"
                >
                    Request payout
                </button>
            );

        case "processing":
            return(
                <button
                    type="button"
                    className="text-lg text-center w-48 h-8 ml-12 bg-yellow-200 hover:bg-purple-200"
                    disabled
                >
                    Payout in progress
                </button>
            );

        case "completed":
            return(
                <button
                    type="button"
                    className="text-lg text-center w-48 h-8 ml-12 bg-green-500 hover:bg-purple-200"
                    disabled
                >
                    Payout completed
                </button>
            );

        case "denied":
            return(
                <button
                    type="button"
                    className="text-lg text-center w-48 h-8 ml-12 bg-red-400 hover:bg-red-700"
                >
                    Contact us
                </button>
            );
        default: return(null);
    }
}