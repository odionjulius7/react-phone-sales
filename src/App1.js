import React from "react";
// import react browser router in the index.js before u import Switch and the Route indicator in App.js
import { Switch, Route } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Ecommerce-Component/Navbar";
import ProductList from "./Ecommerce-Component/ProductList";
import Details from "./Ecommerce-Component/Details";
import Cart from "./Ecommerce-Component/Cart/Cart";
import Default from "./Ecommerce-Component/Default";
import Modal from './Ecommerce-Component/Modal';


import "./App1.css";

class App1 extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Navbar /> 
                {/* nav won't be included in the switch route cos it will always appear every where */}
                <Switch>
                    <Route exact path="/" component={ProductList}>
                        {/** our home page path/ NOTE: the Exact attribute indicate that this is the home page  */}
                        {/* and to avoid the home page interferring in other page(the exact attribute is needed) */}
                        </Route>
                    <Route path="/details" component={Details}>{/** details page path */}</Route>
                    <Route path="/cart" component={Cart}>{/** cart page path */}</Route>
                    <Route component={Default}>{/** not need for the Default path since it will automatic disply once there is a wrong page request*/}</Route>   
                </Switch>
                <Modal />
            </React.Fragment>
        );
    }
}

export default App1;