import Header from "../components/Header";
import Payment from "../components/Payment";
import SearchBar from "../components/SearchBar";
import {useLocation, useParams} from "react-router-dom";
import {useEffect} from "react";
import ProductContainer from "../components/ProductContainer";
import React, { useState } from 'react';
import Re_Header from "../components/Re-Header";
import Re_ProductContainer from "../components/Re-ProductContainer";
import Re_SearchBar from "../components/Re-SearchBar";
import Re_Brands_Category from "../components/Re-Brands-Category";
import Footer from "../components/Footer";
const Re_Brands = ()=>{

    const searchParams = new URLSearchParams(window.location.search);
    const encodedData = JSON.parse(searchParams.get('productData'));

    console.log("Brands: ", encodedData);

    return(
        <div>
            <Re_Header/>
            <section className="container-fluid recycle-bg-color">
                <Re_SearchBar></Re_SearchBar>
            </section>
            <Re_Brands_Category productData={encodedData}/>
            <Footer/>
        </div>
    );
}

export default Re_Brands
