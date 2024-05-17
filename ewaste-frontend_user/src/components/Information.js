import React, { useState, useEffect } from 'react';
// 导入 useNavigate 钩子
import { useNavigate } from 'react-router-dom';
import { Alert, Spin, Switch } from 'antd';

const Information = () => {
    const [countdown, setCountdown] = useState(3);
    // 使用 useNavigate 获取导航函数
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            } else {
                clearInterval(timer);
                navigate('/re-homepage');
            }
        }, 1000);

        // 清理定时器
        return () => clearInterval(timer);
    }, [countdown, navigate]);

    return (
        <div style={{ height: '550px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '33%', borderRadius: '3%', backgroundColor: 'lightyellow', padding: '20px', textAlign: 'center' }}>
                <p>The items you sell will be displayed on the website after being validated!</p>
                <p>Redirecting in {countdown} seconds...</p>
            </div>
        </div>
    );
};

export default Information;

