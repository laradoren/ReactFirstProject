import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store  from './state/state'
import {BrowserRouter} from "react-router-dom";

export let rerenderTree = (state) => {
  ReactDOM.render(
    <BrowserRouter>
      <App state = {state} dispatch = {store.dispatch.bind(store)} />
    </BrowserRouter>, document.getElementById('root'));
};

