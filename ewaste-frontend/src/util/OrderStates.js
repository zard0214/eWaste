const OrderState = {
    CANCEL: { state: "CANCEL", code: -10 },
    INITIALISED: { state: "INITIALISED", code: 0 },
    RECEIVED: { state: "RECEIVED", code: 10 },
    RETRIEVING: { state: "RETRIEVING", code: 20 },
    DISPATCHING: { state: "DISPATCHING", code: 30 },
    WIPING: { state: "WIPING", code: 40 },
    COMPLETED: { state: "COMPLETED", code: 50 },
    PAY_SUCCESS: { state: "PAY_SUCCESS", code: 60 },
};
export const getState = (code) => {
    for (const key in OrderState) {
        if (OrderState[key].code === code) {
            return OrderState[key].state;
        }
    }
    return null;
};

export const getAllStates = () => {
    return Object.values(OrderState).map(state => state.state);
}

export const getCode = (state) => {
    for (const key in OrderState) {
        if (OrderState[key].state === state) {
            return OrderState[key].code;
        }
    }
    return null;
}

const OrderType = {
    RECYCLE: { state: "Recycle", code: 1 },
    DATA_RETRIEVE: { state: "Data Retrieve", code: 2 },
    PURCHASE: { state: "Purchase", code: 3 }
};

export const getOrderType = (code) => {
    for (const key in OrderType) {
        if (OrderType[key].code === code) {
            return OrderType[key].state;
        }
    }
    return null;
};