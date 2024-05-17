import React, { useState, useEffect } from "react";
import AppNavigation from "../common/AppNavigation";
import {Table, Watermark} from 'antd';
import { getAllOrders } from "../util/APIUtils";
import Alert from "react-s-alert";
import { NavLink } from 'react-router-dom';
import {getOrderType, getState} from "../util/OrderStates";
import OrderStatusBadge from "../components/OrderStatusBadge"

const {Column} = Table;

const Orders = () => {
    const [ordersData, setOrdersData] = useState([]);
    const [opFilters, setOpFilters] = useState([]);

    useEffect(() => {
        const fetchOrders = () => {
            getAllOrders().then(response => {
                console.log(response.result);
                setOrdersData(response.result);

                if(response.result){
                    const tempFilter = [];
                    response.result.forEach(order => {
                        if (!tempFilter.some(filter => filter.value === order.lastOperator)) {
                            tempFilter.push({
                                text: order.lastOperator,
                                value: order.lastOperator
                            })
                        }
                    })
                    if(tempFilter){
                        setOpFilters(tempFilter);
                    }
                }
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
        }
        fetchOrders();
    }, []);

    return (
        <div>
            <AppNavigation/>
            <Watermark className="content-container" content={['']}>
                <div className="table-title">
                    <p style={{fontSize: "30px"}}>Orders</p>
                </div>
                <Table dataSource={ordersData}
                       rowKey="id"
                       bordered
                       footer={() => ''}
                       scroll={{ x: true}}
                >
                    <Column title="Order ID" fixed="left" dataIndex="id" key="id" sorter={(a, b) => a.id - b.id}/>
                    <Column title="Product Name" dataIndex="productName" key="productName" render={ordersData.productName}/>
                    <Column title="Receiver Name" dataIndex="receiverName" key="receiverName" render={ordersData.receiverName}/>
                    <Column title="Order type" dataIndex="orderType" key="orderType"
                            render={(value) =>  getOrderType(value)}
                    />
                    <Column title="Recycle Party" dataIndex="thirdParty" key="thirdParty" render={ordersData.thirdParty}/>
                    <Column width="180px" title="Status" dataIndex="status" key="status" render={(status) => <OrderStatusBadge status={getState(status)}></OrderStatusBadge>}/>
                    <Column width="140px" title="Created At" dataIndex="gmtCreated" key="gmtCreated" sorter={(a, b) => new Date(a.gmtCreated) - new Date(b.gmtCreated)}
                            render={ordersData.gmtCreated}
                    />

                    <Column width="140px" title="Last Modified" dataIndex="gmtModified" key="gmtModified" sorter={(a, b) => new Date(a.gmtModified) - new Date(b.gmtModified)}
                            render={ordersData.gmtModified}
                    />
                    <Column width="140px" title="Last Operator" dataIndex="lastOperator" key="lastOperator"
                            filters={opFilters} filterSearch="true"
                            onFilter={(value, record) => record.lastOperator.startsWith(value)}
                    />
                    <Column title=" " key="action" fixed="right"
                        render={(value, record) => (
                            <NavLink to={{
                                        pathname: `/orders/${record.id}`,
                                        state: {id: record.id}
                                    }}
                                     style={{ textDecoration: "underline" }}
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

export default Orders;
