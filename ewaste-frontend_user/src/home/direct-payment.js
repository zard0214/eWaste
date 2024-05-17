import Header from "../components/Header";
import Payment from "../components/Payment";
import SearchBar from "../components/SearchBar";
import React, { useState } from 'react';
import Footer from "../components/Footer";
import DirectPayment from "../components/Payment-direct";

const Direct_payment = ()=>{
    return(
        <div>
            <Header/>
            <DirectPayment/>
        </div>
    );
}

export default Direct_payment
