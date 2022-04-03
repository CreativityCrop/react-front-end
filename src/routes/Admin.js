/*                    Warning                    */
/*           This is work in progress            */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import axios from "axios";
import { sha3_256 } from 'js-sha3';

import AuthProvider, { getToken, MAIN_API_URL } from "../AuthAPI";

const URL = `//creativitycrop.tech/api/admin/log?token=${getToken()}`;

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "30rem",
        borderRadius: "000px",
        fontFamily: "White Rabbit Regular"
    },
};

export default function Admin() {
    // const location = useLocation();

    return (
        <div className="mt-5 mb-20 flex flex-col gap-6">
            <AuthProvider />
            <Payouts />
            <Users />
            <Ideas />
            <Logs/>
        </div>
    );
}

// Function that converts date to us format
const convertDate = (date) => {
    const date_obj = new Date(date);
    const day = date_obj.getDate();
    const month = date_obj.getMonth() + 1;
    const year = date_obj.getFullYear();
    const hours = date_obj.getHours();
    const minutes = date_obj.getMinutes();
    const seconds = date_obj.getSeconds();
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

const downloadFile = (res, filename) => {
    const file = new Blob([res.data], {type: 'text/csv'});
    const fileURL = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = fileURL;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(fileURL);
}

function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    
    const [modalPasswordUpdate, setModalPasswordUpdate] = useState(false);
    const [passwordUpdateData, setPasswordUpdateData] = useState({userID: null, password: null});
    
    const [modalUserDelete, setModalUserDelete] = useState(false);
    const [userDeleteData, setUserDeleteData] = useState({userID: null});
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        setRefresh(prevRefresh => prevRefresh + 1);
    }, []);

    useEffect(() => {
        if(refresh === 0) return;
        axios
            .get(MAIN_API_URL + "/admin/users", {
                headers: {
                    "Allow-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Token": getToken()
                }
            })
            .then(res => {
                setUsers(res.data.users);
            })
            .catch((error) => {
                if (error.response) {
                    if(error.response.data.detail.errno === 601) {
                        navigate("/");
                        toast.info("You are not allowed to access this resource!");
                        return;
                    }
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                    toast.error("Network error! Please check your connection.");
                }
                else {
                    toast.error("Unknown error! Please try again.");
                }
            });
    }, [refresh, navigate]);

    const deleteUser = (id) => {
        axios
            .delete(MAIN_API_URL + `/admin/users/${id}`, {
                headers: {
                    "Allow-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Token": getToken()
                }
            })
            .then( () => {
                setModalUserDelete(false);
                toast.success("User deleted!");
                setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                    toast.error("Network error! Please check your connection.");
                }
                else {
                    toast.error("Unknown error! Please try again.");
                }
            });
    }

    const updateUserPassword = () => {
        axios
            .put(MAIN_API_URL + `/admin/users/${passwordUpdateData.userID}/password`, {
                pass_hash: sha3_256(passwordUpdateData.password)
            }, {
                headers: {
                    "Allow-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Token": getToken()
                }
            })
            .then( () => {
                setModalPasswordUpdate(false);
                toast.success("Password updated!");
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                    toast.error("Network error! Please check your connection.");
                }
                else {
                    toast.error("Unknown error! Please try again.");
                }
            });
    }

    const verifyUser = (id) => {
        axios
            .put(MAIN_API_URL + `/admin/users/${id}/activate`, {}, {
                headers: {
                    "Allow-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Token": getToken()
                }
            })
            .then( () => {
                toast.success("User status set to verified!");
                setUsers((prevUsers) => prevUsers.map(user => {
                    if (user.id === id) {
                        user.verified = true;
                    }
                    return user;
                }));
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                    toast.error("Network error! Please check your connection.");
                }
                else {
                    toast.error("Unknown error! Please try again.");
                }
            });
    }
    const disableUser = (id) => {
        axios
            .put(MAIN_API_URL + `/admin/users/${id}/deactivate`, {}, {
                headers: {
                    "Allow-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Token": getToken()
                }
            })
            .then( () => {
                toast.success("User status set to unverified!");
                setUsers((prevUsers) => prevUsers.map(user => {
                    if (user.id === id) {
                        user.verified = false;
                    }
                    return user;
                }));
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                    toast.error("Network error! Please check your connection.");
                }
                else {
                    toast.error("Unknown error! Please try again.");
                }
            });
    }

    const exportUsers = () => {
        axios
            .get(MAIN_API_URL + "/admin/users/export", {
                headers: {
                    "Allow-Control-Allow-Origin": "*",
                    "Content-Type": "text/csv",
                    "Token": getToken()
                }
            }).then(res => {
                downloadFile(res, "users.csv");
            }).catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                    toast.error("Network error! Please check your connection.");
                }
                else {
                    toast.error("Unknown error! Please try again.");
                }
            });
    }

    const users_rows = users?.map(user => {
        return (
            <tr key={user.id}>
                <td><img className="h-14 w-14  object-cover select-none pointer-events-none" src={user?.avatarURL} alt="" /></td>
                <td className="text-center">{user.id}</td>
                <td className="text-center">{user.verified ? "✔️" : "❌ "}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td className="break-all">{user.username}</td>
                <td>{user.email}</td>
                <td className="break-all">{user.iban}</td>
                <td className="text-center">{convertDate(user.dateRegister)}</td>
                <td className="text-center">{convertDate(user.dateLogin)}</td>
                <td className="text-center w-16">
                    <div className="flex flex-wrap">
                        <button className="select-none" title="Delete user" onClick={() => {
                            setUserDeleteData({userID: user.id});
                            setModalUserDelete(true);
                        }}>🗑️</button>                
                        <button className="select-none" title="Change password" onClick={() => {
                            setPasswordUpdateData(prevData => {
                                return {userID: prevData.userID=user.id, password: prevData.password};
                            });
                            setModalPasswordUpdate(true);
                        }}>🔏</button>
                        <button className="select-none" title="Verify user" onClick={() => {
                            verifyUser(user.id);
                        }}>✔️</button>
                        <button className="select-none" title="Disable user" onClick={() => {
                            disableUser(user.id);
                        }}>❌</button>
                    </div>
                </td>
            </tr>
        )
    })

    return (
        <div id="users">
            <h1 className="mb-4 text-black text-left text-3xl select-none">Users <button title="Refresh" onClick={() => setRefresh(prevRefresh => prevRefresh + 1)}>🔄</button></h1>
            <div className="overflow-x-auto">
                <table className="">
                    <thead className="text-center">
                        <tr>
                            <th title="Avatar" className="w-14">📷</th>
                            <th>ID</th>
                            <th>Verified</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>IBAN</th>
                            <th>Register</th>
                            <th>Last Login</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users_rows}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={modalPasswordUpdate}
                style={modalStyle}
                onAfterClose={() => setPasswordUpdateData({userID: null, password: null})}
                appElement={document.getElementById('root')}
            >
                
                <div className="">
                    <button className="float-right mb-10 select-none" onClick={() => {setModalPasswordUpdate(false);}}>❌</button>
                    <h1 className="mb-5">Changing password for user {passwordUpdateData.userID}</h1>
                    <form className="flex flex-col gap-6 mx-20">
                        <input
                            type="password"
                            onChange={
                                (e) => setPasswordUpdateData(prevData => {
                                        return {userID: prevData.userID, password: e.target.value}
                                    })
                        }></input>
                        <button type="button" onClick={() => updateUserPassword()}>Submit</button>
                    </form>
                </div>
            </Modal>
            <Modal
                isOpen={modalUserDelete}
                style={modalStyle}
                onAfterClose={() => setUserDeleteData({userID: null})}
                appElement={document.getElementById('root')}
            >
                
                <div className="">
                    <button className="float-right mb-10 select-none" onClick={() => setModalUserDelete(false)}>❌</button>
                    <h1 className="mb-5">Changing password for user {userDeleteData.userID}</h1>
                    <h2>Are you sure you want to delete this user?</h2>
                    <button type="button" onClick={() => deleteUser(userDeleteData.userID)}>Submit</button>
                </div>
            </Modal>
            <button
                onClick={() => exportUsers()}
                className="mt-6 flex flex-row items-center px-4 py-1 bg-amber-300 select-none">
                    <img className="h-4" src="/assets/icons/text.svg" alt="icon"/>Export
            </button>
        </div>
    );
}

