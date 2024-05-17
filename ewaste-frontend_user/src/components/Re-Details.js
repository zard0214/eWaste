import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import accessories from "../img/4090.png";
import './Details.css';
import styles from './Details.css';
import back from "../img/return.png";
import paymentMethod from '../img/paymentMethod.png';
import ProductModal from "./ProductModal";
import {useBasket} from "./BasketContext";
import { Button, Modal } from 'antd';
import {getAllBrands, getEvaluation, getThirdPartyPrice} from "../util/APIUtils";
import Alert from "react-s-alert";
// const dataLink = isLogin ? "/DataRetrieve" : "/login";

const Re_ProductDetail = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [condition, setCondition] = useState('');
    const [capacity, setCapacity] = useState('');
    const [brand, setBrand] = useState(props.product.brandName);
    const [brands, setBrands] = useState([]);
    const [brandId, setBrandId] = useState('');
    const [series, setSeries] = useState(props.product.id);
    const [value, setValue] = useState(0);
    const [yoc, setYoc] = useState(new Date().getFullYear());
    const {addToBasket} = useBasket();
    const navigate = useNavigate();
    const capacityOptions = ['8 GB','16 GB','32 GB','64 GB','128 GB','256 GB','512 GB','1 TB','2 TB','5 TB','10 TB'];
    const [showEwasteValue, setShowEwasteValue] = useState(false);
    const [shops, setShops] = useState([]);
    const [classification, setClassification] = useState("");
    const [classificationValue, setClassificationValue] = useState(0);
    const getYears = () => {
        const currentYear = new Date().getFullYear();
        const startYear = 1990;
        return Array.from({length: currentYear - startYear + 1}, (v, k) => currentYear - k);
    };
    const years = getYears();
    const handleShowModal = async () => {
        if(classificationValue == 1 || classificationValue == 3){
            if(classificationValue == 1){
                const information = await getThirdPartyPrice(props.product.id);
                setShops(information.result);
                console.log(information.result)
            }else{
                setShops([{storeName: "eBay", expectedValue:"unknown"}]);
                console.log(shops)
            }
            const product = {
                brandId:props.product.brandId,
                seriesId:props.product.id,
                capacity:capacity,
                condition:condition,
                yearOfRelease: yoc
            }
            console.log(product)
            const response = await getEvaluation(product);
            setValue(response.result.expectedValue);
            setClassificationValue(response.result.classification)
            setShowModal(true);
        }else{
            Alert.error('Oops! Third party store Only recycle Current device');
        }
    }

    const handleCloseModal = () => setShowModal(false);
    const handleValueButtonClick = async () => {
        const product = {
            brandId:props.product.brandId,
            seriesId:props.product.id,
            capacity: capacity,
            condition   : condition,
            yearOfRelease: yoc
        }
        console.log(product)
        const response = await getEvaluation(product);
        setValue(response.result.expectedValue);
        setClassificationValue(response.result.classification);
        console.log(classificationValue)
        setShowEwasteValue(true);
    };
    const handleGoBack = () => {
        window.history.back();
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % props.product.image.split(',').length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => {
            const newIndex = prevIndex - 1;
            return newIndex < 0 ? props.product.image.split(',').length - 1 : newIndex;
        });
    };

    const handleRecycleClick = () => {
        const isLogin = localStorage.getItem('userId');

        const url = isLogin ?`/series_recycle?brand=${props.product.brandName}&brandId=${props.product.brandId}&series=${props.product.id}&name=${props.product.name}&condition=${condition}&capacity=${capacity}` : "/login";
        window.location.href = url;
    };

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
                        <div className="card mx-3 mt-5 d-flex justify-content-center align-items-center bg-secondary-subtle" style={{height:'500px', overflow:'hidden'}}>
                            <img src={props.product.imageUrl} alt="Product"
                                 style={{
                                     width: props.product.width > props.product.height ? '100%' : 'auto',
                                     height: props.product.width > props.product.height ? 'auto' : '100%',
                                 }}/>
                        </div>
                    </div>

                    <div className="col-lg-5 col-md-5 col-sm-12">
                        <div className="row mx-3">
                            <h1>{props.product.name}</h1>
                        </div>
                        <hr/>

                        <div className="row container">
                            <div className="row" style={{width: '100%'}}>
                                <strong className="col-4">Brand:</strong>
                                <div className="col-lg-8 col-md-8 col-sm-12 d-flex justify-content-end">
                                    <strong>{props.product.brandName}</strong>
                                </div>
                            </div>
                            <div className="row mt-2" style={{width: '100%'}}>
                                <strong className="col-lg-4 col-md-4 col-sm-12">Condition:</strong>
                                <div className="col-lg-8 col-md-8 col-sm-12 d-flex justify-content-end">
                                    <select value={condition} onChange={(e) => setCondition(e.target.value)} style={{width: '400px'}}>
                                        <option value="0">New</option>
                                        <option value="1">New without box</option>
                                        <option value="2">Very good</option>
                                        <option value="3">Good</option>
                                        <option value="4">Satisfactory</option>
                                        <option value="5">Bad</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-2" style={{width: '100%'}}>
                                <strong className="col-lg-4 col-md-4 col-sm-12">Capacity:</strong>
                                <div className="col-lg-8 col-md-8 col-sm-12 d-flex justify-content-end">
                                    <select
                                        name="capacity"
                                        value={capacity}
                                        onChange={(e) => setCapacity(e.target.value)}
                                        style={{width: '400px'}}
                                    >
                                        <option value="">If there is no capacity, it can be left blank.</option>
                                        {capacityOptions.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-2" style={{width: '100%'}}>
                                <strong className="col-lg-4 col-md-4 col-sm-12">Year of purchase:</strong>
                                <div className="col-lg-8 col-md-8 col-sm-12 d-flex justify-content-end">
                                    <select
                                        value={yoc}
                                        onChange={(e) => setYoc(e.target.value)}
                                        style={{width: '400px'}}
                                    >
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-12 text-center">
                                    <button type="button" className="btn btn-danger btn-block"
                                            onClick={handleValueButtonClick}>
                                        Evaluate E-waste value
                                    </button>
                                </div>
                            </div>
                        </div>

                        <hr/>

                        <div className="row container">
                            <div className="shipping mt-2">
                                <strong>Postage:</strong> £3.29 Economy Delivery. <a href="#">See details</a><br/>
                                Located in: Hayes, London, United Kingdom
                            </div>
                            <div className="delivery mt-2">
                                <strong>Offline Store:</strong> Located in Sheffield
                            </div>
                            <div className="returns mt-2">
                                <strong>Returns:</strong> No returns accepted. <a href="#">See details</a>
                            </div>
                            <div className="payments mt-2">
                                <strong>Payments:</strong>
                            </div>
                            <div className="row mt-5">
                                <div className="col-lg-12 text-center">
                                    <button type="button" className="btn btn-danger btn-block"
                                            onClick={handleRecycleClick}>
                                        Complete information to recycle
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 mt-4">
                        <h2>Recycle Information</h2>
                        <p className="seller-note">
                            E-waste is committed to maintaining transparency and publish our recycling price list and
                            other third-parties on our website.
                        </p>
                        <p className="seller-note">
                            The Third Party is an independent entity and is not affiliated with any other company,
                            organization, or individual. Any services, products, or information provided by the Third
                            Party are independent of other entities.
                        </p>
                        <div className="row mt-2">
                            <div className="col-lg-12 text-center">
                                <button type="button" className="btn btn-danger btn-block" onClick={handleShowModal}>
                                    Get third party information
                                </button>
                            </div>
                        </div>

                        <div className="card mt-4 mb-4">
                            <div className="card-title mt-2 text-center">
                                <h3>E-waste Evaluation</h3>
                                <hr/>
                            </div>
                            <div className="card-body">
                                {!showEwasteValue &&
                                    <div className="text-center align-content-center">
                                        <h4>Pending</h4>
                                    </div>
                                }
                                {showEwasteValue && (
                                    <div className="row">
                                        <div className="col-6">
                                            <h5>Recycle value:</h5>
                                        </div>
                                        <div className="col-6 text-end">
                                            <h5><strong>£{value}</strong></h5>
                                        </div>
                                    </div>

                                )}
                                {showEwasteValue && (
                                    <div className="row mt-3">
                                        <div className="col-6">
                                            <h5>Classification:</h5>
                                        </div>
                                        <div className="col-6 text-end">
                                            <h5><strong>
                                                {(() => {
                                                    if (classificationValue === 1) {
                                                        return "Current";
                                                    } else if (classificationValue === 2) {
                                                        return "Recycle";
                                                    } else if (classificationValue === 3) {
                                                        return "Rare";
                                                    } else if (classificationValue === 4) {
                                                        return "Unknown";
                                                    } else {
                                                        return "";
                                                    }
                                                })()}
                                            </strong></h5>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Modal title="Third party information" open={showModal} onCancel={handleCloseModal} footer={null} width={1000}>
                            <div className="row">
                                <div className="col-6">
                                    <img src={props.product.imageUrl} alt="Product"
                                         style={{width: '100%', height: 'auto'}}/>
                                </div>
                                <div className="col-6">

                                    <div>
                                        <div className="mt-3">
                                            <h2><strong>Product Name:</strong> {props.product.name}</h2>
                                            <h4><strong>Brand:</strong> {props.product.brandName}</h4>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="seller-note mt-3">
                                            <h4><strong>E-waste value:  </strong> £{value}</h4>
                                            <h4><strong>E-waste Classification:  </strong>
                                            {(() => {
                                                if (classificationValue === 1) {
                                                    return "Current";
                                                } else if (classificationValue === 2) {
                                                    return "Recycle";
                                                } else if (classificationValue === 3) {
                                                    return "Rare";
                                                } else if (classificationValue === 4) {
                                                    return "Unknown";
                                                } else {
                                                    return "";
                                                }
                                            })()}</h4>
                                        </div>
                                    </div>

                                    <div>
                                        {shops.length ? (
                                            shops.map((shop, index) => {
                                                return (
                                                    <div key={index} className="seller-note mt-3">
                                                    <p><strong>Shop Name:</strong> {shop.storeName}</p>
                                                        <p><strong>Recycle value:</strong> £{shop.expectedValue}</p>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="seller-note mt-3">
                                                <p>No other stores recycle this product.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Re_ProductDetail;

