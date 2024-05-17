import React, { useEffect, useState } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import { Navigate } from 'react-router-dom'
import { useLocation, useNavigation } from "react-router-dom";

function OAuth2RedirectHandler() {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        const error = queryParams.get('error');
        setData(token);
        setError(error);
        if(token){
            localStorage.setItem(ACCESS_TOKEN, token);
            window.location.href = "/login";
        }else{
            window.location.href = "/homepage";
        }

    }, [location.search]);
    return null
}

export default OAuth2RedirectHandler;
