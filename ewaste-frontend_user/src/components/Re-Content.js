import React, {useEffect, useRef, useState} from "react";
import "./Content.css"
import leftChevron from "../img/leftChevron.png"
import rightChevron from "../img/rightChevron.png"
import continues from "../img/continue.png"
import cancel from '../img/cancel.png';
import axios from 'axios';
import appleLogo from '../img/Apple.png';
import samsungLogo from '../img/Samsung.png';
import LGLogo from '../img/LG.png';
import GoogleLogo from '../img/Google.jpg'
import XiaomiLogo from '../img/Xiaomi.png'
import OneplusLogo from '../img/Oneplus.jpeg'
import backgroundImg from '../img/samsung.jpeg'
import { useNavigate } from 'react-router-dom';
import {addOrder, getAllBrands, getSeriesByBrand, getThirdPartyPrice, uploadFile} from '../util/APIUtils';
import {ACCESS_TOKEN} from "../constants";
import {customAlphabet} from "nanoid";
const Re_Content = () => {
    const nanoid = customAlphabet('1234567890', 8);

    const colors = [
        { value: 1, label: 'Red' },
        { value: 2, label: 'White' },
        { value: 3, label: 'Black' },
        { value: 4, label: 'Green' },
        { value: 5, label: 'Yellow' },
        { value: 6, label: 'Blue' },
        { value: 7, label: 'Purple' },
        { value: 8, label: 'Grey' },
        { value: 9, label: 'Brown' },
        { value: 10, label: 'Pink' },
        { value: 11, label: 'Gold' },
        { value: 12, label: 'Orange' }
    ];

    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState(0);
    const [brandName, setBrandName] = useState("");
    const [series, setSeries] = useState([]);
    const [seriesName, setSeriesName] = useState("");
    const [serie, setSerie] = useState(0);
    const [phone, setPhone] = useState(localStorage.getItem("phone"));

    const [yearOfRelease, setYearOfRelease] = useState(new Date().getFullYear()); // default to current year
    const [model, setModel] = useState('');
    const [capacity, setCapacity] = useState('');
    const [color, setColor] = useState(1);
    const [condition, setCondition] = useState('');
    const [stores, setStores] = useState([]);
    const [store, setStore] = useState(0);
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [expectedValue, setEV] = useState(0);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [photoURL, setPhotoURL] = useState('');
    const navigate = useNavigate();
    const [type, setType] = useState('phones');
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [dataRetrieve, setDataRetrieve] = useState(false);
    const capacityOptions = ['8 GB','16 GB','32 GB','64 GB','128 GB','256 GB','512 GB','1 TB','2 TB','5 TB','10 TB'];

    const userid =  localStorage.getItem('userId')

    useEffect(async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const brandParam = queryParams.get('brand');
        const brandIdParam = queryParams.get('brandId');
        const seriesParam = queryParams.get('series');
        const seriesNameParam = queryParams.get('name');
        const conditionParam = queryParams.get('condition');
        const capacityParam = queryParams.get('capacity');
        setBrandName(brandParam);
        setBrand(parseInt(brandIdParam,10));
        setSeriesName(seriesNameParam);
        setSerie(parseInt(seriesParam, 10));
        setCondition(conditionParam);
        setCapacity(capacityParam);
    }, []);

    const getYears = () => {
        const currentYear = new Date().getFullYear();
        const startYear = 1990;
        return Array.from({length: currentYear - startYear + 1}, (v, k) => currentYear - k);
    };

    const years = getYears();
    const handleTypeChange = (e) => {
        setType(e.target.value);
    };


    const handlePhotosChange = (e) => {
        const selectedFiles = e.target.files;
        Array.from(selectedFiles).forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataURL = reader.result;
                const photoExists = selectedPhotos.some(photo => photo === dataURL);

                if (!photoExists) {
                    setSelectedPhotos(prevPhotos => [...prevPhotos, dataURL]);
                    const formData = new FormData();
                    formData.append('file', file, file.name);
                    const uploadPromise = uploadFile(formData);
                    uploadPromise.then((response) => {
                        console.log('Uploaded photo result:', response.result);
                        const newPhotoURL = response.result
                        setPhotoURL(prevPhotoURL => prevPhotoURL ? prevPhotoURL + ',' + newPhotoURL : newPhotoURL);
                    }).catch((error) => {
                        console.error('Upload failed:', error);
                    });
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const removePhotos = (index) => {
        const newPhotos = [...selectedPhotos];
        newPhotos.splice(index,1);
        setSelectedPhotos(newPhotos);
    };

    const handleCancel = () => {
        setModel('');
        setYearOfRelease(new Date().getFullYear());
        setCapacity('');
        setColor('');
        setCondition('');
        setDescription('');
    };

    async function getBrandId(){
        const response = await getAllBrands();
        setBrands(response.result);
        brands.forEach(brand => {
            if (brandName === brand.name) {
                setBrand(brand.id);
            }
        });
    }

    const handleContinue = async () => {
        if (!selectedPhotos) {
            console.error('Please select a photo.');
            return;
        }
        await getBrandId();
        const productData = {
            receiverId: localStorage.getItem("userId"),
            description: description,
            brandId:brand,
            seriesId:serie,
            yearOfRelease: yearOfRelease,
            condition: condition,
            colour: color,
            capacity: capacity,
            type: type,
            imageUrl: photoURL,
        };

        const orderData ={
            receiverId: localStorage.getItem("userId"),
            productV2PO: productData,
            orderType:1,
            receiverPhone:phone,
            third_party_id: store,
            qrcode: parseInt(nanoid())
        }

        try {
            const response = await addOrder(orderData);

            console.log(response.code);
            if (response.code === 200) {
                console.log('Data sent successfully!');
                handleCancel();
                window.location.href='/Notification';
            } else {
                console.error('Failed to send data!');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const handleStoreClick = async() => {
        const response = await getThirdPartyPrice(serie);
        setStores(response.result);
        console.log(response.result);
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
                <h1 className="text-center">Get your device recycle service </h1>
                <div className="card mx-3 mt-5">
                    <div className="card-body">
                        <div className="card-title">
                            <h3>Device Information</h3>
                        </div>
                        <hr/>
                        <div className="row mx-2 justify-content-center">
                            <div className="col-2">Brand:</div>
                            <input type="text" value={brandName} className="col-4"
                                   readOnly/>
                            <div className="col-1">

                            </div>
                            <div className="col-1">Series:</div>
                            <input type="text" value={seriesName} className="col-4"
                                   placeholder="Enter color" readOnly/>
                        </div>

                        <div className="row mx-2 justify-content-center mt-5">
                            <div className="col-2">Type</div>
                            <select value={type} onChange={handleTypeChange} className="col-4">
                                <option value="phones">Phones</option>
                                <option value="gameconsoles">Game Consoles</option>
                                <option value="laptops">Laptops</option>
                                <option value="monitors">Monitors</option>
                                <option value="accessories">Accessories</option>
                                <option value="unknown">Unknown/Other</option>
                            </select>
                            <div className="col-1">

                            </div>
                            <div className="col-1">Color</div>
                            <select className="col-4" value={color}
                                    onChange={(e) => setColor(e.target.value)}>
                                {colors.map(color => (
                                    <option key={color.value} value={color.value}>
                                        {color.label}
                                    </option>
                                ))}
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

                        <div className="row mx-2 justify-content-center mt-5">
                            <div className="col-2">Condition:</div>
                            <select value={condition} onChange={(e) => setCondition(e.target.value)}
                                    className="col-4">
                                <option value="0">New</option>
                                <option value="1">New without box</option>
                                <option value="2">Very good</option>
                                <option value="3">Good</option>
                                <option value="4">Satisfactory</option>
                                <option value="5">Bad</option>
                            </select>
                            <div className="col-1">

                            </div>
                            <div className="col-5"></div>
                        </div>

                        <div className="row mx-2 justify-content-center mt-5">
                            <div className="col-2">Photo:</div>
                            <div className="photo-container col-4">
                                {selectedPhotos.map((photo, index) => (
                                    <div key={index} className="photo-preview">
                                        <img src={photo} alt="Preview" className="photo-image"/>
                                        <button onClick={() => removePhotos(index)}
                                                className="remove-photo-button">×
                                        </button>
                                    </div>
                                ))}
                                {selectedPhotos.length < 3 && (
                                    <input
                                        type="file"
                                        onChange={handlePhotosChange}
                                        className="input-file photo-upload-button"
                                    />
                                )}
                            </div>
                            <div className="col-1">

                            </div>
                            <div className="col-5"></div>
                        </div>

                        <div className="row mx-2 mt-5">
                            <span>Description:<input type="text" className="form-control" value={description}
                                                     onChange={(e) => setDescription(e.target.value)}/></span>

                        </div>
                    </div>
                </div>
                <div className="card mx-3 mt-5">
                    <div className="card-body">
                        <div className="card-title">
                            <h3>Transaction Information</h3>
                        </div>
                        <hr/>
                        <div className="row mx-2">
                            <div className="col-2">Phone:</div>
                            <input type="text" className="col-4" value={phone}
                                   onChange={(e) => setPhone(e.target.value)}/>
                            <div className="col-6">

                            </div>
                        </div>

                        <div className="row mt-5 mx-2">
                            <div className="col-2">Store</div>
                            <select value={store} className="col-4" onChange={(e) => setStore(e.target.value)}
                                    onClick={handleStoreClick}>
                                <option value={0}>E-waste</option>
                                {stores.map(store =>
                                    <option value={store.storeId}>{store.storeName}</option>
                                )}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <img src={cancel} alt="cancel" className="cancecol-button" onClick={handleCancel}/>
                <img src={continues} alt="continue" className="continue-button" onClick={handleContinue}/>
            </div>

        </div>
    )
};
export default Re_Content;
