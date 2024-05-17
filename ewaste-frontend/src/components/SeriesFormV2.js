import React, {useState, useEffect} from 'react';
import CurrencyInput from 'react-currency-input-field';
import Alert from "react-s-alert";
import {
    getBrands, getProductV2,
    getSeries, getSeriesById, saveSeries,
    updateSeries,
    uploadFile
} from "../util/APIUtils";
import AppNavigation from "../common/AppNavigation";
import {Form, Input, Select, Radio, InputNumber, Image, Upload, Button, Divider, AutoComplete} from "antd";

const SeriesFormV2 = (props) => {
    const [product, setProduct] = useState({});
    const [brands, setBrandData] = useState([]);
    const [series, setSeriesData] = useState([]);
    const [userSeries, setUserSeries] = useState([]);

    useEffect(() => {
        //Fetch Product data from DB
        const fetchSeriesByID = (id) => {
            getSeriesById(id)
                .then(response => {
                    console.log(response.result)
                    setProduct(response.result);
                    fetchBrands();
                })
                .catch(error => {
                    Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
                });
        };

        const fetchSeries = () => {
            getSeries().then(response => {
                if(response.result) {
                    const tempFilter = [];
                    response.result.forEach(series => {
                        if (!tempFilter.some(filter => filter.value === series.name)) {
                            tempFilter.push(series.name)
                        }
                    })
                    if (tempFilter) {
                        setSeriesData(tempFilter);
                    }
                    fetchProducts(tempFilter);
                }
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
        }

        const fetchBrands = () => {
            getBrands().then(response => {
                if(response.result) {
                    const tempFilter = [{}];
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

        const fetchProducts = (seriesList) => {
            getProductV2().then(response => {
                if(response.result){
                    const tempFilter = [];
                    response.result.forEach(product => {
                        if(product.description && product.description.includes(":")){
                            const seriesP = product.description.split(":")[1];
                            if (!tempFilter.some(filter => filter.value === seriesP) && !seriesList.includes(seriesP)) {
                                tempFilter.push({
                                    label: seriesP,
                                    value: seriesP
                                })
                            }
                        }
                    })
                    if(tempFilter){
                        setUserSeries(tempFilter);
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
            fetchSeriesByID(id);
        }else{
            fetchSeries();
        }
        fetchBrands();
    }, [props.location]);

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

    const state = props.location.state;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product)
        let submitBtn = document.getElementById("submit-btn");
        let cancelBtn = document.getElementById("cancel-btn");
        submitBtn.disabled = true;
        cancelBtn.disabled = true;

        if (product.id) {
            updateSeries(product)
                .then(() => {
                    Alert.success("Series updated successfully");
                    props.history.push("/series")
                })
                .catch(error => {
                    submitBtn.disabled = false;
                    cancelBtn.disabled = false;
                    Alert.error("Failed to update series");
                });
        }else {
            saveSeries(product)
                .then(() => {
                    Alert.success("Series insert successfully");
                    props.history.push("/series")
                })
                .catch(error => {
                    submitBtn.disabled = false;
                    cancelBtn.disabled = false;
                    Alert.error("Failed to insert series");
                });
        }


    };
    const handleCancel = (e) => {
        e.preventDefault();
        window.location.href='/series';
    };

    return (
        <div>
            <AppNavigation/>
            <div className="content-container">
            <div className="card">
                {/*<Skeleton>*/}
                <h2 className="form-title">{state === undefined ? "New Series Details" : `Series ID: ${product.id} Details`}</h2>
                <Divider></Divider>
                <div className="form-container">
                    <Form labelCol={{span: 4}} wrapperCol={{span: 17}} layout="horizontal" filled>
                        <Form.Item  required={true} label="Brand" className="form-item">
                            <Select onChange={(value) => {
                                setProduct({...product, brandId: value});
                            }} value={product.brandId} options={brands}/>
                        </Form.Item>
                        {product.id ?
                            <Form.Item label="Series Name" className="form-item" required={true}>
                                <Input name="name" value={product.name}
                                       onChange={(e) => handleChange(e)}
                                />
                            </Form.Item>
                            :
                            <Form.Item label="Series Name" className="form-item" required={true}>
                                <AutoComplete
                                    options={userSeries}
                                    onChange={(value) => {
                                        setProduct({...product, name: value});
                                    }}
                                    value={product.name}
                                />
                            </Form.Item>
                        }

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

                        <Form.Item required={true} label="Series Image">
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
                        <Form.Item required={true} label="Value">
                            <Radio.Group onChange={(e) => {
                                setProduct({...product, value: e.target.value});
                            }} value={product.value}>
                                <Radio value={0}> High </Radio>
                                <Radio value={1}> Medium </Radio>
                                <Radio value={2}> Low </Radio>
                            </Radio.Group>
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
                {/*</Skeleton>*/}
            </div>
        </div>
    )
}

export default SeriesFormV2;
