import React from "react";
import {useState, useEffect} from "react";
import AppNavigation from "../common/AppNavigation";
import {Table} from 'antd';
import './Components.css'
import {PlusOutlined} from "@ant-design/icons";
import {NavLink} from 'react-router-dom';
import {getProducts} from "../util/APIUtils";
import Alert from "react-s-alert";

const {Column} = Table;

const priorUnknown = (prod) => {
    console.log(prod);
    return [...prod].sort((a, b) => {
        if (a.classification === "unknown" && b.classification !== "unknown") {
            return -1;
        } else if (b.classification === "unknown" && a.classification !== "unknown") {
            return 1;
        } else {
            return 0;
        }
    });
}

const ProductsMgmt = () => {
    const [productData, setProductData] = useState([]);
    const [brandFilters, setBrandFilters] = useState([]);
    const [modelFilters, setModelFilters] = useState([]);
    const [conditionFilters, setConFilters] = useState([]);
    const [classFilters, setClassFilters] = useState([]);
    const [visibleFilters, setVisibleFilters] = useState([]);

    useEffect(() => {
        const fetchProducts = () => {
            getProducts().then(response => {
                const products = priorUnknown(response.result)
                setProductData(products);

                if(response.result){
                    const tempBFilter = [];
                    const tempMFilter = [];
                    const tempConFilter = [];
                    const tempClassFilter = [];
                    const tempVFilter = [];
                    response.result.forEach(product => {
                        if (!tempBFilter.some(filter => filter.value === product.brand)) {
                            tempBFilter.push({
                                text: product.brand,
                                value: product.brand
                            })
                        }
                        if (!tempMFilter.some(filter => filter.value === product.model)) {
                            tempMFilter.push({
                                text: product.model,
                                value: product.model
                            })
                        }
                        if (!tempConFilter.some(filter => filter.value === product.condition)) {
                            tempConFilter.push({
                                text: product.condition,
                                value: product.condition
                            })
                        }
                        if (!tempClassFilter.some(filter => filter.value === product.classification)) {
                            tempClassFilter.push({
                                text: product.classification,
                                value: product.classification
                            })
                        }
                        if (!tempVFilter.some(filter => filter.value === product.visibility)) {
                            tempVFilter.push({
                                text: product.visibility,
                                value: product.visibility
                            })
                        }
                    })
                    if(tempBFilter){
                        setBrandFilters(tempBFilter);
                    }
                    if(tempMFilter){
                        setModelFilters(tempMFilter);
                    }
                    if(tempConFilter){
                        setConFilters(tempConFilter);
                    }
                    if(tempClassFilter){
                        setClassFilters(tempClassFilter);
                    }
                    if(tempVFilter){
                        setVisibleFilters(tempVFilter);
                    }
                }
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
        }
        fetchProducts();
    }, []);

    const rowClassName = (record) => {
        return record.classification === 'unknown' ? 'unknown-row' : '';
    };

    return (
        <div>
            <AppNavigation/>
            <div className="content-container">
                <div className="table-title">
                    <p style={{fontSize: "30px"}}>Products</p>
                    {/*<a href="/products/new">*/}
                    {/*    <button type="button" className="btn add-btn">New Product <PlusOutlined/></button>*/}
                    {/*</a>*/}
                </div>
                <Table dataSource={productData} rowKey="productId" scroll={{x: "max-content"}}
                       rowClassName={rowClassName}
                >
                    <Column title="Product ID" dataIndex="productId" key="productId"
                            fixed="left"
                            sorter={(a, b) => a.productId - b.productId}
                    />
                    <Column title="Brand" dataIndex="brand" key="brand"
                            filters={brandFilters} filterSearch="true"
                            onFilter={(value, record) => record.brand.startsWith(value)}
                    />
                    <Column title="Model" dataIndex="model" key="model"
                            filters={modelFilters} filterSearch="true"
                            onFilter={(value, record) => record.model.startsWith(value)}
                    />
                    {/*<Column title="Year of release" dataIndex="yearOfRelease" key="yearOfRelease"/>*/}
                    <Column title="Condition" dataIndex="condition" key="condition"
                            filters={conditionFilters} filterSearch="true"
                            onFilter={(value, record) => record.condition.startsWith(value)}
                    />
                    <Column title="Classification" dataIndex="classification" key="classification"
                            filters={classFilters} filterSearch="true"
                            onFilter={(value, record) => record.classification.startsWith(value)}
                    />
                    <Column title="Visibility" dataIndex="visibility" key="visibility"
                            filters={visibleFilters} filterSearch="true"
                            onFilter={(value, record) => record.visibility.startsWith(value)}
                    />
                    <Column title="Expected Value" dataIndex="expectedValue" key="expectedValue"
                            sorter={(a, b) => a.expectedValue - b.expectedValue}
                    />
                    <Column
                        title=" "
                        key="action"
                        fixed="right"
                        render={(value, record) => (
                            <NavLink to={{
                                        pathname: `/products/${record.productId}`,
                                        state: {id: record.productId}}}
                                     style={{textDecoration: "underline"}}
                            >
                                Edit
                            </NavLink>
                        )}
                    />
                </Table>
            </div>
        </div>
    );
};

export default ProductsMgmt;
