import Header from "../components/Header";
import Payment from "../components/Payment";
import SearchBar from "../components/SearchBar";
import {useLocation, useParams} from "react-router-dom";
import {useEffect} from "react";
import ProductContainer from "../components/ProductContainer";
import React, { useState } from 'react';
import Re_ProductContainer from "../components/Re-ProductContainer";
import Re_Header from "../components/Re-Header";
import Re_SearchBar from "../components/Re-SearchBar";

const Re_SearchResult = ()=>{

    const searchParams = new URLSearchParams(window.location.search);
    const encodedData = JSON.parse(searchParams.get('searchData'));

    console.log("Search data: ", encodedData);

    return(
        <div>
            <Re_Header/>
            <section className="container-fluid recycle-bg-color">
                <Re_SearchBar></Re_SearchBar>
            </section>
            <Re_ProductContainer productData={encodedData}/>
        </div>
    );
}

export default Re_SearchResult
