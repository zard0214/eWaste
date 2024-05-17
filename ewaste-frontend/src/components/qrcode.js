import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from "qrcode.react";
import {getOrderDetails, getProductV2ById} from "../util/APIUtils";
import Alert from "react-s-alert";

const QRCODE = ({data, size}) => {
    return (
        <div>
            <QRCodeSVG
                value={JSON.stringify(data)}
                size={size}
                level={"L"}
            />
        </div>
    );
}

const QRcode = ({orderId, onClose}) => {
    const [order, setOrder] = useState();
    const [product, setProduct] = useState();

    useEffect(() => {
        const fetchOrder = () => {
            const orderDTO = {"id": orderId}
            getOrderDetails(orderDTO).then(response => {
                if(response.result.orderType === 1){
                    setOrder({voucherCode: response.result.qrcode, referralFee: "£10"});
                }else{
                    setOrder({voucherCode: response.result.qrcode});
                }
                fetchProduct(response.result.productId)
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
        }

        async function fetchProduct(id) {
            getProductV2ById(id).then(response => {
                const {receiverId, brandId, orderId, seriesId, classification, expectedValue, dataRetrieveUrl, visibility, productId, ...productData} = response.result;
                setProduct(productData);
            }).catch (error => {
                console.error('Error fetching product detail:', error);
            })
        }
        fetchOrder();
    }, []);

    const qrcode_data = {...order, ...product};

    return (
        <div>
            <div className="modal fade" id="qrcodeModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="false">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Order {orderId}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClose={onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <QRCODE data={qrcode_data} size={"100%"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QRcode