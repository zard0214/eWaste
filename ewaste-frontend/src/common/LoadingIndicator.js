import React, {useState, useEffect} from 'react'
import {Skeleton} from "antd";

export default function LoadingIndicator(props) {
    // const [isLoading, setIsLoading] = useState(true);
    //
    // const showLoadingIndicator = () => {
    //     setTimeout(() => {
    //         setIsLoading(true);
    //     }, 3000);
    // };
    //
    // const hideLoadingIndicator = () => {
    //     setIsLoading(false);
    // };
    //
    // React.useEffect(() => {
    //     showLoadingIndicator();
    // }, []);
    //
    // if (!isLoading) {
    //     return null;
    // }

    return (
        <div className="loading-indicator" style={{display: 'block', textAlign: 'center', marginTop: '30px'}}>
            <Skeleton active={true}></Skeleton>
        </div>
    );
}
