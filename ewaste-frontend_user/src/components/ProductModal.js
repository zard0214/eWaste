// ProductModal.js
import React from 'react';
import './ProductModal.css';
import {useNavigate} from "react-router-dom";



const ProductModal = ({ product, onClose, onNavigate }) => {
    const navigate = useNavigate(); // Initialize navigate function
    //const { addToBasket } = useBasket();

    const handleNavigate = (path) => {
        navigate(path); // Use navigate function to redirect
    };

    const handleGoToBasket = () => {
        navigate('/BasketPage');
        onClose(); // Close the modal after navigating
    };

    const handleNavigateToPayment = () => {
        // Navigate to the Payment page with product details from the modal
        navigate('/Payment', { state: { item: product } });
    };

    // const handleAddToBasket = () => {
    //     addToBasket(product);
    //     navigate('/Basket');
    // };

    return (
        <div className="productModal">
            <div className="modalContent">
                <div className="modalHeader">
                    <span className="modalTitle">1 item added to basket</span>
                    <button className="closeModal" onClick={onClose}>&times;</button>
                </div>
                <div className="modalBody">
                    <img src={product.image} alt={product.model} className="modalProductImage" />
                    <h3 className="modalProductName">{product.model}</h3>
                    <p className="modalProductPrice">Price: £<span>{product.expectedValue}</span></p>
                </div>
                <div className="modalFooter">
                    <button className="checkoutButton" onClick={handleNavigateToPayment}>Checkout 1 item</button>
                    <button className="basketButton" onClick={handleGoToBasket}>Go to basket</button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;

