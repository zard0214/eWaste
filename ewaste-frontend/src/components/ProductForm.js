import React, {useState, useEffect} from 'react';
import CurrencyInput from 'react-currency-input-field';
import Alert from "react-s-alert";
import {getProductById, saveProduct, updateProduct} from "../util/APIUtils";
import AppNavigation from "../common/AppNavigation";

const ProductForm = (props) => {
    const [product, setProduct] = useState({
        productID: '',
        brand: '',
        model: '',
        yearOfRelease: '',
        condition: '',
        color: '',
        capacity: '',
        type: '',
        classification: '',
        visibility: '',
        orderId: '',
        expectedValue: 0,
    });

    // const [isLoading, setIsLoading] = useState(true);
    const classes = ['current', 'recycle', 'rare', 'unwanted', 'unknown'];
    const visibility = ['Visible', 'Hidden'];
    const brandsList = ['Apple', 'Samsung', 'Google',
    'OnePlus', 'Xiaomi' , 'Redmi' , 'Oppo','Realme', 'Vivo', 'Motorola', 'Nokia', 'Asus (ZenFone)', 'Dell (XPS Series)', 'HP (Spectre Series)', 'Lenovo (Thinkpad Series)',
    'Asus', 'MSI', 'Acer', 'Razer', 'Microsoft (Surface Laptops)', 'Gigabyte', 'Sony (PlayStation)',
    'Microsoft (Xbox)', 'Nintendo (Switch)', 'Valve (Steam Deck)', 'LG', 'Sony', 'TCL',
    'Vizio', 'Hisense', 'Toshiba', 'Panasonic', 'Dell', 'HP', 'Lenovo', 'Asus', 'MSI', 'CyberpowerPC',
    'NZXT', 'Origin PC', 'Corsair', 'Fractal Design','Other'];
    const capacityOptions = ['8 GB','16 GB','32 GB','64 GB','128 GB','256 GB','512 GB','1 TB','2 TB','5 TB','10 TB'];

    const [isRequired, setRequired] = useState(true)

    useEffect(() => {
        //Fetch Product data from DB
        const fetchProductByID = (id) => {
            const productId = {"id": id};
            getProductById(productId.id)
                .then(response => {
                    console.log(response.result)
                    setProduct(response.result);
                    setRequired(response.result.classification !== 'unknown')
                    // setIsLoading(false);
                })
                .catch(error => {
                    Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
                });
        };

        // Destructure props.location to access state
        const {state} = props.location;

        if (state !== undefined) {
            const id = state.id;
            fetchProductByID(id);
        }
    }, [props.location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        // Check if the input is a number and within the range of year 2001 to 2024
        if (name === 'yearOfRelease' && /^[0-9]*$/.test(value)) {
            newValue = Math.max(2001, Math.min(parseInt(value), 2025));
        }

        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: newValue
        }));
    };

    const handleChangeCurrency = (value, name, values) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            expectedValue: value
        }));
    };

    const handleOptionChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value});
        if(e.target.name === 'classification' && e.target.value !== 'unknown'){
            setRequired(true);
        }else{
            setRequired(false);
        }
    };

    const state = props.location.state;

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitBtn = document.getElementById("submit-btn");
        let cancelBtn = document.getElementById("cancel-btn");
        submitBtn.disabled = true;
        cancelBtn.disabled = true;
        if (product.productId) {
            // Update existing product
            updateProduct(product)
                .then(response => {
                    Alert.success("Product updated successfully");
                    props.history.push("/products")
                })
                .catch(error => {
                    submitBtn.disabled = false;
                    cancelBtn.disabled = false;
                    Alert.error("Failed to update product");
                });
        } else {
            // Add new product
            saveProduct(product)
                .then(response => {
                    Alert.success("Product added successfully");
                    props.history.push("/products")
                })
                .catch(error => {
                    submitBtn.disabled = false;
                    cancelBtn.disabled = false;
                    Alert.error("Failed to add product");
                });
        }
    };

    return (
        <div>
            <AppNavigation/>
            <div className="content-container">
                <h2>{state === undefined ? "New Product Details" : `Product ID: ${product.productId} Details`}</h2>
                <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-rows">
                        <div className="form-group row mb-3">
                            <label htmlFor="brand" className="col-sm-2 col-form-label">Brand</label>
                            <div className="col-sm-10">
                                <select
                                    disabled="disabled"
                                    id="brand"
                                    contentEditable={false}
                                    name="brand"
                                    value={product.brand}
                                    className="form-control"
                                    required={isRequired}
                                    onChange={handleChange}
                                >
                                    <option value="">Select...</option>
                                    {brandsList.map((brand, index) => (
                                        <option key={index} value={brand}>{brand}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor="Model" className="col-sm-2 col-form-label">Model</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" name="model" value={product.model}
                                       disabled="disabled"
                                       required="true"
                                       onChange={(e) => handleChange(e)}/>
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor="yearOfRelease" className="col-sm-2 col-form-label">Year Of Release</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" name="yearOfRelease"
                                       disabled="disabled"
                                       value={product.yearOfRelease}
                                       required={isRequired}
                                       onChange={(e) => handleChange(e)}/>
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor="condition" className="col-sm-2 col-form-label">Condition</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" name="condition"
                                       disabled="disabled"
                                       value={product.condition}
                                       required="true"
                                       onChange={(e) => handleChange(e)}/>
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor="color" className="col-sm-2 col-form-label">Color</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" name="color" value={product.color}
                                       disabled="disabled"
                                       required="true"
                                       onChange={(e) => handleChange(e)}/>
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor="capacity" className="col-sm-2 col-form-label">Capacity</label>
                            <div className="col-sm-10">
                                <select
                                    disabled="disabled"
                                    className="form-control"
                                    name="capacity"
                                    value={product.capacity}
                                    required={true}
                                    onChange={handleChange}
                                >
                                    <option value="">Select...</option>
                                    {capacityOptions.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor="type" className="col-sm-2 col-form-label">Type</label>
                            <div className="col-sm-10">
                                <select id="productTypeSelect" name="type" value={product.type}
                                        className="form-control"
                                        required={isRequired}
                                        onChange={handleOptionChange}
                                        disabled="disabled"
                                >
                                    <option value="phones">Phones</option>
                                    <option value="gameconsoles">Game Consoles</option>
                                    <option value="laptops">Laptops</option>
                                    <option value="monitors">Monitors</option>
                                    <option value="accessories">Accessories</option>
                                    <option value="unknown">Unknown/Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor="classification" className="col-sm-2 col-form-label">Classification</label>
                            <div className="col-sm-10">
                                <select id="productClassSelect" name="classification" value={product.classification}
                                        className="form-control"
                                        required={isRequired}
                                        disabled="disabled"
                                        onChange={handleOptionChange}
                                >
                                    <option value="">Select...</option>
                                    {classes.map((choice, index) => (
                                        <option key={index} value={choice}>{choice}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor="visibility" className="col-sm-2 col-form-label">Visibility</label>
                            <div className="col-sm-10">
                                <select id="productVisSelect" name="visibility" value={product.visibility}
                                        className="form-control"
                                        required="true"
                                        onChange={handleOptionChange}
                                >
                                    <option value="">Select...</option>
                                    {visibility.map((choice, index) => (
                                        <option key={index} value={choice}>{choice}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor="expectedValue" className="col-sm-2 col-form-label">Expected Value</label>
                            <div className="col-sm-10">
                                <CurrencyInput
                                    disabled="disabled"
                                    className="form-control"
                                    id="expectedValue"
                                    name="expectedValue"
                                    placeholder="Please enter a number"
                                    value={product.expectedValue}
                                    decimalsLimit={2} // decimal place limit
                                    prefix="£"
                                    required={isRequired}
                                    onValueChange={handleChangeCurrency}
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor="orderId" className="col-sm-2 col-form-label">Order Id</label>
                            <div className="col-sm-10">
                                <input disabled="disabled" type="text" className="form-control" name="orderId"
                                       value={product.orderId}
                                       onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="submit-btn-div">
                            <a id="cancel-btn" className="btn btn-light" href="/products" role="button">Cancel</a>
                            <div style={{margin: "10px"}}></div>
                            <button id="submit-btn" type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductForm;
