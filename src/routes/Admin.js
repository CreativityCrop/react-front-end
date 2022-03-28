/*                    Warning                    */
/*           This is work in progress            */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import axios from "axios";
import { sha3_256 } from 'js-sha3';

import AuthProvider, { getToken, MAIN_API_URL } from "../AuthAPI";

const URL = `//creativitycrop.tech/api/admin/log?token=${getToken()}`;

export default function Admin() {
    // const location = useLocation();

    return (
        <div className="mt-5 mb-20 flex flex-col gap-6">
            <AuthProvider />
            <div id="payouts">
                <h1 className="mb-4 text-black text-left text-3xl select-none">Payouts</h1>
                <Payouts />
            </div>
            <div id="users">
                <h1 className="mb-4 text-black text-left text-3xl select-none">Users</h1>
                <Users />
            </div>
            <div id="ideas">
                <h1 className="mb-4 text-black text-left text-3xl select-none">Ideas</h1>
                <Ideas />
            </div>
            <div>
                <h1 className="mb-4 text-black text-center text-3xl select-none">FastAPI uvicorn log</h1>
                <Logs/>
            </div>
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

function Users() {
    const [users, setUsers] = useState([]);
    const [modalPasswordOpened, setModalPasswordOpened] = useState(false);
    const [passwordUpdateData, setPasswordUpdateData] = useState({userID: null, password: null});

    useEffect(() => {
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
    }, []);

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
        console.log(passwordUpdateData);
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
                setModalPasswordOpened(false);
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
                <td className="text-center"><button className="select-none" title="Delete user" onClick={() => deleteUser(user.id)}>🗑️</button></td>
                <td  className="text-center">
                    <button className="select-none" title="Change password" onClick={() => {
                        setPasswordUpdateData(prevData => {
                            return {userID: prevData.userID=user.id, password: prevData.password};
                        });
                        setModalPasswordOpened(true);
                    }}>🔏</button>
                </td>
            </tr>
        )
    })
    const customStyles = {
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

    return (
        <div>
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
                <Modal
                    closeTimeoutMS={200}
                    isOpen={modalPasswordOpened}
                    style={customStyles}
                    onAfterClose={() => setPasswordUpdateData({userID: null, password: null})}
                    appElement={document.getElementById('root')}
                >
                    
                    <div className="">
                        <button className="float-right mb-10" onClick={() => {setModalPasswordOpened(false);}}>❌</button>
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
            </div>
            <button className="mt-6 flex flex-row items-center px-4 py-1 bg-amber-300 select-none"><img className="h-4" src="/assets/icons/text.svg" alt="icon"/>Export</button>
        </div>
    );
}

function Ideas() {
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
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
    }, []);

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
                <td><button className="select-none" title="Delete idea" onClick={() => deleteIdea(idea.id)}>🗑️</button></td>
            </tr>
        )
    })

    return (
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
    );
}

function Payouts() {
    const [payouts, setPayouts] = useState([]);

    useEffect(() => {
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
    }, []);

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
        <div>
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
            <button className="mt-6 flex flex-row items-center px-4 py-1 bg-amber-300 select-none"><img className="h-4" src="/assets/icons/text.svg" alt="icon"/>Export</button>
        </div>
    );
}

function Logs() {
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        if(ws !== null) {
            ws.onopen = () => {
                console.log('WebSocket Connected');
            }

            ws.onmessage = (e) => {
                const message = e.data + "\n";
                setMessages((prevMessages) => [message, ...prevMessages]);
            }

            return () => {
                ws.onclose = () => {
                    console.log('WebSocket Disconnected');
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
        <div className="flex flex-col">
            <button className="select-none" onClick={() => toggleConnection()}>{ws?.readyState===1 ? "💔" : "🔗"}</button>
            <textarea className="w-auto h-[30rem] mx-2 overflow-y-auto" id="log" defaultValue={messages} readOnly />
        </div>
    )
}