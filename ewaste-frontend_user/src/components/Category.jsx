import React from 'react';
import './HomepageContainer.css'
import menu from "../img/menu.png"
import phone from "../img/phone.png"
import laptop from "../img/laptop.png"
import ps5 from "../img/ps5.png"
import monitor from "../img/monitor.png"
import accessories from "../img/4090.png"
import axios from "axios";
import {searchProductsV2, searchProductsV2Type} from "../util/APIUtils";

/**
 * @author Siyuan Peng
 * type:  phones, laptops, gamecosoles, monitors, accessories
 */

export default function Category() {

    const handleCategoryClick = async(type) => {
        const response = await searchProductsV2(type);
        console.log("type result: "+JSON.stringify(response.result));
        window.location.href = "/type-category?productData=" + encodeURIComponent(JSON.stringify(response.result));
    };

    return (
        <div className="container text-center">
            <div className="row justify-content-center">
                <div className="col-md-2 mt-1">
                    <div className="card d-flex flex-column align-items-center justify-content-center" onClick={() => handleCategoryClick("phones")}>
                        <div className="d-flex flex-column justify-content-center align-items-center"
                             style={{height: '200px', maxWidth: '200px'}}>
                            <img src={phone} className="card-img-top img-fluid" style={{height: 200}} alt="Phones"/>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Phones</h5>
                        </div>
                    </div>
                </div>

                <div className="col-md-2 mt-1">
                    <div className="card d-flex flex-column align-items-center justify-content-center" onClick={() => handleCategoryClick("laptops")}>
                        <div className="d-flex flex-column justify-content-center align-items-center"
                             style={{height: '200px', maxWidth: '200px'}}>
                            <img src={laptop} className="card-img-top img-fluid" style={{height: 200}} alt="Laptops"/>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Laptops</h5>
                        </div>
                    </div>
                </div>

                <div className="col-md-2 mt-1">
                    <div className="card d-flex flex-column align-items-center justify-content-center" onClick={() => handleCategoryClick("gameconsoles")}>
                        <div className="d-flex flex-column justify-content-center align-items-center"
                             style={{height: '200px', maxWidth: '200px'}}>
                            <img src={ps5} className="card-img-top img-fluid" style={{height: 200}}
                                 alt="Game consoles"/>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Game consoles</h5>
                        </div>
                    </div>
                </div>

                <div className="col-md-2 mt-1">
                    <div className="card d-flex flex-column justify-content-center align-items-center" onClick={() => handleCategoryClick("monitors")}>
                        <div className="d-flex flex-column justify-content-center align-items-center"
                             style={{height: '200px', maxWidth: '200px'}}>
                            <img src={monitor} className="card-img-top img-fluid" style={{height: 200}} alt="Monitors"/>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Monitors</h5>
                        </div>
                    </div>
                </div>

                <div className="col-md-2 mt-1">
                    <div className="card d-flex flex-column justify-content-center align-items-center" onClick={() => handleCategoryClick("accessories")}>
                        <div className="d-flex flex-column justify-content-center align-items-center"
                             style={{height: '200px', maxWidth: '200px'}}>
                            <img src={accessories} className="card-img-top img-fluid" style={{height: 200}}
                                 alt="Accessories"/>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Accessories</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
