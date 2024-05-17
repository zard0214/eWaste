import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

const request2 = (options) => {
    const headers = new Headers({
        // 'Content-Type': 'multipart/form-data',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function uploadFile(formData) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request2({
        url: API_BASE_URL + "/OSS/upload",
        method: 'POST',
        body: formData
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

// Request handler for getting all users
export function getAllUsers() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/users",
        method: 'GET'
    });
}

// Request handler for getting user information by id
export function getUserById(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/details",
        method: 'POST',
        body: JSON.stringify(id)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function changepwd(signupRequest) {
    return request({
        url: API_BASE_URL + "/user/changepwd",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function getOrders(orderDTO) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/order/list",
        method: 'POST',
        body: JSON.stringify(orderDTO)
    });
}

export function getOrderDetails(orderDTO) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/order/details",
        method: 'POST',
        body: JSON.stringify(orderDTO)
    });
}

export function getProducts() {
    return request({
        url: API_BASE_URL + "/products/all",
        method: 'GET'
    });
}

export function getProductById(productId) {
    return request({
        url: API_BASE_URL + "/products/" + productId,
        method: 'GET'
    });
}

export function getAllBrands(){
    return request({
        url:API_BASE_URL+"/brands/allbrands",
        method: 'Get'
    });
}

export function getSeriesByBrand(seriesPO){
    return request({
        url:API_BASE_URL+"/series/findSeriesByBrandId",
        method: 'POST',
        body: JSON.stringify(seriesPO)
    })
}

export function addOrder(orderDTO){
    return request({
        url:API_BASE_URL+"/order/add",
        method: 'POST',
        body: JSON.stringify(orderDTO)
    })
}

export function getAllSeries(){
    return request({
        url:API_BASE_URL+"/series/allseries",
        method:'GET'
    })
}

export function getThirdPartyPrice(id){
    return request({
        url:API_BASE_URL+"/stores/products/findStoreProductV2BySeriesId/"+ id,
        methodL:'GET'
    })
}

export function getEvaluation(productV2PO){
    return request({
        url:API_BASE_URL+"/order/classificationStrategy",
        method:"POST",
        body: JSON.stringify(productV2PO)
    })
}

export function searchSeries(searchValue){
    return request({
        url:API_BASE_URL+"/series/search?keyword="+ encodeURIComponent(searchValue),
        method:"GET",
    })
}

export function searchProductsV2(searchValue){
    return request({
        url:API_BASE_URL+"/productV2/search?keyword="+ encodeURIComponent(searchValue),
        method:"GET",
    })
}

export function searchProductsV2Type(searchValue){
    return request({
        url:API_BASE_URL+"/productV2/type/search?keyword="+ encodeURIComponent(searchValue),
        method:"GET",
    })
}


export function getAllProductV24Sell(){
    return request({
        url:API_BASE_URL+"/productV2/allproducts4sell",
        method:"GET",
    })
}

export function getUserOrder(orderDTO){
    return request({
        url: API_BASE_URL + "/order/user/list",
        method: 'POST',
        body: JSON.stringify(orderDTO)
    });
}

export function updateOrder(order){
    return request({
        url: API_BASE_URL + "/order/update",
        method: 'PUT',
        body: JSON.stringify(order)
    });
}

export function updateUser(user){
    return request({
        url: API_BASE_URL+"/user/update",
        method: 'POST',
        body:JSON.stringify(user)
    })
}