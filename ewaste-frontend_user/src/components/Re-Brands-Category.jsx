import React, {useEffect, useState} from 'react';
import './HomepageContainer.css'
import menu from "../img/menu.png"
import Apple from "../img/Apple.png"
import LG from "../img/LG.png"
import sony from "../img/sony.png"
import Samsung from "../img/Samsung.png"
import Dell from "../img/DELL.png"
import axios from "axios";
import {getAllBrands, getSeriesByBrand} from "../util/APIUtils";

/**
 * @author Siyuan Peng
 * type:  phones, laptops, gamecosoles, monitors, accessories
 */

export default function Re_Brands_Category(props) {
    const brands = props.productData;
    console.log(brands);
    const [brand, setBrand] = useState(0);

    useEffect(() => {
        async function fetchBrands() {
            try {
                const response = await getAllBrands();
                setBrands(response.result);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchBrands();
    }, []);


    const handleCategoryClick = async(id) => {
        const series ={
            brandId: id
        }
        const response = await getSeriesByBrand(series);
        window.location.href = "/re-type-category?productData=" + encodeURIComponent(JSON.stringify(response.result));
    };

    const handleMoreBrandsClick = ()=>{
        window.location.href = "/re-brands?productData=" + encodeURIComponent(JSON.stringify(brands))
    }


    return (
        <div className="container text-center">
            <div className="row justify-content-start">

                {brands.map(brand=> (
                    <div className="col-md-2 mt-5">
                        <div className="card d-flex flex-column justify-content-center"
                             onClick={() => handleCategoryClick(brand.id)}>
                            <div className="d-flex flex-column justify-content-center" style={{height: '200px'}}>
                                <img src={brand.imageUrl} className="mx-5 my-2" style={{maxWidth: '100%', height: 'auto'}}
                                     alt={brand.id}/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{brand.name}</h5>
                            </div>
                        </div>
                    </div>
                ))
                }

            </div>
            <div className="mt-5"></div>
        </div>
    );
}
