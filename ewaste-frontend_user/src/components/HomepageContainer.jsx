import SearchBar from "./SearchBar";
import './HomepageContainer.css'
import Category from "./Category";
import React, { useState } from 'react';
export default function HomepageContainer(){
    return (
        <section className="container-fluid py-5 custom-bg-color">
            <h1 className="text-center display-1 text-white">Find E-Treasure, Shop E-Waste</h1>
            <SearchBar></SearchBar>
            <Category></Category>
        </section>
    )
}
