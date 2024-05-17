import React, {useState, useEffect} from 'react';
import CurrencyInput from 'react-currency-input-field';
import Alert from "react-s-alert";
import {
    getBrands,
    getProductV2ById,
    getSeries, getUserById,
    updateProductV2, updateUser, updateUserV2, upgradeUserToStaff,
    uploadFile
} from "../util/APIUtils";
import AppNavigation from "../common/AppNavigation";
import {Form, Input, Select, Radio, InputNumber, Image, Upload, Button, Divider} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { capacityOptions, classification, colour, condition, deviceTypes} from "../util/ProductOptions";

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
            getUserById(productId.id)
                .then(response => {

                    console.log(response.result)
                    setProduct(response.result);
                    setRequired(response.result.classification !== 'unknown')
                    // setIsLoading(true);
                })
                .catch(error => {
                    Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
                    // setIsLoading(true);
                });
        };

        // Destructure props.location to access state
        const {state} = props.location;

        if (state !== undefined) {
            const id = state.id;
            fetchProductByID(id);
        }
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
        console.log(product)
        let submitBtn = document.getElementById("submit-btn");
        let cancelBtn = document.getElementById("cancel-btn");
        let upgradeBtn = document.getElementById("upgrade-btn");
        submitBtn.disabled = true;
        cancelBtn.disabled = true;
        upgradeBtn.disabled = true;
        updateUserV2(product)
            .then(() => {
                Alert.success("User updated successfully");
                props.history.push("/users")
            })
            .catch(error => {
                submitBtn.disabled = false;
                cancelBtn.disabled = false;
                upgradeBtn.disabled = false;
                Alert.error("Failed to update user");
            });
    };
    const handleUpgrade = (e) => {
        console.log(product)
        let submitBtn = document.getElementById("submit-btn");
        let cancelBtn = document.getElementById("cancel-btn");
        let upgradeBtn = document.getElementById("upgrade-btn");
        submitBtn.disabled = true;
        cancelBtn.disabled = true;
        upgradeBtn.disabled = true;
        upgradeUserToStaff(product)
            .then(() => {
                Alert.success("User updated successfully");
                props.history.push("/users")
            })
            .catch(error => {
                submitBtn.disabled = false;
                cancelBtn.disabled = false;
                upgradeBtn.disabled = false;
                Alert.error("Failed to update user");
            });
    };
    // const handleDowngrade = (e) => {
    //     console.log(product)
    //     let submitBtn = document.getElementById("submit-btn");
    //     let cancelBtn = document.getElementById("cancel-btn");
    //     let upgradeBtn = document.getElementById("upgrade-btn");
    //     let downgradeBtn = document.getElementById("downgrade-btn");
    //     submitBtn.disabled = true;
    //     cancelBtn.disabled = true;
    //     upgradeBtn.disabled = true;
    //     downgradeBtn.disabled = true;
    //     handleDowngrade(product)
    //         .then(() => {
    //             Alert.success("User updated successfully");
    //             props.history.push("/users")
    //         })
    //         .catch(error => {
    //             submitBtn.disabled = false;
    //             cancelBtn.disabled = false;
    //             upgradeBtn.disabled = false;
    //             downgradeBtn.disabled = false;
    //             Alert.error("Failed to update user");
    //         });
    // };

    const handleCancle = (e) => {
        console.log(e);
        // <a href="/productsV2"></a>
        window.location.href='/users';
    };

    return (
        <div>
            <AppNavigation/>
            <div className="content-container">
            <div className="card">
                {/*<Skeleton>*/}
                <h2 className="form-title">{state === undefined ? "New User Details" : `User ID: ${product.id} Details`}</h2>
                <Divider></Divider>
                <div className="form-container">
                    <Form labelCol={{span: 4}} wrapperCol={{span: 17}} layout="horizontal" filled>
                        <Form.Item label="Login Name" className="form-item">
                            <Input name="loginName" value={product.loginName} disabled={true}
                                   style={{color: "#000000"}} rows={4}/>
                        </Form.Item>
                        <Form.Item label="User Name" className="form-item">
                            <Input name="userName" value={product.userName}
                                   onChange={(e) => handleChange(e)}
                                   rows={4}/>
                        </Form.Item>
                        <Form.Item label="Email" className="form-item">
                            <Input name="email" value={product.email} disabled={true}
                                   style={{color: "#000000"}} rows={4}/>
                        </Form.Item>
                        <Form.Item label="Phone" className="form-item">
                            <Input name="phone" value={product.phone}
                                   onChange={(e) => handleChange(e)}
                                   rows={4}/>
                        </Form.Item>
                        <Form.Item label="Registed From" className="form-item">
                            <Input name="provider" value={product.provider} disabled={true}
                                   style={{color: "#000000"}}  rows={4}/>
                        </Form.Item>
                        <Form.Item required={true} label="Avatar">
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
                        <Form.Item label="Gender">
                            <Radio.Group onChange={(e) => {
                                setProduct({...product, gender: e.target.value});
                            }} value={product.gender}>
                                <Radio value={0}> Male </Radio>
                                <Radio value={1}> Female </Radio>
                                <Radio value={2}> Prefer Not 2 Say </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </div>
                <Divider></Divider>
                <div className="submit-btn-div" style={{marginBottom: "20px", marginRight: "50px"}}>
                    {/*<a id="cancel-btn" className="btn btn-light" href="/productsV2" role="button">Cancel</a>*/}
                    <Button id="cancel-btn" htmlType="button" onClick={handleCancle}>
                        Cancel
                    </Button>
                    <div style={{margin: "10px"}}></div>

                    <div>
                        {
                        product.loginName == "admin" ? (
                            <Button id="upgrade-btn" htmlType="submit" type="primary" disabled={true} onClick={handleUpgrade}>
                            Upgrade
                            </Button>
                        ) : (
                            <Button id="upgrade-btn" htmlType="submit" type="primary" onClick={handleUpgrade}>
                            Upgrade
                            </Button>
                    )
                        }
                    </div>
                    <div style={{margin: "10px"}}></div>
                    <Button id="submit-btn" htmlType="submit" type="submit" className="btn-primary" onClick={handleSubmit}>
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
