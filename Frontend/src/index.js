import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const errorsToWarn = [
    "Warning:",
];

const oldConsError = console.error;
console.error = function(...args) {
    let toWarn= false;
    if (typeof args[0] === 'string') {
        errorsToWarn.map(function(_s) {
            if (args[0].startsWith(_s)) {
                toWarn = true;
            }
        })
    }
    toWarn ? console.warn(...args) : oldConsError(...args);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
