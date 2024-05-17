import React from 'react';
import Header from "../components/Header";
import Details from "../components/Details";
import Footer from "../components/Footer";
import Re_ProductDetail from "../components/Re-Details";
import Re_Header from "../components/Re-Header";

const Re_DeviceDetail = () => {

    const searchParams = new URLSearchParams(window.location.search);
    const encodedData = JSON.parse(searchParams.get('productData'));

    console.log("Search data: ", encodedData);

    return (
        <div>
            <Re_Header/>
            <Re_ProductDetail product={encodedData}/>
            <Footer/>
        </div>
    );
}
export default Re_DeviceDetail;