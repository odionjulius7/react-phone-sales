import React, { Component } from "react";
import styled from "styled-components";
// we need import link to aid us in linking to the designated routes
import { Link } from "react-router-dom";  
import logo from "../logo.png";

import {ButtonContainer} from './Button'


class Navbar extends Component {

    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm bg-primary navbar-dark px-sm-5">
                 <Link to="/">
                    <img src={logo} alt="logo" className="navbar-brand" style={{height: '60px'}} />
                 </Link>
                 <ul className="navbar-nav align-items-center"> 
                   <Link to="/" className="nav-link">
                        <li className="nav-item ml-5">
                            products
                        </li>
                    </Link>
                 </ul>
                 <Link to="/cart" className="ml-auto">
                     <ButtonContainer>
                         <span className="mr-2">
                             <i className="fas fa-cart-plus" />
                         </span>
                         my cart 
                     </ButtonContainer>    
                 </Link>
            </NavWrapper>
        )
    }
}

export const NavWrapper = styled.nav`
background: var(--mainBlue)!important;
.nav-link {
    color: var(--mainWhite)!important;
    font-size: 1.3rem;
    text-transform: capitalize;
}
`;



export default Navbar;



