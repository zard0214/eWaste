import List from "./List";

import React, {useEffect, useState} from "react";
import Filter from "./Filter";
import Re_List from "./Re-List";
import Re_Filter from "./Re_Filter";

export default function Re_ProductContainer(props){

    const { productData } = props;
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortBy, setSortBy] = useState('NameAsc');

    useEffect(() => {
        let sortedProducts = [...productData];
        console.log(sortedProducts)
        if (sortBy === 'NameAsc') {
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'NameDesc') {
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredProducts(sortedProducts);
    }, [sortBy, productData]);
    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };
    const handleFilter = (selectedModelFilters, selectedBrandFilters) => {

        const filteredProducts = productData.filter(product => {

            let modelFilterPassed;

            if (Array.isArray(selectedModelFilters)) {
                modelFilterPassed = selectedModelFilters.length === 0 || selectedModelFilters.includes(product.name);
            } else {
                modelFilterPassed = selectedModelFilters === product.name;
            }

            let brandFilterPassed;

            if (Array.isArray(selectedBrandFilters)) {
                brandFilterPassed = selectedBrandFilters.length === 0 || selectedBrandFilters.includes(product.brandName);
            } else {
                brandFilterPassed = selectedBrandFilters === product.brandName;
            }

            return modelFilterPassed && brandFilterPassed;
        });

        setFilteredProducts(filteredProducts);
    };

    return (
        <section className="container-fluid py-4">
            <div className="row m-0">
                <div className="col-md-2 col-md-2 col-sm-12 mt-1">
                    <a href="/re-homepage" className="text-decoration-none text-black">Homepage > Menu</a>
                </div>
                <div className="col-lg-10 col-md-10 col-sm-12 mt-1">
                    <div className="row mb-3 justify-content-end">
                        <div className="col-md-3">
                            <select id="sortSelect" className="form-select" value={sortBy} onChange={handleSortChange}>
                                <option value="NameAsc">Sort: Series Name: A to Z</option>
                                <option value="NameDesc">Sort: Series Name: Z to A</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-lg-2 col-md-4 col-sm-12">
                    <Re_Filter products={productData} onFilter={handleFilter}/>
                </div>
                <div className="col-lg-10 col-md-8 col-sm-12">
                    {filteredProducts.length === 0 ? (
                        <Re_List products={productData}/>
                    ) : (
                        <Re_List products={filteredProducts}/>
                    )}
                </div>
            </div>
        </section>
    );
}