import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import "./assets/fonts/Sarabun/sarabun.css"

// import 'bootstrap/dist/js/bootstrap.min'
// import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap.min.css'
// import './assets/css/index.css'
import './assets/css/Main.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>
);

reportWebVitals();
