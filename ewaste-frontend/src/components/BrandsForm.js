import React, {useState, useEffect} from 'react';
import Alert from "react-s-alert";
import {
    getBrandById,
    getBrands, getProductV2,
    saveBrands, updateBrands,
    uploadFile
} from "../util/APIUtils";
import AppNavigation from "../common/AppNavigation";
import {Form, Input, Radio, Image, Button, Divider, AutoComplete} from "antd";

const BrandsForm = (props) => {
    const [brand, setBrand] = useState({});
    const [brands, setBrandData] = useState([]);
    const [userBrands, setUserBrands] = useState([]);

    useEffect(() => {
        //Fetch Brand data from DB
        const fetchBrandByID = (id) => {
            getBrandById(id)
                .then(response => {
                    setBrand(response.result);
                    fetchBrands();
                })
                .catch(error => {
                    Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
                });
        };

        const fetchBrands = () => {
            getBrands().then(response => {
                if(response.result) {
                    const tempFilter = [];
                    response.result.forEach(brand => {
                        if (!tempFilter.some(filter => filter.value === brand.name)) {
                            tempFilter.push(brand.name)
                        }
                    })
                    if (tempFilter) {
                        setBrandData(tempFilter);
                    }
                    fetchProducts(tempFilter);
                }
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
        }

        const fetchProducts = (brandList) => {
            getProductV2().then(response => {
                if(response.result){
                    const tempFilter = [];
                    response.result.forEach(product => {
                        if(product.description && product.description.includes(":")){
                            const brandP = product.description.split(":")[0];
                            console.log(brandList)
                            if (!tempFilter.some(filter => filter.value === brandP) && !brandList.includes(brandP)) {
                                tempFilter.push({
                                    label: brandP,
                                    value: brandP
                                })
                            }
                        }
                    })
                    if(tempFilter){
                        setUserBrands(tempFilter);
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
            fetchBrandByID(id);
        }else{
            fetchBrands();
        }
    }, [props.location]);

    const handleDataUpload = (e) => {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file, 'file.png');

        uploadFile(formData)
            .then((response) => {
                console.log('Uploaded data result:', response.result);
                brand.imageUrl = response.result
                setBrand({...brand, imageUrl: response.result});
                console.log('Uploaded data result:', brand.imageUrl);
            }).catch((error) => {
            console.error('Upload failed:', error);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBrand({...brand, [name]: value});
    };

    const state = props.location.state;

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitBtn = document.getElementById("submit-btn");
        let cancelBtn = document.getElementById("cancel-btn");
        submitBtn.disabled = true;
        cancelBtn.disabled = true;

        if (brand.id) {
            updateBrands(brand)
                .then(() => {
                    Alert.success("Brand updated successfully");
                    props.history.push("/brands")
                })
                .catch(error => {
                    submitBtn.disabled = false;
                    cancelBtn.disabled = false;
                    Alert.error("Failed to update brand");
                });
        }else {
            saveBrands(brand)
                .then(() => {
                    Alert.success("Brand inserted successfully");
                    props.history.push("/brands")
                })
                .catch(error => {
                    submitBtn.disabled = false;
                    cancelBtn.disabled = false;
                    Alert.error("Failed to insert brand");
                });
        }

    };
    const handleCancel = (e) => {
        e.preventDefault();
        window.location.href='/brands';
    };

    return (
        <div>
            <AppNavigation/>
            <div className="content-container">
                <div className="card">
                    {/*<Skeleton>*/}
                    <h2 className="form-title">{state === undefined ? "New Brand Details" : `Brand ID: ${brand.id} Details`}</h2>
                    <Divider></Divider>
                    <div className="form-container">
                        <Form labelCol={{span: 4}} wrapperCol={{span: 17}} layout="horizontal" filled>
                            {brand.id ?
                                <Form.Item required={true} label="Name">
                                    <Input name="name" value={brand.name}
                                           onChange={(e) => handleChange(e)}
                                           rows={4}/>
                                </Form.Item>
                                :
                                <Form.Item label="Brand" className="form-item" required={true}>
                                    <AutoComplete
                                        options={userBrands}
                                        onChange={(value) => {
                                            setBrand({...brand, name: value});
                                        }}
                                        value={brand.name}
                                    />
                                </Form.Item>
                            }
                            <Form.Item required={true} label="Brand Image">
                                <div>
                                    <Image
                                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                                        width={200}
                                        height={200}
                                        src={brand.imageUrl}
                                    />
                                    <Input style={{marginTop: "10px", marginRight: "50px", border: "0px"}} type="file" name="dataUrl"
                                           onChange={handleDataUpload}
                                    />
                                </div>
                            </Form.Item>
                            <Form.Item required={true} label="Value">
                                <Radio.Group onChange={(e) => {
                                    setBrand({...brand, value: e.target.value});
                                }} value={brand.value}>
                                    <Radio value={0}> High </Radio>
                                    <Radio value={1}> Medium </Radio>
                                    <Radio value={2}> Low </Radio>
                                </Radio.Group>
                                {/*<FieldLabel disabled={true} name="name" value="(Caluculate the Device Value)"*/}
                                {/*       rows={4}/>*/}
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

export default BrandsForm;
