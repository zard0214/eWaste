import React, {useEffect, useState} from "react";
import axios from "axios";
import {searchProductsV2, searchSeries} from "../util/APIUtils";
//import "./SearchBar.css";

const SearchBar = () => {

    const [searchValue, setSearchValue] = useState("");

    const handleSearch = async () => {
        if (searchValue.trim() !== "") {
            try {

                const response = await searchProductsV2(searchValue);
                console.log(response.result);
                window.location.href = "/search-results?searchData=" + encodeURIComponent(JSON.stringify(response.result));

            } catch (error) {
                console.error("Error performing search: ", error);
            }
        }
    };

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };


    return (
        <div className="row">
            <div className="col-lg-8 offset-lg-2 py-5">
                <div className="input-group input-group-lg">
                    <input type="text" placeholder="What do you want to recycle?" className="form-control" autoFocus onChange={handleChange} onKeyDown={handleKeyDown} />

                </div>
            </div>
        </div>
    );
};

export default SearchBar;
