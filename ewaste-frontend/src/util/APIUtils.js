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

export function getNumberofUserPerRole(){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/users/roledata",
        method: 'GET'
    });
}

export function getTotalStaffAndRegisteredUserCount(){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/users/totalstaff",
        method: 'GET'
    });
}

// Request handler for getting user information by id
export function getUserById(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/users/" + id,
        method: 'GET',
    });
}

// Request handler for updating user
export function updateUser(user) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: `${API_BASE_URL}/users/${user.id}`,
        method: 'PUT',
        body: JSON.stringify(user)
    });
}

export function saveUser(user) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: `${API_BASE_URL}/users/add`,
        method: 'POST',
        body: JSON.stringify(user)
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
export function addUserRole(signupRequest) {
    return request({
        url: API_BASE_URL + "/user/addUserRole",
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

export function getAllOrders() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/order/all",
        method: 'GET'
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
        url: API_BASE_URL + "/products/allproduct",
        method: 'GET'
    });
}

export function getProductV2() {
    return request({
        url: API_BASE_URL + "/productV2/allproducts",
        method: 'GET'
    });
}

export function getProductV2ById(productId) {
    return request({
        url: API_BASE_URL + "/productV2/" + productId,
        method: 'GET'
    });
}


export function getStores() {
    return request({
        url: API_BASE_URL + "/stores/all",
        method: 'GET'
    });
}

export function getBrands() {
    return request({
        url: API_BASE_URL + "/brands/allbrands",
        method: 'GET'
    });
}

export function getSeries() {
    return request({
        url: API_BASE_URL + "/series/allseries",
        method: 'GET'
    });
}

export function findSeriesByBrandId(brandId) {
    return request({
        url: API_BASE_URL + "/series/findSeriesByBrandId/" + brandId,
        method: 'GET'
    });
}

export function getStoresProductV2() {
    return request({
        url: API_BASE_URL + "/stores/products/all",
        method: 'GET'
    });
}

export function saveStores(product) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/stores/add",
        method: 'POST',
        body: JSON.stringify(product)
    });

}
export function saveBrands(product) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/brands/add",
        method: 'POST',
        body: JSON.stringify(product)
    });

}
export function saveSeries(series) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/series/add",
        method: 'POST',
        body: JSON.stringify(series)
    });

}

export function saveStoreProducts(series) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/stores/products/add",
        method: 'POST',
        body: JSON.stringify(series)
    });

}

export function updateStores(brands) {
    return request({
        url: `${API_BASE_URL}/stores/${brands.id}`,
        method: 'PUT',
        body: JSON.stringify(brands)
    });
}


export function updateBrands(brands) {
    return request({
        url: `${API_BASE_URL}/brands/${brands.id}`,
        method: 'PUT',
        body: JSON.stringify(brands)
    });
}

export function updateSeries(series) {
    return request({
        url: `${API_BASE_URL}/series/${series.id}`,
        method: 'PUT',
        body: JSON.stringify(series)
    });
}

export function updateStoreProducts(series) {
    return request({
        url: `${API_BASE_URL}/stores/products/${series.id}`,
        method: 'PUT',
        body: JSON.stringify(series)
    });
}


export function getBrandById(brandId) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/brands/" + brandId,
        method: 'GET'
    });
}
export function getStoreById(brandId) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/stores/" + brandId,
        method: 'GET'
    });
}

export function getSeriesById(seriesId) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/series/" + seriesId,
        method: 'GET'
    });
}

export function getProductById(productId) {
    return request({
        url: API_BASE_URL + "/products/" + productId,
        method: 'GET'
    });
}
export function getStoreProductById(productId) {
    return request({
        url: API_BASE_URL + "/stores/products/" + productId,
        method: 'GET'
    });
}

export function saveProduct(product) {
    return request({
        url: `${API_BASE_URL}/products/add`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
}

export function updateProduct(product) {
    return request({
        url: `${API_BASE_URL}/products/${product.productId}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
}

export function updateOrder(order) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/order/update",
        method: 'PUT',
        body: JSON.stringify(order)
    });
}

export function sendEmail(email, operatorName, username, dataUrl) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/email/notify",
        method: 'POST',
        body: JSON.stringify({email, operatorName, username, dataUrl})
    });
}

export function sendContactUs(email, operatorName, username) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/email/contact",
        method: 'POST',
        body: JSON.stringify({email, operatorName, username})
    });
}

export function updateProductV2(product) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: `${API_BASE_URL}/productV2/update`,
        method: 'PUT',
        body: JSON.stringify(product)
    });
}

export function updateUserV2(product) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: `${API_BASE_URL}/user/update`,
        method: 'POST',
        body: JSON.stringify(product)
    });
}

export function upgradeUserToStaff(user) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: `${API_BASE_URL}/user/upgrade`,
        method: 'POST',
        body: JSON.stringify(user)
    });
}

export function downgradeUserToStaff(user) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: `${API_BASE_URL}/user/downgrade`,
        method: 'POST',
        body: JSON.stringify(user)
    });
}
