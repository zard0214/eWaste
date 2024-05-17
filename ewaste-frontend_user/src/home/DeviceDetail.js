import React from 'react';
import Header from "../components/Header";
import Details from "../components/Details";
import Footer from "../components/Footer";

const DeviceDetail = () => {

    const searchParams = new URLSearchParams(window.location.search);
    const encodedData = JSON.parse(searchParams.get('productData'));

    console.log("Search data: ", encodedData);

    return (
        <div>
            <Header/>
            <Details product={encodedData}/>
            <Footer/>
            {/* 其他页面内容 */}
        </div>
    );
}
export default DeviceDetail;