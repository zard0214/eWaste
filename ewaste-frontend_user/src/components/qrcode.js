import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from "qrcode.react";
import axios from 'axios';
import {ACCESS_TOKEN} from "../constants";

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
        async function fetchOrder() {
            try {
                const response = await axios.post('http://localhost:8080/order/details', {id: orderId}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                    }});
                // const {gmtModified, postageAmount, productName, qrcode, realPayAmount, receiverAddress, receiverId, receiverPhone, serviceFeeAmount, thirdParty, ...orderData} = response.data.result;

                if(response.data.result.orderType === 1){
                    setOrder({voucherCode: response.data.result.qrcode, referralFee: "£10"});
                }else{
                    setOrder({voucherCode: response.data.result.qrcode});
                }
                fetchProduct(response.data.result.productId);
            } catch (error) {
                console.error('Error fetching order detail:', error);
            }
        }

        async function fetchProduct(id) {
            try {
                const url = 'http://localhost:8080/productV2' + `/${id}`
                const response = await axios.get(url);
                const {receiverId, brandId, orderId, seriesId, classification, expectedValue, dataRetrieveUrl, visibility, productId, ...productData} = response.data.result;
                setProduct(productData);
            } catch (error) {
                console.error('Error fetching product detail:', error);
            }
        }
        fetchOrder();
    }, [orderId]);

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