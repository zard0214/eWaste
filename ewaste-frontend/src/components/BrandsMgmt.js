import React from "react";
import {useState, useEffect} from "react";
import AppNavigation from "../common/AppNavigation";
import {Table, Button, Watermark} from 'antd';
import './Components.css'
import {PlusOutlined} from "@ant-design/icons";
import {NavLink} from 'react-router-dom';
import {getBrands} from "../util/APIUtils";
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

const BrandsMgmt = () => {
    const [brandData, setBrandData] = useState([]);
    const [brandFilters, setBrandFilters] = useState([]);
    const [modelFilters, setModelFilters] = useState([]);



    useEffect(() => {
        const fetchBrands = () => {
            getBrands().then(response => {
                setBrandData(response.result);
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
        }
        fetchBrands();
    }, []);

    const rowClassName = (record) => {
        return record.classification === 'unknown' ? 'unknown-row' : '';
    };

    return (
        <div>
            <AppNavigation/>
            <Watermark className="content-container" content={['']}>
                <div className="table-title">
                    <p style={{fontSize: "30px"}}>Brands</p>
                    <a href="/brands/new">
                        <Button type="primary" style={{margin: "15px"}}>New Brands <PlusOutlined/></Button>
                    </a>
                </div>
                <Table dataSource={brandData} rowKey="id" scroll={{x: "max-content"}}
                       rowClassName={rowClassName}
                       bordered
                       footer={() => ''}
                >
                    <Column title="Brand ID" dataIndex="id" key="id"
                            fixed="left"
                            sorter={(a, b) => a.id - b.id}
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
                                pathname: `/brands/${record.id}`,
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

export default BrandsMgmt;
