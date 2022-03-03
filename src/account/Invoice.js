import { useEffect, useCallback, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";
import NumberFormat from 'react-number-format';

import Logo from '../header/Logo';

import axios from 'axios';

import AuthProvider, { MAIN_API_URL, getToken, removeToken, AuthContext } from '../AuthAPI';
import { ReactComponent as PrintIcon } from '../assets/print.svg'

export default function Invoice() {
    const [, setAuthContext] = useContext(AuthContext);
    const params = useParams();
    const [invoice, setInvoice] = useState(null);

    const [addr1, setAddr1] = useState("");
    const [addr2, setAddr2] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const componentRef = useRef(null);
    const onBeforeGetContentResolve = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [printing, setPrinting] = useState(false);
  
    const handleAfterPrint = useCallback(() => {
        // console.log("`onAfterPrint` called"); // tslint:disable-line no-console
    }, []);
    const handleBeforePrint = useCallback(() => {
        // console.log("`onBeforePrint` called"); // tslint:disable-line no-console
    }, []);
    const handleOnBeforeGetContent = useCallback(() => {
        // console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console
        setLoading(true);
        setPrinting(true);
        return new Promise((resolve) => {
            onBeforeGetContentResolve.current = resolve;
            setTimeout(() => {
                setLoading(false);
                resolve();
            }, 2000);
        });
    }, [setLoading]);

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, []);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: "AwesomeFileName",
        onBeforeGetContent: handleOnBeforeGetContent,
        onBeforePrint: handleBeforePrint,
        onAfterPrint: handleAfterPrint,
        removeAfterPrint: true
    });

    useEffect(() => {
        axios
            .get(MAIN_API_URL + "/account/invoice/" + params.invoiceID, {
                headers: {
                    "Token": getToken(),
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then((response) => {
                setInvoice(response.data);  
                document.title = "Invoice - " + response.data.ideaTitle + " - CreativityCrop";
            })
            .catch((err) => {
                setLoading(false);
                if(err.response.status === 401) {
                    removeToken();
                    setAuthContext("unauthenticated");
                }
                else if (err.response) {
                    setError(err.response.data.detail);
                }
                else if (err.request) {
                    // client never received a response, or request never left
                }
                else {
                    // anything else
                }
            
            });
    }, [params.invoiceID, setAuthContext]);

    

    return(
        <div className="mb-20 font-sans">
            <AuthProvider/>
            <div className="mt-6 mb-10 flex flex-row justify-center">
                <button onClick={handlePrint} className="flex flex-row items-center p-3 border-4 sm:w-fit">
                <PrintIcon className="w-12 ml-2"/><span className='ml-2'>{loading ? "Prepairing print" : null}</span>
                </button>
            </div>
            <div className="flex flex-col w-10/12 m-auto mt-4 p-6 border-4 sm:border-2 sm:p-4" ref={componentRef}>
                {
                    error && <div>
                        <h1>{error.title}</h1>
                        <p>{error.msg}</p>
                    </div>
                }
                {invoice&&<div>
                    <div id="heading" className="flex flex-row sm:text-center justify-between">
                        <div id="logo" className="w-60 h-40 sm:w-40 sm:h-20">
                            <Logo className="w-52 md:w-40 ml-3 shrink-0"/>
                        </div>
                        <h1 className="text-6xl sm:text-4xl sm:mt-4 sm:mb-10">Invoice</h1>
                    </div>
                    <div className="flex justify-between gap-4 mt-10 sm:mt-3 sm:grid">
                        <div id="address" className="font-bold">
                            <div>
                            <p>CreativityCrop LLC</p>
                            <p>Stara Zagora</p>
                            <p>Bulgaria</p>
                            </div>
                            {!printing&&<div className="mt-16 sm:mt-12">
                                <p className="font-bold">Bill To: <span className="font-normal">{invoice?.userName}</span></p>
                                <input onChange={(e) => setAddr1(e.target.value)} type="text" className="block h-8 sm:w-36 mb-1" placeholder="Address Line 1"></input>
                                <input onChange={(e) => setAddr2(e.target.value)} type="text" className="block h-8 sm:w-36 mb-1" placeholder="Address Line 2"></input>
                                <input onChange={(e) => setCity(e.target.value)} type="text" className="block h-8 sm:w-36 mb-1" placeholder="City"></input>
                                <input onChange={(e) => setCountry(e.target.value)} type="text" className="block h-8 sm:w-36 mb-1" placeholder="Country"></input>
                            </div>}
                            {printing && <div className="mt-16">
                                <p className="font-bold">Bill To: <span className="font-normal">{invoice?.userName}</span></p>
                                <p>{addr1}</p>
                                <p>{addr2}</p>
                                <p>{city}</p>
                                <p>{country}</p>
                            </div>}
                        </div>
                        <div id="details" className="row-span-2 text-right sm:mt-4 ">
                            <p className="font-bold">Invoice ID: <span className="font-normal">{invoice?.id}</span></p>
                            <p className="font-bold">Invoice Date: <span className="font-normal">{invoice?.date}</span></p>
                            <p className="mt-5">This invoice is generated for a processed payment on an idea item from the CreativityCrop platform </p>

                        </div>
                    </div>
                    <div id="item" className="mt-8">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col ">
                                <p className="font-bold">Idea ID:</p>
                                <p className="break-words">{invoice?.ideaID}</p>
                            </div>
                            <div className="flex flex-col ">
                                <p className="font-bold">Idea Title:</p>
                                <p>{invoice?.ideaTitle}</p>
                            </div>
                            {invoice?.ideaShortDesc&&<div className="flex flex-col ">
                                <p className="font-bold">Idea Short Description:</p>
                                <p>{invoice?.ideaShortDesc}</p>
                            </div>}
                            <div className="flex flex-col ">
                                <p className="font-bold">Idea Price:</p>
                                <NumberFormat
                                    value={invoice?.ideaPrice}
                                    displayType="text"
                                    prefix="$ "
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=" "
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    isNumericString={true}
                                    allowNegative={false}
                                />
                            </div>
                        </div>
                    </div>

                    <div id="price-calculation" className="flex flex-col mt-8 items-end">
                        <p>
                            Idea Price: <NumberFormat
                                value={invoice?.ideaPrice}
                                displayType="text"
                                prefix="$ "
                                thousandsGroupStyle="thousand"
                                thousandSeparator=" "
                                decimalScale={2}
                                fixedDecimalScale={true}
                                isNumericString={true}
                                allowNegative={false}
                            />
                        </p>
                        <p>
                            3% Platform Commission: <NumberFormat
                                value={ (invoice?.ideaPrice * 100 * 0.03)/100 }
                                displayType="text"
                                prefix="$ "
                                thousandsGroupStyle="thousand"
                                thousandSeparator=" "
                                decimalScale={2}
                                fixedDecimalScale={true}
                                isNumericString={true}
                                allowNegative={false}
                            />
                        </p>
                        <p>
                            20% VAT Deduction: <NumberFormat
                                value={ (invoice?.ideaPrice * 100 * 0.2)/100}
                                displayType="text"
                                prefix="$ "
                                thousandsGroupStyle="thousand"
                                thousandSeparator=" "
                                decimalScale={2}
                                fixedDecimalScale={true}
                                isNumericString={true}
                                allowNegative={false}
                            />
                        </p>
                        <p>
                            {invoice?.userType==="seller"&&"Total Payout: "}
                            {invoice?.userType==="buyer"&&"Total Payout To Seller: "}
                            <NumberFormat
                                value={ ((invoice?.ideaPrice * 100) - (invoice?.ideaPrice * 100 * 0.03) - (invoice?.ideaPrice * 100 * 0.2))/100 }
                                displayType="text"
                                prefix="$ "
                                thousandsGroupStyle="thousand"
                                thousandSeparator=" "
                                decimalScale={2}
                                fixedDecimalScale={true}
                                isNumericString={true}
                                allowNegative={false}
                            />
                        </p>
                    </div>
                </div>}
            </div>
        </div>
    );
}