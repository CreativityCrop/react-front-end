import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast  } from 'react-toastify';

import { getToken, removeToken, AuthContext, MAIN_API_URL } from '../AuthAPI';

import CategoryButton  from "./CategoryButton";

export default function Idea(props) {
    return (
        <div className="m-auto xl:flex md:flex mb-5 border-2 p-3 w-[44rem] sm:border-2 sm:w-[21.5rem] bg-white" key={props.title} ref={props.innerRef}>
            <Image {...props} className="sm:w-20 sm:h-20"/>
            <div>
                <div className="flex mb-2">
                    <Title {...props} />    
                    <Likes {...props} />
                </div>
                <ShortDescription {...props} />
                <LongDescription {...props} />
                <CategoriesList {...props} />
                <FileList {...props} />
                <div className="grid grid-cols-2 mt-3 ml-2 sm:ml-0">
                    <Price {...props} />
                    <MainButton {...props} />
                    <PayoutButton {...props} />
                    <InvoiceButton {...props} />
                </div>
            </div>
        </div>
    );
}

function Image(props) {
    return(
        <div 
            className={"bg-slate-300 w-40 h-40 mr-3 " + props.className}
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
        <div className="ml-2 break-words mr-12 sm:ml-[5.8rem] sm:mr-0 sm:-mt-[5.2rem]">
            <h3 className="text-2xl w-[24rem] sm:w-[10.5rem] sm:text-xl">{props.title}</h3>
        </div>
    );
}

function Likes(props) {
    const [authContext, setAuthContext] = useContext(AuthContext);
    const [like, setLike] = useState({});

    if(authContext !=="authenticated" || props.likes === undefined) {
        return(null);
    }

    const likeIdea = (event, id) => {
        event.preventDefault();
        axios
            .put(MAIN_API_URL + `/ideas/like?idea_id=${id}`, {}, {
                headers: {
                    "Token": getToken(),
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then((response) => {
                setLike(response.data);
            })
            .catch((error) => {
                if(error.response.status === 401) {
                    removeToken();
                    setAuthContext("unauthenticated");
                }
                else if (error.response) {
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                }
                else {
                    // anything else
                }        
            });
    };
    return(
        <div className="flex w-fit h-8 object-right-top sm:-mt-[5.2rem] sm:ml-1">
            <button
                className="text-xl"
                type="button"
                onClick={ (e) => likeIdea(e, props.id) }
                disabled={(props.boughtView || props.soldView || authContext !== "authenticated")}
            >
                👍
            </button>
            <h3 className="ml-1 mt-[0.10rem] text-xl sm:mt-1">{ like.count===undefined ? props.likes : like?.count }</h3>
        </div> 
    );
}

function ShortDescription(props) {
    if(props.shortDesc === undefined) {
        return(null);
    }
    return(
        <div id="short-desc" className="ml-2 mb-3 break-words w-[30rem] sm:w-80 sm:ml-0 sm:mr-0">
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
        <div id="long-desc" className="ml-2 mb-3 break-words w-[30rem] sm:w-80 sm:ml-0">
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
        <div className="flex flex-row space-x-2 w-[30rem] ml-2 mb-3 overflow-y-auto sm:ml-0 sm:w-72">
            { props.categories?.map( (category) => <CategoryButton key={category} category={category}/> ) }
        </div>
    );
}

function FileList(props) {
    function getFiles() {
        if(props.files === undefined) {
            return;
        }
        const filesArr = props.files?.map( file => {
            return <File key={file.id} file={file}/>;
        });
        return filesArr;
    };
    return(
        <div className="flex flex-col gap-2 ml-2 mb-3 w-[30rem] sm:w-72">
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
                className="mr-4 flex-none w-10 h-10 sm:mr-0" 
                src={"/assets/icons/" + getIcon(props.file.contentType)} 
                alt={props.file.contentType}
            />
            <p className="mr-4 flex-auto w-64 self-center sm:mr-0 sm:w-44">
                {props.file.name.substring(0, 25) + (props.file.name.length<=25 ? "" : " ...")}
            </p>
            <a className="block bg-amber-300 opacity-60 hover:opacity-100 hover:scale-105 transition px-3 py-2 flex-initial self-center" href={downloadLink(props.file.id)} download>Download</a>
        </div>
    );
}

function Price(props) {
    if(props.price === undefined) {
        return(null);
    }
    return(
        <div className="w-48 h-9 pt-[0.15rem] bg-yankeesblue text-slate-300 sm:w-36">
            <h3 className="text-lg text-center">${props.price}</h3>
        </div>
    );
}

function MainButton(props) {
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
        <Link
            className="mt-1 text-lg text-center w-48 h-8 ml-12 bg-jasmine hover:bg-amber-500 sm:w-36 sm:ml-2 hover:scale-105 hover:shadow-lg transition" 
            to={url}
        >
            {text}
        </Link>
    );
}

function PayoutButton(props) {
    const [, setAuthContext] = useContext(AuthContext);
    const [payoutStatus, setPayoutStatus] = useState(props.payoutStatus);

    const putPayout = () => {
        axios
            .put(MAIN_API_URL + `/account/request-payout?idea_id=${props.id}`, {}, {
                headers: {
                    "Token": getToken(),
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }).then((response) => {
                setPayoutStatus(response.data.status);
                toast.success("Payout requested successfully!");
                
            })
            .catch((error) => {
                if(error.response.status === 401) {
                    removeToken();
                    setAuthContext("unauthenticated");
                }
                else if (error.response) {
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                }
                else {
                    // anything else
                }            
            });
    };

    switch(payoutStatus) {
        case "created":
            return(
                <button
                    type="button"
                    className="text-lg text-center w-48 h-8 ml-12 bg-jasmine hover:bg-amber-500 sm:ml-0 sm:w-40
                    hover:scale-105 hover:shadow-lg transition"
                    onClick={putPayout}
                >
                    Request payout
                </button>
            );

        case "processing":
            return(
                <button
                    type="button"
                    className="text-lg text-center w-48 h-8 ml-12 bg-jasmine hover:bg-amber-500 sm:ml-0 sm:w-40
                    hover:scale-105 hover:shadow-lg transition"
                    disabled
                >
                    Payout in progress
                </button>
            );

        case "completed":
            return(
                <button
                    type="button"
                    className="text-lg text-center w-48 h-8 ml-12 bg-jasmine hover:bg-amber-500  sm:ml-0 sm:w-40
                    hover:scale-105 hover:shadow-lg transition"
                    disabled
                >
                    Payout completed
                </button>
            );

        case "denied":
            return(
                <Link
                    className="text-lg text-center w-48 h-8 ml-12 bg-yankeesblue hover:bg-purple-700 sm:ml-0 sm:w-40
                    hover:scale-105 hover:shadow-lg transition"
                    to='#'
                    onClick={(e) => {
                        window.open("mailto:contact@creativitycrop.tech");
                        e.preventDefault();
                    }}
                >
                    Contact us
                </Link>
            );
        default: return(null);
    }
}

function InvoiceButton(props) {
    if(!(props.soldView || props.boughtView)) {
        return(null);
    }
    return(
        <Link
            className="text-lg text-center w-48 h-8 pt-[0.15rem] ml-auto mr-0 mt-3 col-span-2 bg-maxbluepurple hover:bg-sky-500
            sm:ml-0 sm:w-40 hover:scale-105 hover:shadow-lg transition"
            to={`/invoice/${props.id}`}
        >
            Invoice
        </Link>
        
    );
}