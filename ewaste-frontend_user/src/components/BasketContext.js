
import React, { createContext, useState, useContext, useEffect } from 'react';

const BasketContext = createContext();

export const useBasket = () => useContext(BasketContext);

export const BasketProvider = ({ children }) => {
    // Initialize basketItems state from localStorage if available
    const [basketItems, setBasketItems] = useState(() => {
        const localData = localStorage.getItem('basketItems');
        return localData ? JSON.parse(localData) : [];
    });

    // Every time basketItems changes, this effect will run and update localStorage
    useEffect(() => {
        localStorage.setItem('basketItems', JSON.stringify(basketItems));
    }, [basketItems]);

    const addToBasket = (newItem) => {
        setBasketItems(prevItems => {
            const updatedItems = [...prevItems, newItem];
            return updatedItems;
        });
    };

    const removeFromBasket = (index) => {
        setBasketItems(prevItems => {
            const updatedItems = [...prevItems];
            updatedItems.splice(index, 1); // Remove the item at the specified index
            return updatedItems;
        });
    };

    const getBasketTotal = () => {
        return basketItems.reduce((total, item) => total + parseFloat(item.expectedValue), 0);
    };

    return (
        <BasketContext.Provider value={{ basketItems, addToBasket, getBasketTotal, removeFromBasket }}>
            {children}
        </BasketContext.Provider>
    );
};
