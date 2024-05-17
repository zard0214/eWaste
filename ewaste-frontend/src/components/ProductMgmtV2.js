import React from "react";
import {useState, useEffect} from "react";
import AppNavigation from "../common/AppNavigation";
import {Table, Watermark} from 'antd';
import './Components.css'
import {PlusOutlined} from "@ant-design/icons";
import {NavLink} from 'react-router-dom';
import {getBrands, getProductV2} from "../util/APIUtils";
import Alert from "react-s-alert";
import { capacityOptions, classification, colour, condition, deviceTypes} from "../util/ProductOptions";

const Visibility = {
    Hidden: { state: "Hidden", code: 0 },
    Visibility: { state: "Visible", code: 1 }
};

const {Column} = Table;

export const getVisibility = (code) => {
    for (const key in Visibility) {
        if (Visibility[key].code === code) {
            return Visibility[key].state;
        }
    }
    return null;
};

const priorUnknown = (prod) => {
    console.log(prod);
    return [...prod].sort((a, b) => {
        if (a.classification === 4 && b.classification !== 4) {
            return -1;
        } else if (b.classification === 4 && a.classification !== 4) {
            return 1;
        } else {
            return 0;
        }
    });
}

const ProductMgmtV2 = () => {
    const [productData, setProductData] = useState([]);
    const [brandFilters, setBrandFilters] = useState([]);
    const [seriesFilters, setSeriesFilters] = useState([]);
    const [visibilityFilters, setVFilters] = useState([]);

    useEffect(() => {
        const fetchProducts = () => {
            getProductV2().then(response => {
                const products = priorUnknown(response.result)
                setProductData(products);

                if(response.result){
                    const tempBFilter = [];
                    const tempSFilter = [];
                    const tempVFilter = [];
                    response.result.forEach(product => {
                        if (!tempBFilter.some(filter => filter.value === product.brandName)) {
                            tempBFilter.push({
                                text: product.brandName,
                                value: product.brandName
                            })
                        }
                        if (!tempSFilter.some(filter => filter.value === product.seriesName)) {
                            tempSFilter.push({
                                text: product.seriesName,
                                value: product.seriesName
                            })
                        }
                        if (!tempVFilter.some(filter => filter.value === product.visibility)) {
                            tempVFilter.push({
                                text: getVisibility(product.visibility),
                                value: product.visibility
                            })
                        }
                    })
                    if(tempBFilter){
                        setBrandFilters(tempBFilter);
                    }
                    if(tempSFilter){
                        setSeriesFilters(tempSFilter);
                    }
                    if(tempVFilter){
                        setVFilters(tempVFilter);
                    }
                }
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
        }
        fetchProducts();
    }, []);

    const rowClassName = (record) => {
        return record.classification === 4 ? 'unknown-row' : '';
    };

    return (
        <div>
            <AppNavigation/>
            <Watermark className="content-container" content={['']}>
                <div className="table-title">
                    <p style={{fontSize: "30px"}}>Product</p>
                    {/*<a href="/brands/new">*/}
                    {/*    <button type="button" className="btn add-btn">New Brands <PlusOutlined/></button>*/}
                    {/*</a>*/}
                </div>
                <Table dataSource={productData}
                       rowKey="id"
                       scroll={{x: "max-content"}}
                       rowClassName={rowClassName}
                       bordered
                       footer={() => ''}
                >
                    <Column title="Product ID" dataIndex="id" key="id"
                            fixed="left"
                            sorter={(a, b) => a.id - b.id}
                    />
                    <Column title="Brand Name" dataIndex="brandName" key="brandName"
                            filters={brandFilters} filterSearch="true"
                            onFilter={(value, record) => record.brandName.startsWith(value)}
                    />
                    <Column title="Series Name" dataIndex="seriesName" key="seriesName"
                            // filters={seriesFilters} filterSearch="true"
                            // onFilter={(value, record) => record.seriesName.startsWith(value)}
                    />
                    <Column title="Expected Value" dataIndex="expectedValue" key="expectedValue"
                            render={(value) =>  "￡" + value}
                            sorter={(a, b) => a.expectedValue - b.expectedValue}
                    />
                    <Column title="Visibility" dataIndex="visibility" key="visibility"
                            // filters={visibilityFilters} filterSearch="true"
                            // onFilter={(value, record) => record.visibility === value}
                            render={(value) =>  getVisibility(value)}
                    />
                    <Column
                        title=" "
                        key="action"
                        fixed="right"
                        render={(value, record) => (
                            <NavLink to={{
                                pathname: `/productsV2/${record.id}`,
                                state: {id: record.id}}}
                                     style={{textDecoration: "underline"}}
                            >
                                Edit
                            </NavLink>
                        )}
                    />
                </Table>
            </Watermark>
        </div>
    );
};

export default ProductMgmtV2;