function Ideas() {
    const [ideas, setIdeas] = useState([]);
    const [modalDeleteIdea, setModalDeleteIdea] = useState(false);
    const [deleteIdeaData, setDeleteIdeaData] = useState({ideaID: null});
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        setRefresh(prevRefresh => prevRefresh + 1);
    }, []);

    useEffect(() => {
        if(refresh === 0) return;
        axios
            .get(MAIN_API_URL + "/admin/ideas", {
                headers: {
                    "Allow-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Token": getToken()
                }
            })
            .then(res => {
                setIdeas(res.data.ideas);
            })
            .catch((error) => {
                if (error.response) {
                    if(error.response.data.detail.errno === 601) {
                        return;
                    }
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                    toast.error("Network error! Please check your connection.");
                }
                else {
                    toast.error("Unknown error! Please try again.");
                }
            });
    }, [refresh]);

    const deleteIdea = (id) => {
        axios
            .delete(MAIN_API_URL + `/admin/ideas/${id}`, {
                headers: {
                    "Allow-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Token": getToken()
                }
            })
            .then( () => {
                setModalDeleteIdea(false);
                toast.success("Idea deleted!");
                setIdeas((prevIdeas) => prevIdeas.filter(idea => idea.id !== id));
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                    toast.error("Network error! Please check your connection.");
                }
                else {
                    toast.error("Unknown error! Please try again.");
                }
            });
    }

    const ideas_rows = ideas?.map(idea => {
        return (
            <tr key={idea.id}>
                <td>
                    <Link to={`/marketplace/buy/${idea.id}`} target="_blank">
                    <img
                        title={idea.id}
                        className="h-14 aspect-square object-cover select-none pointer-events-none"
                        src={idea?.imageURL}
                        alt="" />
                    </Link>
                </td>
                {/* <td>{idea.id}</td> */}
                <td className="text-center">{idea.sellerID}</td>
                <td className="text-center">{idea.buyerID}</td>
                <td className="break-all">{idea.title}</td>
                <td className="break-all">{idea.shortDesc}</td>
                <td className="text-center">{convertDate(idea.datePublish)}</td>
                <td className="text-center">{convertDate(idea.dateExpiry)}</td>
                <td className="text-center">{convertDate(idea.dateBought)}</td>
                <td className="text-center">{idea.price}</td>
                <td className="text-center">{idea.likes}</td>
                {/* <td>{idea.categories}</td> */}
                <td>
                    <button className="select-none" title="Delete idea" onClick={
                        () => {
                            setDeleteIdeaData({ideaID: idea.id});
                            setModalDeleteIdea(true);
                        }
                    }>🗑️</button>
                </td>
            </tr>
        )
    })

    return (
        <div id="ideas">
            <h1 className="mb-4 text-black text-left text-3xl select-none">Ideas <button title="Refresh" onClick={() => setRefresh(prevRefresh => prevRefresh + 1)}>🔄</button></h1>
            
            <div className="overflow-x-auto">
                <table  className="">
                    <thead className="text-center select-none">
                        <tr>
                            <th>Image</th>
                            <th title="Seller ID">👨‍🌾</th>
                            <th title="Buyer ID">👩‍💼</th>
                            <th>Title</th>
                            <th>Short Desc</th>
                            <th>Published</th>
                            <th>Expires</th>
                            <th>Bought</th>
                            <th>$</th>
                            <th title="Likes">👍</th>
                            {/* <th title="Categories">📃</th> */}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ideas_rows}
                    </tbody>
                </table>
            </div>
            <Modal
                closeTimeoutMS={200}
                isOpen={modalDeleteIdea}
                style={modalStyle}
                onAfterClose={() => setDeleteIdeaData({ideaID: null})}
                appElement={document.getElementById('root')}
            >    
                <div className="">
                    <button className="float-right mb-10 select-none" onClick={() => setModalDeleteIdea(false)}>❌</button>
                    <h1 className="mb-5 break-all">
                        Deleting idea <Link to={"/marketplace/buy/" + deleteIdeaData.ideaID} target="_blank">
                            {deleteIdeaData.ideaID}
                        </Link>
                    </h1>
                    <h2>Are you sure you want to delete the idea?</h2>
                    <button type="button" onClick={() => deleteIdea(deleteIdeaData.ideaID)}>Confirm</button>
                </div>
            </Modal>
        </div>
    );
}

