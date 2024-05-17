import React, { Component, useState, useEffect, useRef } from 'react';
import AppNavigation from '../common/AppNavigation';
import './Home.css';
import * as echarts from 'echarts';
import {getNumberofUserPerRole, getAllOrders, getTotalStaffAndRegisteredUserCount} from '../util/APIUtils';
import Alert from "react-s-alert";
import {Row, Col, Card, Divider, Table, Button} from "antd";
import { NavLink } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DownloadOutlined } from '@ant-design/icons';

const {Column} = Table;

const Home = (props) => {
    const chartRef = useRef();
    const orderChartRef = useRef();
    const contentContainerRef = useRef();
    let chart = useRef(null);
    let orderChart = useRef(null);
    const [chartData, setChartData] = useState([]);
    const [ordersData, setOrdersData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [currentUserOrders, setCurrentUserOrders] = useState([]);

    useEffect(() => {
        const getUserCountPerRole = () => {
            getNumberofUserPerRole()
            .then(response => {
                const roledata = response.result;
                setChartData(roledata);
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            })
        }
        const fetchOrders = () => {
            getAllOrders().then(response => {
                setOrdersData(response.result);
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
        }
        const fetchUserData = () => {
            getTotalStaffAndRegisteredUserCount()
            .then(response => {
                setUserData(response.result);
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            })
        }
        fetchUserData();
        fetchOrders();
        getUserCountPerRole();
        return () => {
            if (chart && chart.dispose){
                chart.dispose();
            }
        };
    }, []);

    useEffect(() => {
        if (ordersData.length > 0) {
            // Filtering based on current user and if the order is not completed
            const filteredOrders = ordersData.filter(order => order.lastOperator === props.currentUser.userName && order.status != 50);
            setCurrentUserOrders(filteredOrders);
        }
    }, [ordersData, props.currentUser]);

    useEffect(() => {
        if(chartData.length > 0){
            const options = {
                title: {
                    text: "Role distribution"
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Different Roles'],
                    show: true
                },
                xAxis: {
                    type: 'category',
                    data: ['User', 'Staff', 'Admin']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: chartData,
                    type: 'bar',
                    name: 'users'
                }]
            };

            const chart = echarts.init(chartRef.current);
            chart.setOption(options);
        }
    }, [chartData]);


    useEffect(() => {
        if (ordersData.length > 0) {
            const orderTypeDistribution = ordersData.reduce((acc, order) => {
                if (order.orderType === 1) {
                    acc.recycle++;
                } else if (order.orderType === 2) {
                    acc.dataRetrieval++;
                } else if (order.orderType === 3) {
                    acc.purchase++;
                }
                return acc;
            }, { recycle: 0, dataRetrieval: 0 , purchase: 0 });

            const orderOptions = {
                title: {
                    // text: "Order Type Distribution"
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['Recycle', 'Data Retrieval', 'Purchase']
                },
                series: [
                    {
                        name: 'Order Type Distribution',
                        type: 'pie',
                        radius: '50%',
                        center: ['50%', '60%'],
                        data: [
                            { value: orderTypeDistribution.recycle, name: 'Recycle' },
                            { value: orderTypeDistribution.dataRetrieval, name: 'Data Retrieval' },
                            { value: orderTypeDistribution.purchase, name: 'Purchase' }
                        ]
                    }
                ]
            };

            orderChart = echarts.init(orderChartRef.current);
            orderChart.setOption(orderOptions);
        }
    },[ordersData]);

    const handleDownloadPDF = () => {
        const contentContainer = contentContainerRef.current;
        html2canvas(contentContainer).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg');
            const pdf = new jsPDF('l', 'mm', 'a4');
            const imgWidth = 297;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
            pdf.save("dashboard-report.pdf");
        });
    };

    // Total number of orders
    const totalOrders = ordersData.length;

    // Filtering orders with status '50' (completed orders)
    const completedOrders = ordersData.filter(order => order.status === 50).length;

    // Recent orders with status '0' (recent orders)
    const recentOrders = ordersData.filter(order => order.status === 0).length;

    return (
        <div>
            <AppNavigation />
            <div className="content-container">
                <div className="table-title">
                    <p style={{fontSize: "30px"}}>Homepage</p>
                    <div style={{textAlign: 'right', marginTop: '7px'}}>
                        <Button onClick={handleDownloadPDF} type="primary" icon={<DownloadOutlined/>}
                                style={{fontSize: '15px', height: '35px', width: '220px'}}>Download Report as
                            PDF</Button>
                    </div>
                </div>

                <div ref={contentContainerRef}>
                    <Row gutter={24}>
                        <Col span={4}>
                            <Card title="Total Orders" bordered={false}>
                                <p>{totalOrders}</p>
                            </Card>
                        </Col>
                        <Col span={4}>
                        <Card title="Completed Orders" bordered={false}>
                            <p>{completedOrders}</p>
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card title="Unassigned Orders" bordered={false}>
                            <p>{recentOrders}</p>
                        </Card>
                    </Col>
                    {Object.entries(userData).map(([key, value]) => (
                        <Col key={key} span={4}>
                            <Card title={key} bordered={false}>
                                <p>{value}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Divider></Divider>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Card title="User Role Distribution" bordered={false}>
                                <div style={{ width: "100%", height: "300px" }} ref={chartRef}></div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Order Type Distribution" bordered={false}>
                                <div style={{ width: "100%", height: "300px" }} ref={orderChartRef}></div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Orders Assigned to Me" bordered={false}>
                                <Table dataSource={currentUserOrders} rowKey="id" scroll={{x: "max-content"}} pagination={{ pageSize: 4 }} bordered footer={() => ''}>
                                    <Column title="Order ID" fixed="left" dataIndex="id" key="id"/>
                                    <Column title="Product Name" dataIndex="productName" key="productName" render={currentUserOrders.productName}/>
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
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default Home;
