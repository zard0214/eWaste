import React from "react";
import {useState, useEffect} from "react";
import AppNavigation from "../common/AppNavigation";
import {Table, Button, Watermark} from 'antd';
import './Components.css'
import {PlusOutlined} from "@ant-design/icons";
import {NavLink} from 'react-router-dom';
import {getSeries} from "../util/APIUtils";
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

const SeriesMgmt = () => {
    const [productData, setProductData] = useState([]);
    const [brandFilters, setBrandFilters] = useState([]);
    const [modelFilters, setModelFilters] = useState([]);

    useEffect(() => {
        const fetchProducts = () => {
            getSeries().then(response => {
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
                    <p style={{fontSize: "30px"}}>Series</p>
                    <a href="/series/new">
                    <Button type="primary" style={{margin: "15px"}}>New Series <PlusOutlined/></Button>
                    </a>
                </div>
                <Table dataSource={productData} rowKey="id" scroll={{x: "max-content"}}
                       rowClassName={rowClassName}
                       bordered
                       footer={() => ''}
                >
                    <Column title="Series ID" dataIndex="id" key="id"
                            fixed="left"
                            sorter={(a, b) => a.id - b.id}
                    />
                    <Column title="Brand Name" dataIndex="brandName" key="brandName"
                        // filters={brandFilters} filterSearch="true"
                            onFilter={(value, record) => record.brandName.startsWith(value)}
                    />

                    <Column title="Name" dataIndex="name" key="name"
                        // filters={brandFilters} filterSearch="true"
                            onFilter={(value, record) => record.name.startsWith(value)}
                    />

                    <Column
                        title=" "
                        key="action"
                        fixed="right"
                        render={(value, record) => (
                            <NavLink to={{
                                pathname: `/series/${record.id}`,
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

export default SeriesMgmt;
