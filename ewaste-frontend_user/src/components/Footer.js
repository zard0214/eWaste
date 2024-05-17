import React from 'react';
import './Footer.css'; // 假设你的样式保存在这个文件里

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <a href="/">Introduction</a>
                <a href="/about">About eWaste</a>
                <a href="/community">Community</a>
                <a href="/safety">Safety Centre</a>
                <a href="/sellercentre">Seller Centre</a>
                <a href="/vero">VeRO: Protecting Intellectual Property</a>
                <a href="/policies">Policies</a>
                <a href="/help">Help & Contact</a>
                <a href="/sitemap">Site Map</a>
            </div>
            <div className="footer-bottom">
                <p>Copyright © 1995-2024 eWaste Inc. All Rights Reserved. <a href="/user-agreement">User Agreement</a>, <a href="/privacy">Privacy</a>, <a href="/payments">Payments Terms of Use</a></p>
            </div>
        </footer>
    );
};

export default Footer;
