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
import {getAllProductV24Sell} from "../util/APIUtils";

const Menu = ()=>{

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await getAllProductV24Sell();
                console.log(response)
                setProducts(response.result);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);

    return(
        <div>
            <Header/>
            <section className="container-fluid custom-bg-color">
                <SearchBar></SearchBar>
            </section>
            <ProductContainer productData={products}/>
            <Footer/>
        </div>
    );
}

export default Menu
