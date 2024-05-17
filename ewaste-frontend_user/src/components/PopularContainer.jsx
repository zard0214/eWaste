import PopularCategory from "./PopularCategory";
import React, { useState } from 'react';

export default function PopularContainer(props){
    const { popularData } = props;

    return (
        <section className="container-fluid py-5">
            <h1 className="text-center mb-5">Most Popular</h1>
            <PopularCategory popularData={popularData}/>
        </section>
    )
}
