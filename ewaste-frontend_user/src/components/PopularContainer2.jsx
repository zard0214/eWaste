import PopularCategory2 from "./PopularCategory2";
import React, { useState } from 'react';

export default function PopularContainer2(props){
    const { popularData } = props;

    return (
        <section className="container-fluid py-5">
            <h1 className="text-center mb-5">Most Popular</h1>
            <PopularCategory2 popularData={popularData}/>
        </section>
    )
}
