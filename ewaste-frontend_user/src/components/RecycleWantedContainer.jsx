import PopularCategory from "./PopularCategory";
import React, { useState } from 'react';
import Re_PopularCategory from "./Re-PopularCategory";

export default function RecycleWantedContainer(props){
    const { popularData } = props;

    return (
        <section className="container-fluid py-5">
            <h1 className="text-center mb-5">Most Wanted</h1>
            <Re_PopularCategory popularData={popularData}/>
        </section>
    )
}
