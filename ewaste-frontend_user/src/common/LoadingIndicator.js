import React from 'react';
import {Skeleton} from "antd";

export default function LoadingIndicator(props) {
    return (
        <div className="loading-indicator" style={{display: 'block', textAlign: 'center', marginTop: '30px'}}>
            <Skeleton></Skeleton>
        </div>
    );
}
