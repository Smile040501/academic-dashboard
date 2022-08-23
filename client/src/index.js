/*!

 =========================================================
 * Material Home React - v1.9.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2020 Creative Tim (https://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

 * Coded by Creative Tim

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import "assets/css/material-dashboard-react.css?v=1.9.0";
import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import { createBrowserHistory } from "history";

import Portal from "layouts/Portal.js";
import store from "redux/store";

const hist = createBrowserHistory();

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
    async (request) => {
        return request;
    },
    async (error) => {
        //TODO: Handle error messages with some UI component
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        //TODO: Handle error messages with some UI component
        return Promise.reject(error);
    }
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hist}>
            <Switch>
                <Route path="" component={Portal} />
                {/*<Redirect from="" to="" />*/}
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);