function Payouts() {
    const [payouts, setPayouts] = useState([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        setRefresh(prevRefresh => prevRefresh + 1);
    }, []);

    useEffect(() => {
        if(refresh === 0) return;
        axios
            .get(MAIN_API_URL + "/admin/payouts", {
                headers: {
                    "Allow-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Token": getToken()
                }
            })
            .then(res => {
                setPayouts(res.data.payouts);
            })
            .catch((error) => {
                if (error.response) {
                    if(error.response.data.detail.errno === 601) {
                        return;
                    }
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                    toast.error("Network error! Please check your connection.");
                }
                else {
                    toast.error("Unknown error! Please try again.");
                }
            });
    }, [refresh]);

    const completePayout = (id) => {
        axios
            .put(MAIN_API_URL + `/admin/payouts/${id}/completed`, {}, {
                headers: {
                    "Allow-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Token": getToken()
                }
            })
            .then( () => {
                setPayouts((prevPayouts) => prevPayouts.map(payout => {
                    if(payout.ideaID === id) {
                        payout.status = "completed";
                    }
                    return payout;
                }));
                toast.success("Payout status changed to completed.")
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                    toast.error("Network error! Please check your connection.");
                }
                else {
                    toast.error("Unknown error! Please try again.");
                }
            });
    }
    const denyPayout = (id) => {
        axios
            .put(MAIN_API_URL + `/admin/payouts/${id}/denied`, {}, {
                headers: {
                    "Allow-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Token": getToken()
                }
            })
            .then( () => {
                setPayouts((prevPayouts) => prevPayouts.map(payout => {
                    if(payout.ideaID === id) {
                        payout.status = "denied";
                    }
                    return payout;
                }));
                toast.success("Payout status changed to denied.")
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                    toast.error("Network error! Please check your connection.");
                }
                else {
                    toast.error("Unknown error! Please try again.");
                }
            });
    }

    const exportPayouts = () => {
        axios
            .get(MAIN_API_URL + "/admin/payouts/export", {
                headers: {
                    "Allow-Control-Allow-Origin": "*",
                    "Content-Type": "text/csv",
                    "Token": getToken()
                }
            }).then(res => {
                downloadFile(res, "payouts.csv");
            }).catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                    toast.error("Network error! Please check your connection.");
                }
                else {
                    toast.error("Unknown error! Please try again.");
                }
            });
    }

    const payouts_rows = payouts?.map(payout => {
        return (
            <tr key={payout.ideaID}>
                <td className="text-center">{payout.userID}</td>
                <td className="text-center">{payout.userFirstName}</td>
                <td className="text-center">{payout.userLastName}</td>
                <td className="break-all">{payout.ideaID}</td>
                <td className="break-all">{convertDate(payout.date)}</td>
                <td className="text-center">{convertDate(payout.datePaid)}</td>
                <td className="text-center">{payout.status}</td>
                <td className="text-center">{payout.amount / 100.0}</td>
                <td className="text-center">{payout.iban}</td>
                <td><button className="select-none" title="Mark payout as completed" onClick={() => completePayout(payout.ideaID)}>✅</button></td>
                <td><button className="select-none" title="Mark payout as denied" onClick={() => denyPayout(payout.ideaID)}>❎</button></td>
            </tr>
        )
    })

    return (
        <div id="payouts">
            <h1 className="mb-4 text-black text-left text-3xl select-none">Payouts <button title="Refresh" onClick={() => setRefresh(prevRefresh => prevRefresh + 1)}>🔄</button></h1>
            <div className="overflow-x-auto">
                <table className="">
                    <thead className="text-center select-none">
                        <tr>
                            <th>ID</th>
                            <th title="User's First Name">👤FN</th>
                            <th title="User's Last Name">👤LN</th>
                            <th>Idea ID</th>
                            <th title="Date of transcation">📢</th>
                            <th title="Date of payout">💸</th>
                            <th>Status</th>
                            <th title="Amount">$</th>
                            <th>IBAN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {payouts_rows}
                    </tbody>
                </table>
            </div>
            <button
                onClick={() => exportPayouts()}
                className="mt-6 flex flex-row items-center px-4 py-1 bg-amber-300 select-none">
                    <img className="h-4" src="/assets/icons/text.svg" alt="icon"/>Export
            </button>
        </div>
    );
}

