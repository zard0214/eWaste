import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import HomepageContainer from "../components/HomepageContainer";
import PopularContainer from "../components/PopularContainer";
import Footer from "../components/Footer";
import axios from 'axios';
import Re_HomepageContainer from "../components/Re-HomepageContainer";
import Re_Header from "../components/Re-Header";
import RecycleWantedContainer from "../components/RecycleWantedContainer";
import {getAllSeries} from "../util/APIUtils";

const RecycleHomepage = () => {

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
                const response = await getAllSeries();
                const sortedProducts = response.result.sort((a, b) => (b.expectedValue * b.value) - (a.expectedValue * a.value)).slice(0, 4);
                setProducts(sortedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);


    return (
        <div>
            <Re_Header/>
            <Re_HomepageContainer />
            <RecycleWantedContainer popularData={products}/>
            <Footer />
        </div>
    );
}

export default RecycleHomepage
