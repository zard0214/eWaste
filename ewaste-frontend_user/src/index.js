import React from 'react';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from "react-dom/client";
import {BasketProvider} from "./components/BasketContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <BasketProvider>
        <Router>
            <App />
        </Router>
    </BasketProvider>
)
;


registerServiceWorker();
