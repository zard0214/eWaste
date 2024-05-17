import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import HomepageContainer from "../components/HomepageContainer";
import PopularContainer2 from "../components/PopularContainer2";
import Footer from "../components/Footer";
import axios from 'axios';
import {getAllProductV24Sell} from "../util/APIUtils";

const Homepage = () => {

    const [products, setProducts] = useState([]);

    // 在组件挂载时从本地存储中读取数据
    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products'));
        if (storedProducts) {
            setProducts(storedProducts);
        }
    }, []);

    // 在组件卸载前将数据保存到本地存储中
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await getAllProductV24Sell();
                setProducts(response.result);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);


    return (
        <div>
            <Header />
            <HomepageContainer />
            <PopularContainer2 popularData={products}/>
            <Footer />
        </div>
    );
}

export default Homepage
