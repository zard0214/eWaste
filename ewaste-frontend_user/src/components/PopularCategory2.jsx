import React from "react";
import './HomepageContainer.css'

export default function PopularCategory2(props) {
    const { popularData } = props;

    console.log('popularData:', popularData);

    const handleProductClick = (product) => {
        window.location.href = "/DeviceDetail?productData=" + encodeURIComponent(JSON.stringify(product));
    };

    return (
        <div className="container text-center">
            <div className="row justify-content-center">
                {popularData.slice(0,4).map((product, index)=>(
                    <div className="col-md-3" key={index}>
                        <div className="card" onClick={()=>handleProductClick(product)}>
                            <img src={product.imageUrl} className="card-img-top img-fluid" style={{height: 300}} alt="Phones"/>
                            <div className="card-body">
                                <h5 className="card-title">{product.seriesName}</h5>
                                <button className="btn btn-danger mt-4">Purchase</button>
                            </div>
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
    );
}
