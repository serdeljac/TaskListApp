//First, import React into a JS or TSX File
//Two imports needed: React and ReactDom
import React from 'react';
import ReactDom from  'react-dom/client';
import { BrowserRouter } from 'react-router-dom'


//This is where the HTML and Styles starts
import App from './App.tsx';
import './styles/main.scss';

const APPEND_APP_TO_DOM = document.getElementById("root");

//The ! at the end means HTMLElement | null
ReactDom.createRoot(APPEND_APP_TO_DOM!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);