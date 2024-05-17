import Header from "../components/Header";
import List from "../components/List";
import img1 from "../img/laptop.png"
import ProductContainer from "../components/ProductContainer";
import SearchBar from "../components/SearchBar";
import Category from "../components/Category";
import {useEffect, useState} from "react";
import axios from "axios";
import React from 'react';
import Footer from "../components/Footer";
import Re_SearchBar from "../components/Re-SearchBar";
import Re_ProductContainer from "../components/Re-ProductContainer";
import {getAllSeries} from "../util/APIUtils";
import Re_Header from "../components/Re-Header";

const RecycleMenu = ()=>{

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await getAllSeries();
                setProducts(response.result);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);

    return(
        <div>
            <Re_Header/>
            <section className="container-fluid recycle-bg-color">
                <Re_SearchBar></Re_SearchBar>
            </section>
            <Re_ProductContainer productData={products}/>
            <Footer/>
        </div>
    );
}

export default RecycleMenu
