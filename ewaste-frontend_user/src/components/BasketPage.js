import React from 'react';
import './BasketPage.css';
import {useBasket} from './BasketContext';
//import test from '../pictures/samsung.jpeg';
import { useNavigate } from 'react-router-dom';

export default function BasketPage() {

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

    const {basketItems, getBasketTotal, removeFromBasket} = useBasket();
    const navigate = useNavigate();
    const total = getBasketTotal();

    const handleRemoveFromBasket = (index) => {
        removeFromBasket(index);
    };

    const handleCheckout = () => {
        // Navigate to the payment page with the basket items as state
        navigate('/payment', { state: { items: basketItems } });
    };
    console.log(basketItems)
    return (
        <div className="basket-container">
            <div className="basket-items">
                {basketItems.length > 0 ? (
                    basketItems.map((item, index) => (
                        <div key={index} className="basket-item">
                            <img src={item.image} alt={1} className="item-image"/>
                            <div className="item-details">
                                <div className="item-top mt-2">
                                    <h3><b>{item.model}</b></h3>
                                    <span className="mt-1">{item.product.brandName}</span>
                                </div>
                            </div>
                            <div className="item-details">
                                <div className="item-middle mt-2">
                                    <span
                                        className="item-delivery">{getColorFromValue(item.product.color)}</span>
                                    <span
                                        className="item-delivery">{getConditionFromValue(item.product.condition)}</span>
                                    <span
                                        className="item-delivery">{getClassificationFromValue(item.product.classification)}</span>
                                </div>
                            </div>
                            <div className="item-details">
                                <div className="item-bottom">
                                    <span className="item-price">£{item.expectedValue}</span>
                                    <span className="item-delivery">Royal Mail</span>
                                    <span className="item-free-delivery">Free 2-3 day postage</span>
                                </div>
                            </div>
                            <div className="item-actions">
                                <button onClick={() => handleRemoveFromBasket(index)} className="item-remove">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="basket-empty">
                        Your basket is empty.
                    </div>
                )}
            </div>
            <div className="basket-summary">
                <div className="total-label">Total:</div>
                <div className="total-value">£{total.toFixed(2)}</div>
                {/*<a href="/payment">*/}
                {/*    <button className="checkout-button">Go to checkout</button>*/}
                {/*</a>*/}
                <button onClick={handleCheckout} className="checkout-button">
                    Go to checkout
                </button>
                <a href="/" className="continue-shopping">Continue shopping</a>
            </div>
        </div>
    );
}
