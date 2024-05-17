import accessories from "../img/4090.png";
import React, {useEffect, useState} from "react";
import {getAllBrands} from "../util/APIUtils";


const Re_List = ({products}) =>{

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage-1) * itemsPerPage;
    const endIndex = (startIndex+itemsPerPage>products.length)?products.length-startIndex:startIndex+itemsPerPage;
    const currentItems = products.slice(startIndex,endIndex);


    const handleProductClick = (product) => {
        window.location.href = "/recycle-detail?productData=" + encodeURIComponent(JSON.stringify(product));
        console.log(product)
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePageBack = () => {
        setCurrentPage(currentPage-1);
    };

    const handlePageForward = () => {
        setCurrentPage(currentPage+1);
    };

    const PageNumbers = () => {
        const pageNumbers = [];
        if(currentPage>1){
            pageNumbers.push(
                <li>
                    <button className="page-link" onClick={() => handlePageBack()}>
                        &laquo;
                    </button>
                </li>
            );
        }

        let start = Math.max(currentPage-3,2);
        let end = Math.min(currentPage+3,totalPages-1);

        pageNumbers.push(
            <li className={`page-item ${currentPage === 1 ? 'active' : ''}`} key={1}>
                <button className="page-link" onClick={() => handlePageChange(1)}>
                    {1}
                </button>
            </li>
        );

        if(start>2) {
            pageNumbers.push(
                <li>
                    ...
                </li>
            );

        }

        for (let i = start; i <= end; i++) {
            if(i===1||i===totalPages){
                continue;
            }
            else{
                pageNumbers.push(
                    <li className={`page-item ${currentPage === i ? 'active' : ''}`} key={i}>
                        <button className="page-link" onClick={() => handlePageChange(i)}>
                            {i}
                        </button>
                    </li>
                );
            }
        }

        if(end<totalPages-1) {
            pageNumbers.push(
                <li>
                    ...
                </li>
            );

        }

        if(totalPages>1){
            pageNumbers.push(
                <li className={`page-item ${currentPage === totalPages ? 'active' : ''}`} key={totalPages}>
                    <button className="page-link" onClick={() => handlePageChange(totalPages)}>
                        {totalPages}
                    </button>
                </li>
            );
        }

        if(totalPages>1&&currentPage<totalPages){
            pageNumbers.push(
                <li>
                    <button className="page-link" onClick={() => handlePageForward()}>
                        &raquo;
                    </button>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="container text-center py-4">
            <div className="row justify-content-start">
                {currentItems.map(product=> (
                    <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
                        <div className="card d-flex flex-column justify-content-center"
                             onClick={() => handleProductClick(product)}>
                            <div className="d-flex flex-column justify-content-center mt-2 mb-2" style={{height: '250px',overflow: 'hidden'}}>
                                <img src={product.imageUrl} className="mx-5 my-5" style={{maxWidth: '100%', height: 'auto'}}
                                     alt={1}/>
                            </div>
                            <div className="card-body">
                                <h4 className="mt-3"><b>{product.name}</b></h4>
                                <p className="text-xs mb-1">{product.brandName}</p>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
            <ul className="pagination mt-5" style={{bottom: '0'}}>
                {PageNumbers()}
            </ul>
        </div>
    );
}

export default Re_List
