import Header from "../components/Header";
import Payment from "../components/Payment";
import SearchBar from "../components/SearchBar";
import {useLocation, useParams} from "react-router-dom";
import {useEffect} from "react";
import ProductContainer from "../components/ProductContainer";
import React, { useState } from 'react';

const SearchResult = ()=>{

    const searchParams = new URLSearchParams(window.location.search);
    const encodedData = JSON.parse(searchParams.get('searchData'));

    console.log("Search data: ", encodedData);

    return(
        <div>
            <Header/>
            <section className="container-fluid custom-bg-color">
                <SearchBar></SearchBar>
            </section>
            <ProductContainer productData={encodedData}/>
        </div>
    );
}

export default SearchResult
