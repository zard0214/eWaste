import React, {useState, useEffect} from 'react';
import CurrencyInput from 'react-currency-input-field';
import Alert from "react-s-alert";
import {
    getStoreProductById,
    getBrands,
    getStores,
    updateStoreProducts,
    saveStoreProducts,
    findSeriesByBrandId
} from "../util/APIUtils";
import AppNavigation from "../common/AppNavigation";
import {Button, Divider, Form, Select} from "antd";

const StoreProductsForm = (props) => {
    const [product, setProduct] = useState({
        id: '',
        name: '',
        storeId: 0,
        brandId: 0,
        seriesId: 0,
        expectedValue: 0,
    });

    const [storesList, setStoreList] = useState([]);
    const [brandsList, setBrandsList] = useState([]);
    const [seriesList, setSeriesList] = useState([]);

    useEffect(() => {
        //Fetch Product data from DB
        const fetchStoreProductByID = (id) => {
            getStoreProductById(id)
                .then(response => {
                    console.log(response.result)
                    setProduct(response.result);
                })
                .catch(error => {
                    Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
                });
        };
        const fetchAllBrands = () => {
            getBrands()
                .then(response => {
                    if(response.result) {
                        const tempFilter = [];
                        response.result.forEach(brand => {
                            if (!tempFilter.some(filter => filter.value === brand.name)) {
                                tempFilter.push({
                                    label: brand.name,
                                    value: brand.id
                                })
                            }
                        })
                        if (tempFilter) {
                            setBrandsList(tempFilter);
                        }
                    }
                })
                .catch(error => {
                    Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
                });
        };
        const fetchAllStores = () => {
            getStores()
                .then(response => {
                    if(response.result) {
                        const tempFilter = [];
                        response.result.forEach(store => {
                            if (!tempFilter.some(filter => filter.value === store.name)) {
                                tempFilter.push({
                                    label: store.name,
                                    value: store.id
                                })
                            }
                        })
                        if (tempFilter) {
                            setStoreList(tempFilter);
                        }
                    }
                })
                .catch(error => {
                    Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
                });
        };

        // Destructure props.location to access state
        const {state} = props.location;

        if (state !== undefined) {
            setProduct({...product, id:state.id});
            fetchStoreProductByID(state.id);
            fetchAllBrands()
            fetchAllStores()
        }else{
            fetchAllBrands()
            fetchAllStores()
        }
    }, [props.location]);

    useEffect(() => {
        const fetchAllSeries = (id) => {
            findSeriesByBrandId(id)
                .then(response => {
                    if(response.result) {
                        const tempFilter = [];
                        response.result.forEach(series => {
                            if (!tempFilter.some(filter => filter.value === series.name)) {
                                tempFilter.push({
                                    label: series.name,
                                    value: series.id
                                })
                            }
                        })
                        if (tempFilter) {
                            setSeriesList(tempFilter);
                        }
                    }
                })
                .catch(error => {
                    Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
                });
        };
        fetchAllSeries(product.brandId)
    }, [product.brandId]);

    const state = props.location.state;

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitBtn = document.getElementById("submit-btn");
        let cancelBtn = document.getElementById("cancel-btn");
        submitBtn.disabled = true;
        cancelBtn.disabled = true;
        if (product.id) {
            updateStoreProducts(product)
                .then(response => {
                    Alert.success("Store Product updated successfully");
                    props.history.push("/storesProducts")
                })
                .catch(error => {
                    submitBtn.disabled = false;
                    cancelBtn.disabled = false;
                    Alert.error("Failed to update Store Product");
                });
        } else {
            // Add new product
            saveStoreProducts(product)
                .then(response => {
                    Alert.success("Store Product added successfully");
                    props.history.push("/storesProducts")
                })
                .catch(error => {
                    submitBtn.disabled = false;
                    cancelBtn.disabled = false;
                    Alert.error("Failed to add Store Product");
                });
        }
    };

    const handleChangeCurrency = (value, name, values) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            expectedValue: value
        }));
    };

    const handleCancel = (e) => {
        e.preventDefault();
        window.location.href='/storesProducts';
    };

    return (
        <div>
            <AppNavigation/>
            <div className="content-container">
                <div className="card">
                    <h2 className="form-title">{state === undefined ? "New Stores Products" : `Stores Products ID: ${product.id} Details`}</h2>
                    <Divider></Divider>
                    <div className="form-container">
                        <Form labelCol={{span: 4}} wrapperCol={{span: 17}} layout="horizontal" filled>
                            <Form.Item label="Store" className="form-item">
                                <Select onChange={(value) => {
                                    setProduct({...product, storeId: value});
                                }} value={product.storeId ? product.storeId : "--Select--"} options={storesList}/>
                            </Form.Item>
                            <Form.Item label="Brand" className="form-item">
                                <Select onChange={(value, option) => {
                                    setProduct({...product, brandId: value});
                                }} value={product.brandId ? product.brandId : "--Select--"} options={brandsList}/>
                            </Form.Item>
                            <Form.Item label="Series" className="form-item">
                                <Select onChange={(value, option) => {
                                    setProduct({...product, seriesId: value});
                                }} value={product.seriesId ? product.seriesId : "--Select--"} options={seriesList}/>
                            </Form.Item>
                            <Form.Item required={true} label="Expected Value" className="form-item">
                                <CurrencyInput
                                    className="form-control"
                                    id="expectedValue"
                                    name="expectedValue"
                                    placeholder="Please enter the expected value"
                                    value={product.expectedValue}
                                    decimalsLimit={2} // decimal place limit
                                    prefix="£"
                                    required={true}
                                    onValueChange={handleChangeCurrency}
                                />
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
            </div>
        </div>
    )
}

export default StoreProductsForm;
