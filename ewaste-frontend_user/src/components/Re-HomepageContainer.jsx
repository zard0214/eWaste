import SearchBar from "./SearchBar";
import './HomepageContainer.css'
import Category from "./Category";
import React, { useState } from 'react';
import Re_SearchBar from "./Re-SearchBar";
import Re_Category from "./Re-Category";
export default function Re_HomepageContainer(){
    return (
        <section className="container-fluid py-5 recycle-bg-color">
            <h1 className="text-center display-1 text-white">Transforming E-Waste into E-Treasure</h1>
            <Re_SearchBar></Re_SearchBar>
            <Re_Category></Re_Category>
        </section>
    )
}
