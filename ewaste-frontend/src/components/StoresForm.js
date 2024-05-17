import React, {useState, useEffect} from 'react';
import CurrencyInput from 'react-currency-input-field';
import Alert from "react-s-alert";
import {getStoreById, saveBrands, saveStores, updateBrands, updateStores, uploadFile} from "../util/APIUtils";
import AppNavigation from "../common/AppNavigation";
import {Button, Divider, Form, Image, Input, Radio} from "antd";

const StoresForm = (props) => {
    const [product, setProduct] = useState({
        id: '',
        name: '',
        value: '',
        imageUrl: '',
    });

    const [isRequired, setRequired] = useState(true)
    const [selectedPhotos, setSelectedPhotos] = useState([]);

    const [photoURL, setPhotoURL] = useState('');
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
                        product.imageUrl = newPhotoURL;
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

    useEffect(() => {
        //Fetch Product data from DB
        const fetchProductByID = (id) => {
            const brandId = {"id": id};
            getStoreById(brandId.id)
                .then(response => {
                    console.log(response.result)
                    setProduct(response.result);
                    setRequired(response.result.classification !== 'unknown')
                    // setIsLoading(false);
                })
                .catch(error => {
                    Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
                });
        };

        // Destructure props.location to access state
        const {state} = props.location;

        if (state !== undefined) {
            const id = state.id;
            fetchProductByID(id);
        }
    }, [props.location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: newValue
        }));
    };

    const handleChangeCurrency = (value, name, values) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            expectedValue: value
        }));
    };

    const handleOptionChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value});
        if(e.target.name === 'classification' && e.target.value !== 'unknown'){
            setRequired(true);
        }else{
            setRequired(false);
        }
    };

    const state = props.location.state;

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitBtn = document.getElementById("submit-btn");
        let cancelBtn = document.getElementById("cancel-btn");
        submitBtn.disabled = true;
        cancelBtn.disabled = true;
        if (product.id) {
            // Update existing product
            updateStores(product)
                .then(response => {
                    Alert.success("Store updated successfully");
                    props.history.push("/stores")
                })
                .catch(error => {
                    submitBtn.disabled = false;
                    cancelBtn.disabled = false;
                    Alert.error("Failed to update brand");
                });
        } else {
            // Add new product
            saveStores(product)
                .then(response => {
                    Alert.success("Store added successfully");
                    props.history.push("/stores")
                })
                .catch(error => {
                    submitBtn.disabled = false;
                    cancelBtn.disabled = false;
                    Alert.error("Failed to add brand");
                });
        }
    };

    const handleDataUpload = (e) => {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file, 'file.png');

        uploadFile(formData)
            .then((response) => {
                console.log('Uploaded data result:', response.result);
                product.imageUrl = response.result
                setProduct({...product, imageUrl: response.result});
                console.log('Uploaded data result:', product.imageUrl);
            }).catch((error) => {
            console.error('Upload failed:', error);
        });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        window.location.href='/stores';
    };

    return (
        <div>
            <AppNavigation/>
            <div className="content-container">
                <div className="card">
                    {/*<Skeleton>*/}
                    <h2 className="form-title">{state === undefined ? "New Store" : `Store ID: ${product.id} Details`}</h2>
                    <Divider></Divider>
                    <div className="form-container">
                        <Form labelCol={{span: 4}} wrapperCol={{span: 17}} layout="horizontal" filled>
                            <Form.Item required={true} label="Store Name">
                                <Input name="name" value={product.name} rule={{required: true}}
                                       onChange={(e) => handleChange(e)}
                                />
                            </Form.Item>
                            <Form.Item required={true} label="Brand Image">
                                {/*{product.imageUrl ?*/}
                                <div>
                                    <Image
                                        fallback="data:image/png;base64,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"
                                        width={200}
                                        height={200}
                                        src={product.imageUrl}
                                    />
                                    <Input style={{marginTop: "10px", marginRight: "50px", border: "0px"}} type="file" name="dataUrl"
                                           onChange={handleDataUpload}
                                    />
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                    <Divider></Divider>
                    <div className="submit-btn-div" style={{marginBottom: "20px", marginRight: "50px"}}>
                        <Button id="cancel-btn" htmlType="button" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <div style={{margin: "10px"}}></div>
                        <Button id="submit-btn" htmlType="submit" type="submit" type="primary" onClick={handleSubmit}>
                            Save
                        </Button>
                    </div>
                </div>
            {/*    <h2>{state === undefined ? "New Store" : `Store ID: ${product.id} Details`}</h2>*/}
            {/*    <form onSubmit={(e) => handleSubmit(e)}>*/}
            {/*        <div className="form-rows">*/}
            {/*            <div className="form-group row mb-3">*/}
            {/*                <label htmlFor="StoreName" className="col-sm-2 col-form-label">Store Name</label>*/}
            {/*                <div className="col-sm-10">*/}
            {/*                    <input type="text" className="form-control" name="name" value={product.name}*/}
            {/*                           required="true"*/}
            {/*                           onChange={(e) => handleChange(e)}/>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            /!*<div className="form-group row mb-3">*!/*/}
            {/*            /!*    <div className="col-sm-10">*!/*/}
            {/*            /!*        <input type="text" className="form-control" name="name" value={product.imageUrl}*!/*/}
            {/*            /!*               required="true"*!/*/}
            {/*            /!*               onChange={(e) => handleChange(e)}/>*!/*/}
            {/*            /!*    </div>*!/*/}
            {/*            /!*</div>*!/*/}
            {/*            <div className="detail">*/}
            {/*                <div>Photo</div>*/}
            {/*                <div className="col-sm-10">*/}
            {/*                    /!*<div className="col-sm-10">*!/*/}
            {/*                    /!*    <input type="text" name="imageUrl" value={product.imageUrl}*!/*/}
            {/*                    /!*           required="true"*!/*/}
            {/*                    /!*           onChange={(e) => handleChange(e)} style="display:none"/>*!/*/}
            {/*                    /!*</div>*!/*/}
            {/*                    <div className="photo-preview">*/}
            {/*                        <img src={product.imageUrl} alt="Preview" className="photo-image"/>*/}
            {/*                    </div>*/}
            {/*                    {selectedPhotos.length < 2 && (*/}
            {/*                        <input*/}
            {/*                            type="file"*/}
            {/*                            onChange={handlePhotosChange}*/}
            {/*                            className="input-file photo-upload-button"*/}
            {/*                        />*/}
            {/*                    )}*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="submit-btn-div">*/}
            {/*                <a id="cancel-btn" className="btn btn-light" href="/stores" role="button">Cancel</a>*/}
            {/*                <div style={{margin: "10px"}}></div>*/}
            {/*                <button id="submit-btn" type="submit" className="btn btn-primary">Save</button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </form>*/}
            </div>
        </div>
    )
}

export default StoresForm;
