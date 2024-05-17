import React, {useRef, useState} from "react";
import "./Content.css"
import continues from "../img/continue.png"
import cancel from '../img/cancel.png';
import backgroundImg from '../img/samsung.jpeg'
import {addOrder, getAllBrands, getSeriesByBrand, uploadFile} from '../util/APIUtils';
import Alert from "react-s-alert";


const Content2 = () => {

    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState(0);
    const [series, setSeries] = useState([]);
    const [serie, setSerie] = useState(0);
    const [yearOfRelease, setYearOfRelease] = useState(new Date().getFullYear());
    const [capacity, setCapacity] = useState('');
    const [description, setDescription] = useState('');;
    const [recipientName, setRecipientName] = useState(localStorage.getItem('recipientName'));
    const [addressLine, setAddressLine] = useState(localStorage.getItem('addressLine'));
    const [town, setTown] = useState(localStorage.getItem('town'));
    const [county, setCounty] = useState(localStorage.getItem('county'));
    const [postcode, setPostcode] = useState(localStorage.getItem('postcode'));
    const [phone, setPhone] = useState(localStorage.getItem('phone'));
    const [showAlert, setShowAlert] = useState(false);
    const capacityOptions = ['8 GB','16 GB','32 GB','64 GB','128 GB','256 GB','512 GB','1 TB','2 TB','5 TB','10 TB'];
    const addressString = `${addressLine || ''} ${town || ''} ${county || ''} ${postcode || ''}`;
    const getYears = () => {
        const currentYear = new Date().getFullYear();
        const startYear = 1990;
        return Array.from({length: currentYear - startYear + 1}, (v, k) => currentYear - k);
    };

    const years = getYears();
    const handleCancel = () => {
        setBrand(0);
        setSerie(0);
        setYearOfRelease(new Date().getFullYear());
        setCapacity('');
        setPhone('');
        setAddressLine('');
        setTown('');
        setCounty('');
        setPostcode('');
    };

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
    }

    const handleSeriesChange=(e) =>{
        setSerie(e.target.value);
    }

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

    const handleContinue = async () => {

        if (!yearOfRelease || !recipientName || !addressLine || !town || !county || !postcode || !phone) {
            Alert.error('Please fill in all required fields.');
            return;
        }

        if (!validatePhone(phone)) {
            Alert.error('Please enter a valid phone number.');
            return;
        }

        const productData = {
            receiverId: localStorage.getItem("userId"),
            description: description,
            brandId:brand,
            seriesId:serie,
            yearOfRelease: yearOfRelease,
            capacity: capacity,
        };

        const orderData ={
            receiverId: localStorage.getItem("userId"),
            productV2PO: productData,
            orderType:2,
            receiverPhone:phone,
            receiverAddress:addressString,
            totalAmount: 15,
            postageAmount: 5,
            serviceFeeAmount:10,
        }

        try {
            const response = await addOrder(orderData);
            const orderDetail ={
                id:response.result,
                receiverId: localStorage.getItem("userId"),
                productV2PO: productData,
                orderType:2,
                receiverPhone:phone,
                receiverAddress:addressString,
            }
            console.log(orderDetail)
            console.log(response.code);
            if (response.code === 200) {
                console.log('Data sent successfully!');
                handleCancel();
                window.location.href = '/Notification';
            } else {
                console.error('Failed to send data!');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };


    const handleBrandClick = async() => {
        const response = await getAllBrands();
        setBrands(response.result);
        console.log(response.result);
    };

    const handleSeriesClick = async() => {
        const series ={
            brandId: brand
        }
        const response = await getSeriesByBrand(series);
        setSeries(response.result);
        console.log(response.result);
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value);
    };

    const validatePhone = (phoneNumber) => {
            const phoneRegex = /^(0044|0|\+?44)?(7\d{3}|\d{2,3})?\s?\d{3,10}$/;
            return phoneRegex.test(phoneNumber);
    };



    return (
        <div className="content" style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            //background: 'rgba(255, 255, 255, 0.9)', // 半透明的白色遮罩层
            zIndex: 1,
        }}>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: '0%',
                    background: 'rgba(255, 255, 255, 0.7)',
                    zIndex: -1,
                }}
            />

            <div className="detail-sections">
                <h1 className="text-center">Data Retrieval Service</h1>
                <div className="card mx-3">
                    <div className="card-body">
                        <div className="card-title">
                            <h3>Device Information</h3>
                        </div>
                        <hr/>
                        <div className="row mx-2 justify-content-center">
                            <div className="col-2">Brand:</div>
                            <select className="col-4" value={brand} onChange={handleBrandChange}
                                    onClick={handleBrandClick}>
                                {brands.map(brand =>
                                    <option value={brand.id}>{brand.name}</option>
                                )}
                                <option value="0">unknown</option>
                            </select>
                            <div className="col-1">

                            </div>
                            <div className="col-1">Series:</div>
                            <select id="series_select" className="col-4" value={serie}
                                    onChange={handleSeriesChange}
                                    onClick={handleSeriesClick}>
                                {series.map(s =>
                                    <option value={s.id}>{s.name}</option>
                                )}
                                <option value="0">Unknown</option>
                            </select>
                        </div>

                        <div className="row mx-2 justify-content-center mt-5">
                            <div className="col-2">Released Year:</div>
                            <select
                                value={yearOfRelease}
                                onChange={(e) => setYearOfRelease(e.target.value)}
                                className="col-4"
                            >
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <div className="col-1">

                            </div>
                            <div className="col-1">Capacity:</div>
                            <select
                                className="col-4"
                                name="capacity"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                            >
                                <option value="">If there is no capacity, it can be left blank.</option>
                                {capacityOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="row mx-2 mt-5">
                            <span>Description: (If the brand and series are not listed above, please enter them in the format [Brand Name]:[Series Name])<input type="text" className="form-control" value={description}
                                                     onChange={(e) => setDescription(e.target.value)}/></span>

                        </div>
                    </div>
                </div>
                <div className="card mx-3 mt-5">
                    <div className="card-body">
                        <div className="card-title">
                            <h3>Personal Information</h3>
                        </div>
                        <hr/>
                        <div className="row mx-2">
                            <span>Recipient Name:<input type="text" className="form-control" value={recipientName}
                                                        onChange={handleRecipientNameChange}/></span>

                        </div>
                        <div className="row mt-5 mx-2">
                            <span>Address Line:<input type="text" className="form-control" value={addressLine}
                                                      onChange={handleAddressLineChange}/></span>
                        </div>
                        <div className="row  mt-5 mx-2">
                            <div className="col-6">
                                <span>Town/City:<input type="text" className="form-control" value={town}
                                                       onChange={handleTownChange}/></span>
                            </div>
                            <div className="col-6">
                                <span>County:<input type="text" className="form-control" value={county}
                                                    onChange={handleCountyChange}/></span>
                            </div>
                        </div>
                        <div className="row mt-5 mx-2">
                            <div className="">
                                <span>Postcode:
                                    <input type="text" className="form-control" value={postcode}
                                           onChange={handlePostCodeChange}/></span>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="">
                            <span>Phone:
                                <input type="text" className="form-control" value={phone}
                                       onChange={handlePhoneChange}/></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showAlert && (
                <div className="alert alert-danger mt-3" role="alert">
                    Please fill in all required fields.
                </div>
            )}
            <div className="button-container mt-3">
                <img src={cancel} alt="cancel" className="cancecol-button" onClick={handleCancel}/>
                <img src={continues} alt="continue" className="continue-button" onClick={handleContinue}/>
            </div>

        </div>
    )
};
export default Content2;
