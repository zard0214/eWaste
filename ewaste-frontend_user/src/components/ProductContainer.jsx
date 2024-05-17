import List from "./List";

import React, {useEffect, useState} from "react";
import Filter from "./Filter";

export default function ProductContainer(props){

    const { productData } = props;
    console.log(productData);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortBy, setSortBy] = useState('priceAsc');

    useEffect(() => {
        // 排序
        let sortedProducts = [...productData];

        if (sortBy === 'NameAsc') {
            sortedProducts.sort((a, b) => a.seriesName.localeCompare(b.seriesName));
        } else if (sortBy === 'NameDesc') {
            sortedProducts.sort((a, b) => b.seriesName.localeCompare(a.seriesName));
        }

        setFilteredProducts(sortedProducts);
    }, [sortBy, productData]);
    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };
    const handleFilter = (selectedModelFilters, selectedBrandFilters, selectedConditionFilters,selectedTypeFilters,selectedClassificationFilters,selectedColorFilters,selectedCapacityFilters,selectedYorFilters) => {
        console.log("Selected model filters:", selectedModelFilters);
        console.log("Selected brand filters:", selectedBrandFilters);
        console.log("Selected condition filters:", selectedConditionFilters);

        const filteredProducts = productData.filter(product => {

            let modelFilterPassed;

            if (Array.isArray(selectedModelFilters)) {
                modelFilterPassed = selectedModelFilters.length === 0 || selectedModelFilters.includes(product.seriesName);
            } else {
                modelFilterPassed = selectedModelFilters === product.seriesName;
            }

            let brandFilterPassed;

            if (Array.isArray(selectedBrandFilters)) {
                brandFilterPassed = selectedBrandFilters.length === 0 || selectedBrandFilters.includes(product.brandName);
            } else {
                brandFilterPassed = selectedBrandFilters === product.brandName;
            }

            let conditionFilterPassed;

            if (Array.isArray(selectedConditionFilters)) {
                conditionFilterPassed = selectedConditionFilters.length === 0 || selectedConditionFilters.includes(product.condition);
            } else {
                conditionFilterPassed = selectedConditionFilters === product.condition;
            }

            let typeFilterPassed;

            if (Array.isArray(selectedTypeFilters)) {
                typeFilterPassed = selectedTypeFilters.length === 0 || selectedTypeFilters.includes(product.type);
            } else {
                typeFilterPassed = selectedTypeFilters === product.type;
            }

            let classificationFilterPassed;

            if (Array.isArray(selectedClassificationFilters)) {
                classificationFilterPassed = selectedClassificationFilters.length === 0 || selectedClassificationFilters.includes(product.classification);
            } else {
                classificationFilterPassed = selectedClassificationFilters === product.classification;
            }

            let colorFilterPassed;

            if (Array.isArray(selectedColorFilters)) {
                colorFilterPassed = selectedColorFilters.length === 0 || selectedColorFilters.includes(product.color);
            } else {
                colorFilterPassed = selectedColorFilters === product.color;
            }

            let capacityFilterPassed;

            if (Array.isArray(selectedCapacityFilters)) {
                capacityFilterPassed = selectedCapacityFilters.length === 0 || selectedCapacityFilters.includes(product.capacity);
            } else {
                capacityFilterPassed = selectedCapacityFilters === product.capacity;
            }

            let yorFilterPassed;

            if (Array.isArray(selectedYorFilters)) {
                yorFilterPassed = selectedYorFilters.length === 0 || selectedYorFilters.includes(product.yearOfRelease);
            } else {
                yorFilterPassed = selectedYorFilters === product.yearOfRelease;
            }

            return modelFilterPassed && brandFilterPassed && conditionFilterPassed && typeFilterPassed && classificationFilterPassed && colorFilterPassed && capacityFilterPassed && yorFilterPassed;
        });

        setFilteredProducts(filteredProducts);
    };

    return (
        <section className="container-fluid py-4">
            <div className="row m-0">
                <div className="col-md-2 col-md-2 col-sm-12 mt-1">
                    <a href="/homepage" className="text-decoration-none text-black">Homepage > Menu</a>
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


                <div className="col-md-2">
                    <Filter products={productData} onFilter={handleFilter}/>
                </div>
                <div className="col-md-10">

                    {filteredProducts.length === 0 ? (
                        <List products={productData}/>
                    ) : (
                        <List products={filteredProducts}/>
                    )}
                </div>
            </div>
        </section>
    );
}