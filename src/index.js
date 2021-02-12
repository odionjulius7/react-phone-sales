import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App1 from './App1';
// import react browser router/ as an alias importation// to wrap around the App Component
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductProvider } from './Context';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ProductProvider>
      <Router>
        <App1 />
      </Router>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
