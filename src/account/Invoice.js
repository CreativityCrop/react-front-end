import { useEffect, useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";
import NumberFormat from 'react-number-format';

import axios from 'axios';

import AuthProvider, { MAIN_API_URL, getToken, removeToken, setAuthContext } from '../AuthAPI';
import { ReactComponent as PrintIcon } from '../assets/print.svg'

export default function Invoice() {
    const params = useParams();
    const [invoice, setInvoice] = useState(
        {
            "name": "Test Testov", 
            "id": params.invoiceID,
            "date": new Date().toLocaleString(),
            "ideaTitle": "test idea bruh",
            "ideaShortDesc": "short desc bruh",
            "ideaPrice": "69420"
        }
    );

    const [addr1, setAddr1] = useState("");
    const [addr2, setAddr2] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const componentRef = useRef(null);
    const onBeforeGetContentResolve = useRef(null);
    const [loading, setLoading] = useState(false);
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
        const getInvoice = async () => {
            const response = await axios.get(MAIN_API_URL + "/account/invoice/" + params.invoiceID, {
                headers: {
                    "Token": getToken(),
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            setInvoice(response.data);  
            document.title = "Invoice - " + response.data.ideaTitle + " - CreativityCrop";
        }
        getInvoice();
    }, [params.invoiceID]);

    

    return(
        <div>
            <AuthProvider/>
            <div className="mt-6 mb-10 flex flex-row justify-center">
                <button onClick={handlePrint} className="flex flex-row items-center gap-4 p-3 border-4">
                    <span>{loading ? "Prepairing print" : "Print"}</span><PrintIcon className="w-12"/>
                </button>
            </div>
            <div className="flex flex-col w-10/12 m-auto mt-4 p-6 border-4" ref={componentRef}>
                <div id="heading" className="flex flex-row sm:text-center justify-between">
                    <div id="logo" className="w-60 h-40 bg-slate-300 "></div>
                    <h1 className="text-6xl sm:text-4xl sm:mt-4 sm:mb-10">Invoice</h1>
                </div>
                <div className="grid grid-flow-col gap-4 mt-10">
                    <div id="address" className="font-bold">
                        <div>
                        <p>CreativityCrop LLC</p>
                        <p>Stara Zagora</p>
                        <p>Bulgaria</p>
                        </div>
                        {!printing&&<div className="mt-16">
                            <p className="font-bold">Bill To: <span className="font-normal">{invoice.userName}</span></p>
                            <input onChange={(e) => setAddr1(e.target.value)} type="text" className="block h-8 sm:w-36 mb-1" placeholder="Address Line 1"></input>
                            <input onChange={(e) => setAddr2(e.target.value)} type="text" className="block h-8 sm:w-36 mb-1" placeholder="Address Line 2"></input>
                            <input onChange={(e) => setCity(e.target.value)} type="text" className="block h-8 sm:w-36 mb-1" placeholder="City"></input>
                            <input onChange={(e) => setCountry(e.target.value)} type="text" className="block h-8 sm:w-36 mb-1" placeholder="Country"></input>
                        </div>}
                        {printing && <div className="mt-16">
                            <p className="font-bold">Bill To: <span className="font-normal">{invoice.userName}</span></p>
                            <p>{addr1}</p>
                            <p>{addr2}</p>
                            <p>{city}</p>
                            <p>{country}</p>
                        </div>}
                    </div>
                    <div id="details" className="row-span-2 text-right">
                        <p className="font-bold">Invoice ID: <span className="font-normal">{invoice.id}</span></p>
                        <p className="font-bold">Invoice Date: <span className="font-normal">{invoice.date}</span></p>
                        <p className="mt-5">This invoice is generated for a processed payment on an idea item from the CreativityCrop platform </p>

                    </div>
                </div>
                <div id="item" className="mt-8">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col ">
                            <p className="font-bold">Idea ID:</p>
                            <p className="break-words">{invoice.ideaID}</p>
                        </div>
                        <div className="flex flex-col ">
                            <p className="font-bold">Idea Title:</p>
                            <p>{invoice.ideaTitle}</p>
                        </div>
                        {invoice.ideaShortDesc&&<div className="flex flex-col ">
                            <p className="font-bold">Idea Short Description:</p>
                            <p>{invoice.ideaShortDesc}</p>
                        </div>}
                        <div className="flex flex-col ">
                            <p className="font-bold">Idea Price:</p>
                            <NumberFormat
                                value={invoice.ideaPrice}
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
                            value={invoice.ideaPrice}
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
                            value={ (invoice.ideaPrice * 100 * 0.03)/100 }
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
                            value={ (invoice.ideaPrice * 100 * 0.2)/100}
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
                        {invoice.userType==="seller"&&"Total Payout: "}
                        {invoice.userType==="buyer"&&"Total Payout To Seller: "}
                        <NumberFormat
                            value={ ((invoice.ideaPrice * 100) - (invoice.ideaPrice * 100 * 0.03) - (invoice.ideaPrice * 100 * 0.2))/100 }
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

            </div>
        </div>
    );
}