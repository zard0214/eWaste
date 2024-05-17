import phone from "../img/phone.png";
import laptop from "../img/laptop.png";
import ps5 from "../img/ps5.png";
import monitor from "../img/monitor.png";
import React from "react";
import './HomepageContainer.css'

export default function Re_PopularCategory(props) {
    const { popularData } = props;

    console.log('popularData:', popularData);

    const handleProductClick = (product) => {
        window.location.href = "/recycle-detail?productData=" + encodeURIComponent(JSON.stringify(product));
    };

    return (
        <div className="container text-center">
            <div className="row justify-content-center">
                {popularData.map(product=>(
                    <div className="col-md-3">
                        <div className="card" onClick={()=>handleProductClick(product)}>
                            <img src={product.imageUrl} className="card-img-top img-fluid" style={{height: 300}} alt="1"/>
                            <div className="card-body">
                                <h4 className="card-title">{product.name}</h4>
                                <p className="card-title">{product.brandName}</p>
                                <button className="btn btn-danger mt-4">Recycle</button>
                            </div>
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
    );
}
