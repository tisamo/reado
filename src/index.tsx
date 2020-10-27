import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {ToastContainer,toast,Zoom, Bounce} from "react-toastify";
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
ReactDOM.render(

  <React.Fragment>
    <App  />
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
