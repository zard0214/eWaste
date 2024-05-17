import React, {useState, useEffect} from 'react';
import {getOrderDetails, sendContactUs, sendEmail} from "../util/APIUtils";
import Alert from "react-s-alert";
import LoadingIndicator from "../common/LoadingIndicator";
import {updateOrder} from "../util/APIUtils";
import CurrencyInput from 'react-currency-input-field';
import {getOrderType, getState} from "../util/OrderStates";
import {uploadFile} from "../util/APIUtils"
import AppNavigation from "../common/AppNavigation";
import {Button, Divider, Form, Input} from "antd";
import QRcode from "./qrcode";
import {NavLink} from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";

const OrderEdit = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState([]);
    // const [product, setProduct] = useState([]);
    const [ownerContact, setOwner] = useState({});
    const [oriState, setOriState] = useState(null);
    // const states = getAllStates();
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        //Fetch Order data from DB
        const getOrderByID = (id) => {
            const orderDTO = {"id": id}
            getOrderDetails(orderDTO).then(response => {
                setOwner({ "email": response.result.email, "username": response.result.receiverName });
                setOrder(response.result);
                setOriState(response.result.status);
                // fetchProductByID(response.result.productId);
                setIsLoading(false);
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
                setIsLoading(false);
            });
        }

        const state = props.location.state
        if(state !== undefined){
            const O_id = props.location.state.id;
            getOrderByID(O_id);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitBtn = document.getElementById("submit-btn");
        let cancelBtn = document.getElementById("cancel-btn");
        submitBtn.disabled = true;
        cancelBtn.disabled = true;
        setIsLoading(true);

        // setOrder({...order, gmtModified: formatDateTime(new Date())})
        updateOrder(order)
            .then(response => {
                if(response.code != 200){
                    Alert.error(response.message);
                }else{
                    Alert.success("Order updated successfully");
                    props.history.push("/orders")
                }
                setIsLoading(false);
            }).catch(error => {
                submitBtn.disabled = false;
                cancelBtn.disabled = false;
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
                setIsLoading(false);
        });
    };

    const handleDataUpload = (e) => {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file, 'file.zip');

        uploadFile(formData)
            .then((response) => {
                setOrder({...order, ["dataUrl"]: response.result});
            }).catch((error) => {
                console.error('Upload failed:', error);
            });
    };

    const handleChange = (e) => {
        setOrder({...order, [e.target.name]: e.target.value});
    };

    const handleShowQR = (id) => {
        setSelectedOrderId(id);
    };

    const handleCloseQR = () => {
        setSelectedOrderId(null);
    };

    const handleSendEmail = () => {
        const email = ownerContact.email;
        const username = ownerContact.username;
        const operatorName = props.currentUser.userName;
        const dataUrl = order.dataUrl;

        sendEmail(email, operatorName, username, dataUrl)
            .then(() => {
                Alert.success("Email sent successfully!");
            })
    }

    const handleSendContactEmail = () => {
        const email = ownerContact.email;
        const username = ownerContact.username;
        const operatorName = props.currentUser.userName;

        sendContactUs(email, operatorName, username)
            .then(() => {
                Alert.success("Email sent successfully!");
            })
    }

    const handleCancel = (e) => {
        e.preventDefault();
        window.location.href='/orders';
    };

    if (isLoading) {
        return <LoadingIndicator/>
    }

    return (
        <div>
            <AppNavigation/>
            <div className="content-container">
                <div className="card">
                    {/*<Skeleton>*/}
                    <h2 className="form-title">Order ID: {order.id} Details</h2>
                    <Divider></Divider>
                    <div className="form-container">
                        <Form labelCol={{span: 4}} wrapperCol={{span: 17}} layout="horizontal" filled>
                            <Form.Item label="Order type" className="form-item">
                                <Input style={{color: "#000000"}} name="order-type" value={getOrderType(order.orderType)}
                                    disabled={true}/>
                            </Form.Item>
                            <Form.Item label="Device" className="form-item" style={{marginBottom: "40px"}}>
                                <Input style={{color: "#000000", marginBottom: "8px"}} name="device" value={order.productName}
                                       disabled={true}/>
                                <NavLink to={{
                                    pathname: `/productsV2/${order.productId}`,
                                    state: {id: order.productId}
                                }}>
                                    <Button className="btn-outline-primary">
                                        See device details
                                    </Button>
                                </NavLink>
                            </Form.Item>
                            <Form.Item label="Created at" className="form-item">
                                <Input style={{color: "#000000"}} name="createdAt" value={order.gmtCreated}
                                       disabled={true}/>
                            </Form.Item>
                            <Form.Item label="Last modified" className="form-item">
                                <Input style={{color: "#000000"}} name="last-modified" value={order.gmtModified}
                                       disabled={true}/>
                            </Form.Item>
                            <Form.Item label="Owner contact" className="form-item" style={{marginBottom: "40px"}}>
                                <Input style={{color: "#000000", marginBottom: "8px"}} name="owner-contact" value={ownerContact.email}
                                       disabled={true}/>
                                <Button onClick={handleSendContactEmail} className="btn-outline-primary">
                                    Contact Owner
                                </Button>
                            </Form.Item>
                            {
                                order.orderType === 1 ?
                                    <div>
                                        <Form.Item label="Third Party" className="form-item">
                                            <Input style={{color: "#000000"}} name="thirdParty" value={order.thirdParty}
                                                   disabled={true}/>
                                        </Form.Item>
                                        <Form.Item label="QRcode" className="form-item">
                                            {order.qrcode !== 0 ?
                                            <Button data-toggle="modal" data-target="#qrcodeModal"
                                                    onClick={() => handleShowQR(order.id)}
                                                    className="btn-outline-primary"
                                            >
                                                Open QRcode
                                            </Button> : "Used"}
                                        </Form.Item>
                                        {selectedOrderId && (
                                            <QRcode
                                                orderId={selectedOrderId}
                                                onClose={handleCloseQR}
                                            />
                                        )}
                                    </div>
                                    :
                                    <div>
                                        <Form.Item label="Amount Paid" className="form-item">
                                            <CurrencyInput
                                                style={{color: "#000000"}}
                                                className="form-control"
                                                name="amountPaid"
                                                value={order.realPayAmount}
                                                decimalsLimit={2} // decimal place limit
                                                prefix="£"
                                                disabled={true}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Data retrieved">
                                            {!order.dataUrl ?
                                                <input type="file" name="dataUrl"
                                                       onChange={handleDataUpload}
                                                />
                                                :
                                                <div>
                                                    <Input style={{color: "#000000"}} name="dataUrl" value={order.dataUrl}
                                                           disabled={true}/>
                                                    <input type="file" name="dataUrl"
                                                           onChange={handleDataUpload}
                                                    />
                                                </div>
                                            }
                                        </Form.Item>
                                    </div>
                            }
                            <Form.Item label="Status">
                                <OrderStatusBadge status={getState(order.status)}></OrderStatusBadge>
                            </Form.Item>
                            <Form.Item label="Last operator" className="form-item">
                                <Input style={{color: "#000000"}} name="lastOperator" value={order.lastOperator}
                                       disabled={true}/>
                            </Form.Item>
                            <Form.Item label="Remark" className="form-item-remark">
                                <Input.TextArea name="remark" value={order.remark}
                                                onChange={(e) => handleChange(e)}
                                                rows={4}/>
                            </Form.Item>
                        </Form>
                    </div>
                    <Divider></Divider>
                    <div className="submit-btn-div" style={{marginBottom: "20px", marginRight: "50px"}}>
                        <Button id="cancel-btn" htmlType="button" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <div style={{margin: "10px"}}></div>
                        <Button id="submit-btn" htmlType="submit" type="submit" className="btn-primary" onClick={handleSubmit}>
                            Save
                        </Button>
                    </div>
                </div>
                {/*</Skeleton>*/}
            </div>

        </div>
    );

};

export default OrderEdit;


