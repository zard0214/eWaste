import Header from "../components/Header";
import Payment from "../components/Payment";
import SearchBar from "../components/SearchBar";
import React, { useState } from 'react';
import Footer from "../components/Footer";

const payment = ()=>{
    return(
        <div>
            <Header/>
            <Payment/>
        </div>
    );
}

export default payment
