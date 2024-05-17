import React, {useState} from "react";

const Filter = ({products, onFilter}) =>{
    const [selectedModelFilters, setSelectedModelFilters] = useState([]);
    const [selectedBrandFilters, setSelectedBrandFilters] = useState([]);

    const [showModelFilters, setShowModelFilters] = useState(true);
    const [showBrandFilters, setShowBrandFilters] = useState(true);

    const handleFilterChange = (e) => {
        const value = e.target.value;
        let updatedFilters;
        if (Array.isArray(selectedModelFilters)) {
            if (selectedModelFilters.includes(value)) {
                updatedFilters = selectedModelFilters.filter(filter => filter !== value);
            } else {
                updatedFilters = [...selectedModelFilters, value];
            }
        }else{
            updatedFilters = [value];
        }

        setSelectedModelFilters(updatedFilters);
        onFilter(updatedFilters,selectedBrandFilters);
    };

    const handleBrandFilterChange = (e) => {
        const value = e.target.value;
        let updatedFilters;
        if (Array.isArray(selectedBrandFilters)) {
            if (selectedBrandFilters.includes(value)) {
                updatedFilters = selectedBrandFilters.filter(filter => filter !== value);
            } else {
                updatedFilters = [...selectedBrandFilters, value];
            }
        }else{
            updatedFilters = [value];
        }

        setSelectedBrandFilters(updatedFilters);
        onFilter(selectedModelFilters,updatedFilters);
    };

    const handleModelClick = () => {
        setShowModelFilters(!showModelFilters);
    };

    const handleBrandClick = () => {
        setShowBrandFilters(!showBrandFilters);
    };

    const uniqueModel = Array.from(new Set(products.map(product => product.name).filter(model => model !== '')));
    const uniqueBrand = Array.from(new Set(products.map(product => product.brandName).filter(model => model !== '')));
    return (
        <div className="container text-start py-4">
            <div className="card mt-3">
                <div className="card-body">
                    <h4 onClick={handleBrandClick}>Brand</h4>
                    {showBrandFilters &&
                        <div className="form-check mt-3">
                            {uniqueBrand.map((product, index) => (
                                <div key={index} className="m-2">
                                    <input
                                        className="form-check-input border-dark"
                                        type="checkbox"
                                        value={product}
                                        id={`brand-checkbox-${index}`}
                                        onChange={handleBrandFilterChange}
                                        checked={selectedBrandFilters.includes(product)}
                                    />
                                    <label className="form-check-label" style={{marginLeft: "10px"}}
                                           htmlFor={`brand-checkbox-${index}`}>
                                        {product}
                                    </label>
                                </div>

                            ))}
                        </div>
                    }
                    <hr className="my-4"/>
                    <h4 onClick={handleModelClick}>Series</h4>
                    {showModelFilters &&
                        <div className="form-check mt-3">
                            {uniqueModel.map((product, index) => (
                                <div key={index} className="m-2">
                                    <input
                                        className="form-check-input border-dark"
                                        type="checkbox"
                                        value={product}
                                        id={`checkbox-${index}`}
                                        onChange={handleFilterChange}
                                        checked={selectedModelFilters.includes(product)}
                                    />
                                    <label className="form-check-label" style={{marginLeft: "10px"}}
                                           htmlFor={`checkbox-${index}`}>
                                        {product}
                                    </label>
                                </div>

                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Filter