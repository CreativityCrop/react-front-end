import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast  } from 'react-toastify';

import { getToken, removeToken, AuthContext, MAIN_API_URL } from '../AuthAPI';

import CategoryButton  from "./CategoryButton";

export default function Idea(props) {
    return (
        <div className="flex flex-row  w-full m-auto gap-4 border-2 sm:border-2 p-4 bg-white " key={props.title} ref={props.innerRef}>
            <div id="left" className="flex-none sm:hidden overflow-hidden">
                <Image {...props} className="sm:w-20 sm:h-20 sm:hidden object-cover"/>
            </div>
            <div id="right" className="w-full overflow-hidden flex flex-col gap-3 ">
                <div className="flex gap-2 mb-2 justify-between">
                    <Image {...props} className="shrink-0 hidden sm:block sm:w-20 sm:h-20"/>
                    <Title {...props} />    
                    <Likes {...props} />
                </div>
                <ShortDescription {...props} />
                <LongDescription {...props} />
                <CategoriesList {...props} />
                <FileList {...props} />
                <div className="flex flex-row flex-wrap gap-4 justify-between sm:justify-center mt-3">
                    <div>
                        <Price {...props} className="row-span-2"/>
                    </div>
                    <div className="flex flex-col gap-4">
                        <MainButton {...props} />
                        <PayoutButton {...props} />
                        <InvoiceButton {...props} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Image(props) {
    return(
        <div 
            className={"bg-slate-300 w-40 h-40 " + props.className}
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
        <div className={"break-words " + props.className}>
            <h3 className="text-2xl sm:text-xl">{props.title}</h3>
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
        <div className="flex w-fit h-8 object-right-top">
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
            <p className="text-base break-words">
                { props.listView ?
                    props.shortDesc.substring(0, 150) + (props.shortDesc.length<=150 ? "" : " ...") :
                    props.shortDesc }
            </p>

    );
}

function LongDescription(props) {
    if(props.longDesc === undefined) {
        return(null);
    }
    return(
        <div id="long-desc" className="break-words">
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
        <div className="flex flex-nowrap gap-4 overflow-auto pb-2 ">
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
        <div className="flex flex-col gap-2 ">
            {getFiles()}
        </div>
    );
}


function File(props) {
    const downloadLink = (file_id) => MAIN_API_URL + "/files/download?file_id=" + file_id + "&token=" + getToken();

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
        <div className="flex flex-wrap gap-2">
            <img 
                className="flex-none w-10 h-10" 
                src={"/assets/icons/" + getIcon(props.file.contentType)} 
                alt={props.file.contentType}
            />
            <p className="flex-auto self-center">
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
        <div className={"w-48 h-9 sm:w-36 bg-yankeesblue text-slate-300 flex justify-center items-center " + props.className}>
            <h3 className="text-lg text-center ">${props.price}</h3>
        </div>
    );
}

function MainButton(props) {
    const location = useLocation();

    if(props.listView === undefined && props.buyView === undefined) {
        return(null);
    }
    if(location.pathname.endsWith("/checkout")) {
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
            className="text-lg flex items-center justify-center text-center w-48 sm:w-36 py-1
            bg-jasmine hover:bg-amber-500 hover:scale-105 hover:shadow-lg transition" 
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
                    className="text-lg text-center w-48 sm:w-36 py-1 bg-jasmine hover:bg-amber-500
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
                    className="text-lg text-center w-48 sm:w-36 py-1 bg-jasmine hover:bg-amber-500
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
                    className="text-lg text-center w-48 sm:w-36 py-1 bg-jasmine hover:bg-amber-500
                    hover:scale-105 hover:shadow-lg transition"
                    disabled
                >
                    Payout completed
                </button>
            );

        case "denied":
            return(
                <Link
                    className="text-lg text-center w-48 sm:w-36 h-fit bg-yankeesblue
                     hover:bg-purple-700 hover:scale-105 hover:shadow-lg transition"
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
            className="text-lg text-center w-48 py-1 sm:w-36 flex items-center justify-center bg-maxbluepurple hover:bg-sky-500
            hover:scale-105 hover:shadow-lg transition"
            to={`/invoice/${props.id}`}
        >
            Invoice
        </Link>
        
    );
}