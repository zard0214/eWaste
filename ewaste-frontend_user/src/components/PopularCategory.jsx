import phone from "../img/phone.png";
import laptop from "../img/laptop.png";
import ps5 from "../img/ps5.png";
import monitor from "../img/monitor.png";
import React from "react";
import './HomepageContainer.css'

export default function PopularCategory(props) {
    const { popularData } = props;

    console.log('popularData:', popularData);

    const handleProductClick = (product) => {
        window.location.href = "/DeviceDetail?productData=" + encodeURIComponent(JSON.stringify(product));
    };

    return (
        <div className="container text-center">
            <div className="row justify-content-center">
                {popularData.slice(0,4).map(product=>(
                    <div className="col-md-3">
                        <div className="card" onClick={()=>handleProductClick(product)}>
                            <img src={product.imageUrl} className="card-img-top img-fluid" style={{height: 300}} alt="Phones"/>
                            <div className="card-body">
                                <h5 className="card-title">{product.SeriesName}</h5>
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
