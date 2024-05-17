import React, {useState, useEffect} from 'react';
import CurrencyInput from 'react-currency-input-field';
import Alert from "react-s-alert";
import {
    getBrands,
    getProductV2ById,
    getSeries,
    updateProductV2,
    uploadFile
} from "../util/APIUtils";
import AppNavigation from "../common/AppNavigation";
import {Form, Input, Select, Radio, InputNumber, Image, Button, Divider} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { capacityOptions, classification, colour, condition, deviceTypes} from "../util/ProductOptions";
import {NavLink} from "react-router-dom";

const ProductFormV2 = (props) => {
    const [product, setProduct] = useState({});
    const { TextArea } = Input;

    const [isLoading, setIsLoading] = useState(false);
    const [brands, setBrandData] = useState([])
    const [series, setSeriesData] = useState([])

    const [isRequired, setRequired] = useState(true)



    useEffect(() => {
        //Fetch Product data from DB
        const fetchProductByID = (id) => {
            const productId = {"id": id};
            getProductV2ById(productId.id)
                .then(response => {
                    console.log(response.result)
                    setProduct(response.result);
                    setRequired(response.result.classification !== 'unknown')
                    fetchBrands();
                    // setIsLoading(true);
                })
                .catch(error => {
                    Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
                    // setIsLoading(true);
                });
        };

        const fetchBrands = () => {
            getBrands().then(response => {
                if(response.result) {
                    const tempFilter = [{label:"Unknown", value:0}];
                    response.result.forEach(brand => {
                        if (!tempFilter.some(filter => filter.value === brand.name)) {
                            tempFilter.push({
                                label: brand.name,
                                value: brand.id
                            })
                        }
                    })
                    if (tempFilter) {
                        setBrandData(tempFilter);
                    }
                }
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
        }

        // Destructure props.location to access state
        const {state} = props.location;

        if (state !== undefined) {
            const id = state.id;
            fetchProductByID(id);
        }
    }, [props.location]);

    useEffect(() => {
        const fetchSeries = () => {
            getSeries().then(response => {
                if(response.result) {
                    const brandChosen = product.brandId;
                    const tempFilter = [{label:"Unknown", value:0}];
                    response.result.forEach(series => {
                        if (!tempFilter.some(filter => filter.value === series.name) && series.brandId === brandChosen) {
                            tempFilter.push({
                                label: series.name,
                                value: series.id
                            })
                        }
                    })
                    if (tempFilter) {
                        setSeriesData(tempFilter);
                    }
                }
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
        }

        fetchSeries();
    }, [product.brandId])

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduct({...product, [name]: value});
    };

    const handleChangeCurrency = (value, name, values) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            expectedValue: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product)
        let submitBtn = document.getElementById("submit-btn");
        let cancelBtn = document.getElementById("cancel-btn");
        submitBtn.disabled = true;
        cancelBtn.disabled = true;
        updateProductV2(product)
            .then(() => {
                Alert.success("Product updated successfully");
                props.history.push("/productsV2")
            })
            .catch(error => {
                submitBtn.disabled = false;
                cancelBtn.disabled = false;
                Alert.error("Failed to update product");
            });
    }

    const handleCancel = (e) => {
        e.preventDefault();
        console.log(e);
        // <a href="/productsV2"></a>
        window.location.href='/productsV2';
    };

    return (
        <div>
            <AppNavigation/>
            <div className="content-container">
                <div className="card">
                    {/*<Skeleton>*/}
                    <h2 className="form-title">Product ID: {product.id} Details</h2>
                    <Divider></Divider>
                    <div className="form-container">
                        <Form labelCol={{span: 4}} wrapperCol={{span: 17}} layout="horizontal" filled>
                            <Form.Item label="Order Id" className="form-item" style={{marginBottom: "40px"}}>
                                <Input style={{color: "#000000", marginBottom: "8px"}} name="orderId" value={product.orderId} rows={4}
                                disabled={true}/>
                                <NavLink to={{
                                    pathname: `/orders/${product.orderId}`,
                                    state: {id: product.orderId}
                                }}>
                                    <Button className="btn-outline-primary">
                                        See order details
                                    </Button>
                                </NavLink>
                            </Form.Item>
                            <Form.Item label="Brand" className="form-item">
                                {/*<AutoComplete*/}
                                {/*    options={brands}*/}
                                {/*    style={{*/}
                                {/*        width: 200,*/}
                                {/*    }}*/}
                                {/*    onChange={(value) => {*/}
                                {/*        const id = searchId(brands, value);*/}
                                {/*        setProduct({...product, brandId: id, brandName: value});*/}
                                {/*        console.log(product)*/}
                                {/*    }}*/}
                                {/*    value={product.brandName}*/}
                                {/*/>*/}
                                <Select onChange={(value, option) => {
                                    setProduct({...product, brandId: value, brandName: option.label});
                                }} value={product.brandId} options={brands}/>
                            </Form.Item>
                            <Form.Item label="Series" className="form-item">
                                <Select onChange={(value, option) => {
                                    setProduct({...product, seriesId: value, seriesName: option.label});
                                }} value={product.seriesId} options={series}/>
                            </Form.Item>
                            <Form.Item label="Type" className="form-item">
                                <Select onChange={(value) => {
                                    setProduct({...product, type: value});
                                }} value={product.type} options={deviceTypes}/>
                            </Form.Item>
                            <Form.Item label="Year of Release" className="form-item">
                                <InputNumber min={2001} max={2024} value={product.yearOfRelease} onChange={(value) => {
                                    setProduct({...product, yearOfRelease: value});
                                }}/>
                            </Form.Item>
                            <Form.Item label="Capacity" className="form-item">
                                <Select onChange={(value) => {
                                    setProduct({...product, capacity: value});
                                }} value={product.capacity} options={capacityOptions}/>`
                            </Form.Item>
                            <Form.Item required={true} label="Classification" className="form-item">
                                <Select onChange={(value) => {
                                    setProduct({...product, classification: value});
                                }} value={product.classification} options={classification}/>`
                            </Form.Item>
                            <Form.Item label="Colour" className="form-item">
                                <Select onChange={(value) => {
                                    setProduct({...product, colour: value});
                                }} value={product.colour} options={colour}/>`
                            </Form.Item>
                            <Form.Item required={true} label="Condition" className="form-item">
                                <Select onChange={(value) => {
                                    setProduct({...product, condition: value});
                                }} value={product.condition} options={condition}/>`
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
                                    required={isRequired}
                                    onValueChange={handleChangeCurrency}
                                />
                            </Form.Item>
                            <Form.Item label="Description" className="form-item-remark">
                                <Input.TextArea name="description" value={product.description}
                                                onChange={(e) => handleChange(e)}
                                                rows={4}/>
                            </Form.Item>
                            <Form.Item required={true} label="Product Image">
                                {/*{product.imageUrl ?*/}
                                <div>
                                    <Image
                                        fallback="data:image/png;base64,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"
                                        width={200}
                                        height={200}
                                        src={product.imageUrl}
                                    />
                                    {/*<Upload type="file" name="dataUrl" onChange={handleDataUpload} {...props}>*/}
                                    {/*    <Button icon={<UploadOutlined />}>Click to Upload</Button>*/}
                                    {/*</Upload>*/}
                                    <Input style={{marginTop: "10px", marginRight: "50px"}} type="file" name="dataUrl"
                                           onChange={handleDataUpload}
                                    />
                                </div>
                                {/*:*/}
                                {/*<div>*/}
                                {/*    <Input  type="file" name="dataUrl" className="form-item"*/}
                                {/*            onChange={handleDataUpload}*/}
                                {/*    />*/}
                                {/*    /!*<Upload type="file" name="dataUrl" onChange={handleDataUpload} {...props}>*!/*/}
                                {/*    /!*    <Button icon={<UploadOutlined />}>Click to Upload</Button>*!/*/}
                                {/*    /!*</Upload>*!/*/}
                                {/*</div>*/
                                }
                            </Form.Item>
                            <Form.Item label="Visibility">
                                <Radio.Group onChange={(e) => {
                                    setProduct({...product, visibility: e.target.value});
                                }} value={product.visibility}>
                                    <Radio value={0}> Hidden </Radio>
                                    <Radio value={1}> Visible </Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Form>
                    </div>
                    <Divider></Divider>
                    <div className="submit-btn-div" style={{marginBottom: "20px", marginRight: "50px"}}>
                        {/*<a id="cancel-btn" className="btn btn-light" href="/productsV2" role="button">Cancel</a>*/}
                        <Button id="cancel-btn" htmlType="button" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <div style={{margin: "10px"}}></div>
                        <Button id="submit-btn" htmlType="submit" type="submit" type="primary" onClick={handleSubmit}>
                            Save
                        </Button>
                    </div>
                </div>
                {/*</Skeleton>*/}
            </div>
        </div>
    )
}

export default ProductFormV2;
