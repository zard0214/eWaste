import React, {useState} from "react";

const Filter = ({products, onFilter}) =>{

    function getConditionFromValue(value) {
        switch (value) {
            case 0:
                return "New";
            case 1:
                return "New without box";
            case 2:
                return "Very good";
            case 3:
                return "Good";
            case 4:
                return "Satisfactory";
            case 5:
                return "Bad";
            default:
                return "Unknown";
        }
    }

    function getColorFromValue(value) {
        switch (value) {
            case 1:
                return "Red";
            case 2:
                return "White";
            case 3:
                return "Black";
            case 4:
                return "Green";
            case 5:
                return "Yellow";
            case 6:
                return "Blue";
            case 7:
                return "Purple";
            case 8:
                return "Grey";
            case 9:
                return "Brown";
            case 10:
                return "Pink";
            case 11:
                return "Gold";
            case 12:
                return "Orange";
            default:
                return "Unknown";
        }
    }

    function getClassificationFromValue(value) {
        switch (value) {
            case 1:
                return "Current";
            case 2:
                return "Recycle";
            case 3:
                return "Rare";
            case 4:
                return "Unknown";
            default:
                return "";
        }
    }



    const [selectedModelFilters, setSelectedModelFilters] = useState([]);
    const [selectedBrandFilters, setSelectedBrandFilters] = useState([]);
    const [selectedConditionFilters, setSelectedConditionFilters] = useState([]);
    const [selectedTypeFilters, setSelectedTypeFilters] = useState([]);
    const [selectedClassificationFilters, setSelectedClassificationFilters] = useState([]);
    const [selectedColorFilters, setSelectedColorFilters] = useState([]);
    const [selectedCapacityFilters, setSelectedCapacityFilters] = useState([]);
    const [selectedYorFilters, setSelectedYorFilters] = useState([]);

    const [showModelFilters, setShowModelFilters] = useState(true);
    const [showBrandFilters, setShowBrandFilters] = useState(true);
    const [showConditionFilters, setShowConditionFilters] = useState(true);
    const [showTypeFilters, setShowTypeFilters] = useState(true);
    const [showClassificationFilters, setShowClassificationFilters] = useState(true);
    const [showColorFilters, setShowColorFilters] = useState(true);
    const [showCapacityFilters, setShowCapacityFilters] = useState(true);
    const [showYorFilters, setShowYorFilters] = useState(true);

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
        onFilter(updatedFilters,selectedBrandFilters,selectedConditionFilters,selectedTypeFilters,selectedClassificationFilters,selectedColorFilters,selectedCapacityFilters,selectedYorFilters);
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
        onFilter(selectedModelFilters,updatedFilters,selectedConditionFilters,selectedTypeFilters,selectedClassificationFilters,selectedColorFilters,selectedCapacityFilters,selectedYorFilters);
    };

    const handleConditionFilterChange = (e) => {
        const value = parseInt(e.target.value);
        let updatedFilters;
        if (Array.isArray(selectedConditionFilters)) {
            if (selectedConditionFilters.includes(value)) {
                updatedFilters = selectedConditionFilters.filter(filter => filter !== value);
            } else {
                updatedFilters = [...selectedConditionFilters, value];
            }
        }else{
            updatedFilters = [value];
        }

        setSelectedConditionFilters(updatedFilters);
        onFilter(selectedModelFilters,selectedBrandFilters,updatedFilters,selectedTypeFilters,selectedClassificationFilters,selectedColorFilters,selectedCapacityFilters,selectedYorFilters);
    };

    const handleTypeFilterChange = (e) => {
        const value = e.target.value;
        let updatedFilters;
        if (Array.isArray(selectedTypeFilters)) {
            if (selectedTypeFilters.includes(value)) {
                updatedFilters = selectedTypeFilters.filter(filter => filter !== value);
            } else {
                updatedFilters = [...selectedTypeFilters, value];
            }
        }else{
            updatedFilters = [value];
        }

        setSelectedTypeFilters(updatedFilters);
        onFilter(selectedModelFilters,selectedBrandFilters,selectedConditionFilters,updatedFilters,selectedClassificationFilters,selectedColorFilters,selectedCapacityFilters,selectedYorFilters);
    };

    const handleClassificationFilterChange = (e) => {
        const value = parseInt(e.target.value);
        let updatedFilters;
        if (Array.isArray(selectedClassificationFilters)) {
            if (selectedClassificationFilters.includes(value)) {
                updatedFilters = selectedClassificationFilters.filter(filter => filter !== value);
            } else {
                updatedFilters = [...selectedClassificationFilters, value];
            }
        }else{
            updatedFilters = [value];
        }

        setSelectedClassificationFilters(updatedFilters);
        onFilter(selectedModelFilters,selectedBrandFilters,selectedConditionFilters,selectedTypeFilters,updatedFilters,selectedColorFilters,selectedCapacityFilters,selectedYorFilters);
    };

    const handleColorFilterChange = (e) => {
        const value = parseInt(e.target.value);
        let updatedFilters;
        if (Array.isArray(selectedColorFilters)) {
            if (selectedColorFilters.includes(value)) {
                updatedFilters = selectedColorFilters.filter(filter => filter !== value);
            } else {
                updatedFilters = [...selectedColorFilters, value];
            }
        }else{
            updatedFilters = [value];
        }

        setSelectedColorFilters(updatedFilters);
        onFilter(selectedModelFilters,selectedBrandFilters,selectedConditionFilters,selectedTypeFilters,selectedClassificationFilters,updatedFilters,selectedCapacityFilters,selectedYorFilters);
    };

    const handleCapacityFilterChange = (e) => {
        const value = e.target.value;
        let updatedFilters;
        if (Array.isArray(selectedCapacityFilters)) {
            if (selectedCapacityFilters.includes(value)) {
                updatedFilters = selectedCapacityFilters.filter(filter => filter !== value);
            } else {
                updatedFilters = [...selectedCapacityFilters, value];
            }
        }else{
            updatedFilters = [value];
        }

        setSelectedCapacityFilters(updatedFilters);
        onFilter(selectedModelFilters,selectedBrandFilters,selectedConditionFilters,selectedTypeFilters,selectedClassificationFilters,selectedColorFilters,updatedFilters,selectedYorFilters);
    };

    const handleYorFilterChange = (e) => {
        const value = parseInt(e.target.value);
        console.log(value)
        let updatedFilters;
        if (Array.isArray(selectedYorFilters)) {
            if (selectedYorFilters.includes(value)) {
                updatedFilters = selectedYorFilters.filter(filter => filter !== value);
            } else {
                updatedFilters = [...selectedYorFilters, value];
            }
        }else{
            updatedFilters = [value];
        }

        setSelectedYorFilters(updatedFilters);
        onFilter(selectedModelFilters,selectedBrandFilters,selectedConditionFilters,selectedTypeFilters,selectedClassificationFilters,selectedColorFilters,selectedCapacityFilters,updatedFilters);
    };

    const handleModelClick = () => {
        setShowModelFilters(!showModelFilters);
    };

    const handleBrandClick = () => {
        setShowBrandFilters(!showBrandFilters);
    };

    const handleConditionClick = () => {
        setShowConditionFilters(!showConditionFilters);
    };

    const handleTypeClick = () => {
        setShowTypeFilters(!showTypeFilters);
    };

    const handleClassificationClick = () => {
        setShowClassificationFilters(!showClassificationFilters);
    };
    const handleColorClick = () => {
        setShowColorFilters(!showColorFilters);
    };
    const handleCapacityClick = () => {
        setShowCapacityFilters(!showCapacityFilters);
    };
    const handleYorClick = () => {
        setShowYorFilters(!showYorFilters);
    };

    const uniqueModel = Array.from(new Set(products.map(product => product.seriesName).filter(model => model !== '')));
    const uniqueBrand = Array.from(new Set(products.map(product => product.brandName).filter(model => model !== '')));
    const uniqueConditions = Array.from(new Set(products.map(product => product.condition).filter(model => model !== '')));
    const uniqueType = Array.from(new Set(products.map(product => product.type).filter(model => model !== null && model !== '')));
    const uniqueClassification = Array.from(new Set(products.map(product => product.classification).filter(model => model !== '')));
    const uniqueColor = Array.from(new Set(products.map(product => product.colour).filter(model => model !== '')));
    const uniqueCapacity = Array.from(new Set(products.map(product => product.capacity).filter(model => model !== '')));
    const uniqueYor = Array.from(new Set(products.map(product => product.yearOfRelease).filter(model => model !== '')));

    return (
        <div className="container text-start py-4">
            <div className="card mt-3">
                <div className="card-body">
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
                                    <label className="form-check-label" style={{ marginLeft: "10px" }} htmlFor={`checkbox-${index}`}>
                                        {product}
                                    </label>
                                </div>

                            ))}
                        </div>
                    }

                    <hr className="my-4"/>
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
                    <h4 onClick={handleConditionClick}>Condition</h4>
                    {showConditionFilters &&
                        <div className="form-check mt-3">
                            {uniqueConditions.map((condition, index) => (
                                <div key={index} className="m-2">
                                    <input
                                        className="form-check-input border-dark"
                                        type="checkbox"
                                        value={condition}
                                        id={`condition-checkbox-${index}`}
                                        onChange={handleConditionFilterChange}
                                        checked={selectedConditionFilters.includes(condition)}
                                    />
                                    <label className="form-check-label" style={{marginLeft: "10px"}}
                                           htmlFor={`condition-checkbox-${index}`}>
                                        {getConditionFromValue(condition)}
                                    </label>
                                </div>

                            ))}
                        </div>
                    }

                    <hr className="my-4"/>
                    <h4 onClick={handleTypeClick}>Type</h4>
                    {showTypeFilters &&
                        <div className="form-check mt-3">
                            {uniqueType.map((type, index) => (
                                <div key={index} className="m-2">
                                    <input
                                        className="form-check-input border-dark"
                                        type="checkbox"
                                        value={type}
                                        id={`type-checkbox-${index}`}
                                        onChange={handleTypeFilterChange}
                                        checked={selectedTypeFilters.includes(type)}
                                    />
                                    <label className="form-check-label" style={{marginLeft: "10px"}}
                                           htmlFor={`type-checkbox-${index}`}>
                                        {type}
                                    </label>
                                </div>

                            ))}
                        </div>
                    }

                    <hr className="my-4"/>
                    <h4 onClick={handleClassificationClick}>Classification</h4>
                    {showClassificationFilters &&
                        <div className="form-check mt-3">
                            {uniqueClassification.map((classification, index) => (
                                <div key={index} className="m-2">
                                    <input
                                        className="form-check-input border-dark"
                                        type="checkbox"
                                        value={classification}
                                        id={`condition-checkbox-${index}`}
                                        onChange={handleClassificationFilterChange}
                                        checked={selectedClassificationFilters.includes(classification)}
                                    />
                                    <label className="form-check-label" style={{marginLeft: "10px"}}
                                           htmlFor={`classification-checkbox-${index}`}>
                                        {getClassificationFromValue(classification)}
                                    </label>
                                </div>

                            ))}
                        </div>
                    }

                    <hr className="my-4"/>
                    <h4 onClick={handleYorClick}>Year of Release</h4>
                    {showYorFilters &&
                        <div className="form-check mt-3">
                            {uniqueYor.sort((a, b) => parseInt(b) - parseInt(a)).map((yor, index) => (
                                <div key={index} className="m-2">
                                    <input
                                        className="form-check-input border-dark"
                                        type="checkbox"
                                        value={String(yor)}
                                        id={`yor-checkbox-${index}`}
                                        onChange={handleYorFilterChange}
                                        checked={selectedYorFilters.includes(yor)}
                                    />
                                    <label className="form-check-label" style={{marginLeft: "10px"}}
                                           htmlFor={`yor-checkbox-${index}`}>
                                        {yor}
                                    </label>
                                </div>

                            ))}
                        </div>
                    }

                    {uniqueCapacity.length > 0 && (
                        <hr className="my-4"/>
                    )}
                    {uniqueCapacity.length > 0 && (
                        <h4 onClick={handleCapacityClick}>Capacity</h4>
                    )}
                    {showCapacityFilters && uniqueCapacity.length > 0 &&
                        <div className="form-check mt-3">
                            {uniqueCapacity.map((condition, index) => (
                                condition&&(
                                    <div key={index} className="m-2">
                                        <input
                                            className="form-check-input border-dark"
                                            type="checkbox"
                                            value={condition}
                                            id={`capacity-checkbox-${index}`}
                                            onChange={handleCapacityFilterChange}
                                            checked={selectedCapacityFilters.includes(condition)}
                                        />
                                        <label className="form-check-label" style={{marginLeft: "10px"}}
                                               htmlFor={`capacity-checkbox-${index}`}>
                                            {condition}
                                        </label>
                                    </div>
                                )
                            ))}
                        </div>
                    }

                    <hr className="my-4"/>
                    <h4 onClick={handleColorClick}>Color</h4>
                    {showColorFilters &&
                        <div className="form-check mt-3">
                            {uniqueColor.map((condition, index) => (
                                <div key={index} className="m-2">
                                    <input
                                        className="form-check-input border-dark"
                                        type="checkbox"
                                        value={condition}
                                        id={`condition-checkbox-${index}`}
                                        onChange={handleColorFilterChange}
                                        checked={selectedColorFilters.includes(condition)}
                                    />
                                    <label className="form-check-label" style={{marginLeft: "10px"}}
                                           htmlFor={`condition-checkbox-${index}`}>
                                        {getColorFromValue(condition)}
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