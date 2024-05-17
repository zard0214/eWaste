import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import './Details.css';
import styles from './Details.css';
import back from "../img/return.png";
import paymentMethod from '../img/paymentMethod.png';
import ProductModal from "./ProductModal";
import {useBasket} from "./BasketContext";

const ProductDetail = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [modalProduct, setModalProduct] = useState({});
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const {addToBasket} = useBasket();
    const navigate = useNavigate();

    const handleGoBack = () => {
        window.history.back();
    };

    const handleAddToBasket = () => {
        // Here you should add the item to the global basket state
        setShowModal(true);
        setModalProduct({
            image: props.product.imageUrl,
            model: props.product.seriesName,
            product: props.product,
            expectedValue: props.product.expectedValue
        });

        addToBasket({
            image: props.product.imageUrl,
            model: props.product.seriesName,
            product: props.product,
            expectedValue: props.product.expectedValue
        });

        navigate('/Basket');
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleBuyNow = () => {
        // Send an array with the single item to the Payment component
        navigate('/direct-payment', {state: {items: [props.product]}});
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % props.product.imageUrl.split(',').length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => {
            const newIndex = prevIndex - 1;
            return newIndex < 0 ? props.product.imageUrl.split(',').length - 1 : newIndex;
        });
    };

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

    return (

        <div className="product_container">
            <div className="row">
                <div style={{}}>
                    <img src={back} onClick={handleGoBack} alt="back"
                         style={{width: '20px', height: '20px', marginRight: '20px', marginLeft: '25px'}}/>
                </div>
            </div>

            <div className="row mt-5" style={{}}>

                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div
                            className="card mx-3 mt-5 d-flex justify-content-center align-items-center bg-secondary-subtle"
                            style={{height: '500px', overflow: 'hidden'}}>
                            <button className="btn next" onClick={() => handleNextImage()}>›
                            </button>
                            <img src={props.product.imageUrl} alt="Product"
                                 style={{
                                     width: props.product.width > props.product.height ? '100%' : 'auto',
                                     height: props.product.width > props.product.height ? 'auto' : '100%',
                                 }}/>
                            <button className="btn prev" onClick={() => handlePrevImage()}>‹
                            </button>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="row mx-3">
                            <h1>{props.product.seriesName}</h1>
                        </div>
                        <div className="row mx-3">
                            <h1><b>£{props.product.expectedValue}</b></h1>
                        </div>
                        <hr/>

                        <div className="row container">
                            <div className="row" style={{width: '100%'}}>
                                <strong className="col-4">Brand:</strong>
                                <div className="col-lg-8 col-md-8 col-sm-12 d-flex justify-content-end">
                                    <strong>{props.product.brandName}</strong>
                                </div>
                            </div>
                            <div className="row" style={{width: '100%'}}>
                                <strong className="col-4">Type:</strong>
                                <div className="col-lg-8 col-md-8 col-sm-12 d-flex justify-content-end">
                                    <strong>{props.product.type}</strong>
                                </div>
                            </div>
                            <div className="row" style={{width: '100%'}}>
                                <strong className="col-4">Condition:</strong>
                                <div className="col-lg-8 col-md-8 col-sm-12 d-flex justify-content-end">
                                    <strong>{getConditionFromValue(props.product.condition)}</strong>
                                </div>
                            </div>
                            <div className="row" style={{width: '100%'}}>
                                <strong className="col-4">Capacity:</strong>
                                <div className="col-lg-8 col-md-8 col-sm-12 d-flex justify-content-end">
                                    <strong>{props.product.capacity}</strong>
                                </div>
                            </div>
                            <div className="row" style={{width: '100%'}}>
                                <strong className="col-4">Color:</strong>
                                <div className="col-lg-8 col-md-8 col-sm-12 d-flex justify-content-end">
                                    <strong>{getColorFromValue(props.product.colour)}</strong>
                                </div>
                            </div>
                            <div className="row" style={{width: '100%'}}>
                                <strong className="col-4">Released Year</strong>
                                <div className="col-lg-8 col-md-8 col-sm-12 d-flex justify-content-end">
                                    <strong>{props.product.yearOfRelease}</strong>
                                </div>
                            </div>
                        </div>
                        <div className="section-divider"></div>
                        <div className="row" style={{width: '100%'}}>
                            <strong className="col-4">Description:</strong>
                            <div className="col-lg-8 col-md-8 col-sm-12 d-flex justify-content-end">
                                <strong>{props.product.description}</strong>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 mt-4">
                        <div className="row">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title text-center">
                                        <h2>Declaration</h2>
                                        <hr/>
                                    </div>
                                    <p>
                                        We promise to provide high-quality second-hand products, which undergo strict
                                        inspection and testing to ensure that you obtain reliable products.
                                    </p>
                                    <p>
                                        We are committed to reducing electronic waste and providing you with an
                                        affordable and reliable shopping experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="info-section mt-3">
                        <div className="shipping">
                                <strong>Postage:</strong> £4 Economy Delivery for any purchase. <a href="#">See details</a><br/>
                                Located in: Hayes, London, United Kingdom
                            </div>
                            <div className="delivery">
                                <strong>Delivery:</strong> Weekdays from 9am to 5pm.
                            </div>
                            <div className="returns">
                                <strong>Returns:</strong> No returns accepted. <a href="#">See details</a>
                            </div>
                            <div className="payments">
                                <strong>Payments:</strong>
                                <img src={paymentMethod} alt="PayPal" className="payment-method"/>
                            </div>
                        </div>
                        <div className="row">
                            <button className="btn btn-block btn-danger mt-3" onClick={handleBuyNow}> Buy it now</button>
                        </div>
                        <div className="row">
                            <button className="btn btn-block btn-primary mt-3" onClick={handleAddToBasket}>Add to basket</button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <ProductModal
                    product={modalProduct}
                    onClose={closeModal}
                />
            )}
        </div>

    );
};

export default ProductDetail;