function Logs() {
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);
    const [status, setStatus] = useState();

    useEffect(() => {
        switch(ws?.readyState) {
            case 0: setStatus("CONNECTING"); break;
            case 1: setStatus("CONNECTED 💔"); break;
            case 2: setStatus("DISCONNECTING"); break;
            default:
            case 3: setStatus("DISCONNECTED 🔗"); break;
            
        }
        if(ws !== null) {
            ws.onopen = () => {
                console.log('WebSocket Connected');
            }

            ws.onmessage = (e) => {
                const message = e.data + "\n";
                setMessages((prevMessages) => [message, ...prevMessages]);
            }

            ws.onclose = () => {
                console.log('WebSocket Disconnected');
                switch(ws?.readyState) {
                    case 0: setStatus("CONNECTING"); break;
                    case 1: setStatus("CONNECTED 💔"); break;
                    case 2: setStatus("DISCONNECTING"); break;
                    default:
                    case 3: setStatus("DISCONNECTED 🔗"); break;
                    
                }
            }
            
        }
    }, [ws]);

    const toggleConnection = () => {
        switch(ws?.readyState) {
            // case 0: message = "CONNECTING"; break;
            // OPEN
            case 1:
                ws.close();
                return;
            // case 2: message = "CLOSING"; break;
            // CLOSED
            default:
            case 3:
                switch(window.location.protocol) {
                    case "https:": setWs(new WebSocket("wss:" + URL)); break;
                    default: setWs(new WebSocket("ws:" + URL)); break;
                }
                break;
            // default: "UNKNOWN"; break;
        }
    }

    return(
        <div id="log" className="flex flex-col">
            <h1 className="mb-4 text-black text-center text-3xl select-none">FastAPI uvicorn log</h1>
            <button className="select-none" onClick={() => toggleConnection()}>{status}</button>
            <textarea className="w-auto h-[30rem] mx-2 overflow-y-auto" id="log" defaultValue={messages} readOnly />
        </div>
    )
}