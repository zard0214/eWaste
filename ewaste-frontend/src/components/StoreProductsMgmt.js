import React from "react";
import {useState, useEffect} from "react";
import AppNavigation from "../common/AppNavigation";
import {Button, Table, Watermark} from 'antd';
import './Components.css'
import {PlusOutlined} from "@ant-design/icons";
import {NavLink} from 'react-router-dom';
import {getSeries, getStoresProductV2} from "../util/APIUtils";
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

const StoreProductsMgmt = () => {
    const [productData, setProductData] = useState([]);
    const [brandFilters, setBrandFilters] = useState([]);
    const [modelFilters, setModelFilters] = useState([]);

    useEffect(() => {
        const fetchProducts = () => {
            getStoresProductV2().then(response => {
                const products = priorUnknown(response.result)
                setProductData(products);

                if(response.result){
                    const tempBFilter = [];
                    const tempMFilter = [];
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
                    })
                    if(tempBFilter){
                        setBrandFilters(tempBFilter);
                    }
                    if(tempMFilter){
                        setModelFilters(tempMFilter);
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
            <Watermark className="content-container" content={['']}>
                <div className="table-title">
                    <p style={{fontSize: "30px"}}>Store Product</p>
                    <a href="/storesProducts/new">
                        <Button type="primary" style={{margin: "15px"}}>New Store Product <PlusOutlined/></Button>
                    </a>
                </div>
                <Table dataSource={productData} rowKey="id" scroll={{x: "max-content"}}
                       rowClassName={rowClassName}
                       bordered
                       footer={() => ''}
                >
                    <Column title="Store Product ID" dataIndex="id" key="id"
                            fixed="left"
                            sorter={(a, b) => a.id - b.id}
                    />
                    <Column title="Store Name" dataIndex="storeName" key="storeName"
                        // filters={brandFilters} filterSearch="true"
                            onFilter={(value, record) => record.storeName.startsWith(value)}
                    />
                    <Column title="Brand Name" dataIndex="brandName" key="brandName"
                        // filters={brandFilters} filterSearch="true"
                            onFilter={(value, record) => record.brandName.startsWith(value)}
                    />
                    <Column title="Series Name" dataIndex="seriesName" key="seriesName"
                        // filters={brandFilters} filterSearch="true"
                            onFilter={(value, record) => record.seriesName.startsWith(value)}
                    />

                    <Column
                        title=" "
                        key="action"
                        fixed="right"
                        render={(value, record) => (
                            <NavLink to={{
                                pathname: `/storesProducts/${record.id}`,
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

export default StoreProductsMgmt;
