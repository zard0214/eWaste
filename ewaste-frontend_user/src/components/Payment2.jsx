import React, {useState , useEffect} from "react";
import accessories from "../img/4090.png";
import {useLocation} from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Alert } from 'antd';
import {updateOrder} from "../util/APIUtils";

export default function Payment() {

    const searchParams = new URLSearchParams(window.location.search);
    const orderData = JSON.parse(searchParams.get('orderData'));

    const [paymentMethod, setPaymentMethod] = useState("paypal");
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [qr,setQr] = useState("");
    // Sum the expectedValue of all items and add postage
    const [serviceFee,setServiceFee] = useState(10);
    const [originalPrice, setOriginalPrice] = useState(10);
    const postage = 5;
    const orderTotal = serviceFee + postage;
    function handleQrChange(e){
        setQr(e.target.value);
    }

    function checkQr(){
        if(qr==="123456"){
            setServiceFee(originalPrice*0.8);
        }
    }

    const location = useLocation();
    
    const items = location.state?.items || []; // Expecting an array of items now
    const itemsTotal = items.reduce((total, item) => total + Number(item.expectedValue), 0);
    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };


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

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function(details) {
            // Handle successful payment
           setPaymentSuccess(true)
           console.log(details);
        });
    };

    useEffect(() => {

    console.log("Payment success changed:", paymentSuccess);
    if (paymentSuccess) {
        const order={
            id:orderData.id,
            realPayAmount: orderTotal,
            status:60
        }
        const response = updateOrder(order);
        // Redirect user to homepage after 3 seconds
        const redirectTimer = setTimeout(() => {
            window.location.href = "/re-homepage";
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
    // Update state with the error message
    setPaymentError(error.message); 
    console.error("Payment error:", error);

    };
    return (
        <PayPalScriptProvider options={paypalOptions}>
        <div className="container text-center">
            <div className="row justify-content-center">
                <div className="col-lg-9 col-md-9 col-sm-12">

                    {/* postage */}
                    <div className="card mt-2">
                        <div className="card-body text-lg-start">
                            <h2 className="card-title"><b>Order information</b></h2>
                            <hr/>
                            <p className="mt-4">Order ID : {orderData.id}</p>
                            <p>Order initiator ID : {orderData.receiverId}</p>
                            <p>Order type: Data retrieval</p>
                            <p>Address: {orderData.receiverAddress}</p>
                            <p>Phone: {orderData.receiverPhone}</p>
                            <hr/>
                            <p>* After placing the order, please deliver the equipment to the specified address: E-waste
                                Sheffield Sheffield S1 4QW.</p>
                            <p>The device will complete data retrieval and be sent back within 5 business days.</p>
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

                <div className="col-lg-3 col-md-3 col-sm-12">
                    <div className="card mt-2">
                        <div className="card-body">

                            <div className="row">
                                <div className="col text-start">
                                    Item
                                </div>
                                <div className="col text-end">
                                    {/*£{item.expectedValue}*/}
                                    £ {serviceFee}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col text-start">
                                    Postage
                                </div>
                                <div className="col text-end">
                                    £ {postage}
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
                            
                            <div className="row mt-3 mx-1">
                                <label htmlFor="confirmPayment" className="col-form-label">Confirm Payment:</label>
                            </div>

                            {/* PayPal buttons */}
                            <PayPalButtons
                                    id="paypal-button"
                                    style={{ display: "none" }}
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
        </PayPalScriptProvider>
    );
}
