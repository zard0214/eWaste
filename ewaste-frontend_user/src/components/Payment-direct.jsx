import React, {useState , useEffect} from "react";
import accessories from "../img/4090.png";
import {useLocation} from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Alert } from 'antd';
import Direct_payment from "../home/direct-payment";
import {addOrder} from "../util/APIUtils";

export default function DirectPayment() {

    function getConditionFromValue(value) {
        switch (value) {
            case 0:
                return "New";
            case 1:
                return "New without box";
            case 2:
                return "Very good";
            case 3:
                return "Good";
            case 4:
                return "Satisfactory";
            case 5:
                return "Bad";
            default:
                return "Unknown";
        }
    }

    function getColorFromValue(value) {
        switch (value) {
            case 1:
                return "Red";
            case 2:
                return "White";
            case 3:
                return "Black";
            case 4:
                return "Green";
            case 5:
                return "Yellow";
            case 6:
                return "Blue";
            case 7:
                return "Purple";
            case 8:
                return "Grey";
            case 9:
                return "Brown";
            case 10:
                return "Pink";
            case 11:
                return "Gold";
            case 12:
                return "Orange";
            default:
                return "Unknown";
        }
    }

    function getClassificationFromValue(value) {
        switch (value) {
            case 1:
                return "Current";
            case 2:
                return "Recycle";
            case 3:
                return "Rare";
            case 4:
                return "Unknown";
            default:
                return "";
        }
    }

    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [recipientName, setRecipientName] = useState(localStorage.getItem('recipientName'));
    const [addressLine, setAddressLine] = useState(localStorage.getItem('addressLine'));
    const [town, setTown] = useState(localStorage.getItem('town'));
    const [county, setCounty] = useState(localStorage.getItem('county'));
    const [postcode, setPostcode] = useState(localStorage.getItem('postcode'));
    const [phone, setPhone] = useState(localStorage.getItem('phone'));
    const location = useLocation();

    const [paymentMethod, setPaymentMethod] = useState("paypal");
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [qr,setQr] = useState("");
    const items = location.state?.items || []; // Expecting an array of items now
    console.log(items)
    // Sum the expectedValue of all items and add postage
    const postage = 10; // Assuming a flat postage rate for example
    const [itemsTotal,setItemsTotal] = useState(items.reduce((total, item) => total + Number(item.expectedValue), 0))
    const orderTotal = itemsTotal + postage;
    const [originalPrice, setOriginalPrice] = useState(itemsTotal);
    function handleQrChange(e){
        setQr(e.target.value);
    }

    function checkQr(){
        if(qr==="123456"){
            setItemsTotal(originalPrice*0.8);
        }
    }

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleAdEditClick = () =>{
        setIsEditingAddress(true);
    }

    const handleAdSubmitClick = () => {
        localStorage.setItem('recipientName', recipientName);
        localStorage.setItem('addressLine',addressLine);
        localStorage.setItem('town',town);
        localStorage.setItem('county',county);
        localStorage.setItem('postcode',postcode);
        localStorage.setItem('phone',phone);
        setIsEditingAddress(false);
    };

    const handleRecipientNameChange = (event) =>{
        setRecipientName(event.target.value);
    }

    const handleAddressLineChange = (event) =>{
        setAddressLine(event.target.value);
    }

    const handleTownChange = (event) =>{
        setTown(event.target.value);
    }

    const handleCountyChange = (event) =>{
        setCounty(event.target.value);
    }

    const handlePostCodeChange = (event) =>{
        setPostcode(event.target.value);
    }

    const handlePhoneChange = (event) =>{
        setPhone(event.target.value);
    }

    const paypalOptions = {
        "client-id": "ATiI9lyQ3fRJcAKqTswYQIeiZvMF1QvU0FyxoxRP0HcUNG7ql-7Orowc1axZCM-EM9krnuT0SKIjkIKa",
        currency: "GBP",
    };

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: "60.00"
                }
            }]
        });
    };

    const productData = {
        receiverId: localStorage.getItem("userId"),
        description: "aaa",
        brandId:1,
        seriesId:1,
        yearOfRelease: 2024,
        capacity: "--",
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function(details) {
        
        setPaymentSuccess(true)

        const { id, status, payer } = details;
        console.log('Payment ID:', id);
        console.log('Payment Status:', status);
        console.log('Payer Info:', payer);

        return details; 
        });
    };

    useEffect(() => {
        if (paymentSuccess) {
            const orderData = {
                receiverId: localStorage.getItem("userId"),
                productV2PO: productData,
                orderType: 3,
                receiverPhone: phone,
                receiverAddress: addressLine,
                totalAmount: itemsTotal,
                postageAmount: 10,
                serviceFeeAmount: orderTotal,
                realPayAmount: orderTotal,
                status: 60
            }
            const response = addOrder(orderData);
            // Redirect user to homepage after 3 seconds
            const redirectTimer = setTimeout(() => {
                window.location.href = "/homepage"; 
            }, 4000);

            // Cleanup timer on component unmount
            return () => clearTimeout(redirectTimer);
        }
    }, [paymentSuccess]);


    const initiatePayPalPayment = () => {
        // Implement logic to initiate PayPal payment
        document.getElementById("paypal-button").click();
    };

    const handleConfirmPayment = () => {
        if (paymentMethod === "paypal") {
            initiatePayPalPayment();
        } else {
            // Handle other payment methods
        }
    };

    const handleError = (error) => {
    setPaymentError(error.message); // Update state with the error message
    console.error("Payment error:", error);
    };


    if (items.length === 0) {
        return <div>No product details provided.</div>;
    }

    return (

        <PayPalScriptProvider options={paypalOptions}>
        <div className="container text-center py-4">
            <div className="row justify-content-center">

                <div className="row text-lg-start mb-4">
                    <a href="/homepage" className="text-decoration-none text-black">Homepage >> Payment</a>
                </div>
                <div className="row">
                    <div className="col-md-9">
                        {/* postage */}
                        <div className="card">
                            <div className="card-body text-lg-start">
                                <div className="card-title">
                                    <div className="row">
                                        <div className="col-9">
                                            <h2><b>Address</b></h2>
                                        </div>
                                        <div className="col-3">
                                            {isEditingAddress ? (
                                                <button className="btn btn-success"
                                                        onClick={handleAdSubmitClick}>Submit</button>
                                            ) : (
                                                <button className="btn btn-danger"
                                                        onClick={handleAdEditClick}>Edit</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="card-body">
                                    <div className="row">
                                        {isEditingAddress ? (
                                            <span>Recipient Name:
                                                        <input type="text" className="form-control"
                                                               value={recipientName}
                                                               onChange={handleRecipientNameChange}/></span>
                                        ) : (
                                            <span>Recipient Name: {localStorage.getItem("recipientName")}</span>
                                        )}
                                    </div>
                                    <div className="row mt-5">
                                        {isEditingAddress ? (
                                            <span>Address Line:
                                                        <input type="text" className="form-control" value={addressLine}
                                                               onChange={handleAddressLineChange}/></span>
                                        ) : (
                                            <span>Address Line: {localStorage.getItem("addressLine")}</span>
                                        )}
                                    </div>
                                    <div className="row  mt-5">
                                        <div className="col-6">
                                            {isEditingAddress ? (
                                                <span>Town/City:
                                                        <input type="text" className="form-control" value={town}
                                                               onChange={handleTownChange}/></span>
                                            ) : (
                                                <span>Town/City: {localStorage.getItem("town")}</span>
                                            )}
                                        </div>
                                        <div className="col-6">
                                            {isEditingAddress ? (
                                                <span>County:
                                                        <input type="text" className="form-control" value={county}
                                                               onChange={handleCountyChange}/></span>
                                            ) : (
                                                <span>County: {localStorage.getItem("county")}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="">
                                            {isEditingAddress ? (
                                                <span>Postcode:
                                                        <input type="text" className="form-control" value={county}
                                                               onChange={handlePostCodeChange}/></span>
                                            ) : (
                                                <span>Postcode: {localStorage.getItem("postcode")}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="">
                                            {isEditingAddress ? (
                                                <span>Phone:
                                                        <input type="text" className="form-control" value={phone}
                                                               onChange={handlePhoneChange}/></span>
                                            ) : (
                                                <span>Phone: {localStorage.getItem("phone")}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* detail */}
                        <div className="card mt-4">
                            <div className="card-body text-lg-start">
                                <h2 className="card-title"><b>Review item and postage</b></h2>
                                {items.map((item, index) => (
                                    <div className="row">
                                        <div className="mt-4 col-md-3">
                                            <div className="card">
                                                <img
                                                    src={item.imageUrl}
                                                    className="card-img-top img-fluid img-height"
                                                    alt="Accessories"/>
                                            </div>
                                        </div>

                                        <div className="mt-4 col-md-9">
                                            <div className="card px-4">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <h5 className="mt-3">{item.seriesName}</h5>
                                                        <h5 className="mt-4"><b>£{item.expectedValue}</b></h5>
                                                    </div>
                                                    <div className="col-8">
                                                        <p className="mt-3">Classification: {getClassificationFromValue(item.classification)}</p>
                                                        <p>Condition: {getConditionFromValue(item.condition)}</p>
                                                        <p>Color: {getColorFromValue(item.colour)}</p>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <h5 className="mt-1">Postage: Royal Mail</h5>
                                                <h5 className="mt-2"><b>£ 10 </b></h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* vouchers */}
                        <div className="card mt-4">
                            <div className="card-body text-lg-start">
                                <h2 className="card-title"><b>Add vouchers</b></h2>
                                <div className="row mt-4">
                                    <div className="col-md-8">
                                        <input type="text" className="form-control" id="voucherInput"
                                               placeholder="Enter voucher code" onChange={handleQrChange}/>
                                    </div>

                                    <div className="col-md-3">
                                        <button className="btn btn-primary" type="button" onClick={checkQr}>Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">

                                <div className="row">
                                    <div className="col text-start">
                                        Item
                                    </div>
                                    <div className="col text-end">
                                        {/*£{item.expectedValue}*/}
                                        £{itemsTotal.toFixed(2)}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col text-start">
                                        Postage
                                    </div>
                                    <div className="col text-end">
                                        ￡10
                                    </div>
                                </div>

                                <hr className="my-4"/>

                                <div className="row">
                                    <div className="col text-start">
                                        <b>Order total</b>
                                    </div>
                                    <div className="col text-end">
                                        <b>￡{orderTotal.toFixed(2)}</b>
                                    </div>
                                </div>

                                {/* PayPal buttons */}
                                <PayPalButtons
                                    id="paypal-button"
                                    style={{display: "none"}}
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                    onError={handleError}
                                />
                                {/* Message box for payment success */}
                                {paymentSuccess && (
                                    <Alert
                                        className="mt-3"
                                        message="Payment successful! Redirecting to homepage..."
                                        type="success"
                                        showIcon
                                    />
                                )}

                                {/* Message box for payment error */}
                                {paymentError && (
                                    <Alert
                                        className="mt-3"
                                        message={paymentError}
                                        type="error"
                                        showIcon
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        </PayPalScriptProvider>
    );
}

