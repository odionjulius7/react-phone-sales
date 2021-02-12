import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import { ProductConsumer } from '../Context';

class Product extends Component {
    // 

    render() {
        const {id, title, img, price, inCart} = this.props.product;
        return (
            <ProductWrapper className="col-9 mx-auto col-md-6 col-xl-3 my-3">
                <div className="card">
                    <ProductConsumer>
                        {value => {
                            // we want to pass the value's method that handles getting each item
                            // from the Consumer context.js
                            return (
                                <div className="img-container p-5" onClick={() => value.handleDetails(id)}>
                                    {/* onClick={() => value.handleDetails(this.props.product.id)} */}
                                    <Link to="/details">
                                        <img src={img} alt="product" className="card-img-top" />
                                    </Link>
                                    {/* the disabled attribute will be true when the item is in the cart and vise versa
                                        if inCart returns false the disable returns false as well
                                        note: the button becomes disabled or enable base on inCart value
                                    */}
                                    <button 
                                        className="cart-btn" 
                                        disabled={inCart? true : false} 
                                        onClick={()=> { 
                                            value.addToCart(id);
                                            value.openModal(id);
                                        }}>
                                        {inCart ? (
                                            // once the disable in the button receives a value of the inCart as true this paragraph tag will appear
                                                <p className="text-capitalize mb-0" disabled>
                                                    in cart
                                                </p>
                                                ) :
                                                (
                                            // once the disable in the button receives a value of the inCart as false this icon tag will appear        
                                                <span><i className="fas fa-cart-plus" /> add</span> 
                                                )}
                                    </button>
                                </div>
                            )
                        }}
                    </ProductConsumer>    
                    {/* card footer */}
                    <div className="card-footer d-flex justify-content-between">
                        <p className="self-align-center mb-0">
                             {title}           
                        </p>
                         <h5 className="text-blue font-italic mb-0">
                            <span className="mr-1">$</span> 
                            {price}    
                        </h5>               
                    </div>
                </div>
            </ProductWrapper>
        );
    }
}

// the component Product
Product.propTypes = {
    // the object(props) product
    product:PropTypes.shape({
        id:PropTypes.number,
        img:PropTypes.string,
        title:PropTypes.string,
        price:PropTypes.number,
        inCart:PropTypes.bool
    }).isRequired
};


const ProductWrapper = styled.div`
    overflow: hidden;
    .card{
        border-colors: transparent;
        transiton: all 1s linear;
    }
    .card-footer {
        background: transparent;
        border-top: transparent;
        transiton: all 1s linear;
        // visibility: hidden;
       // transform: translate(100%, 100%); 
    }
    &:hover {
        .card {
            border: 0.04rem solid rgba(0,0,0,0.2);
            box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
        }
       .card-footer {
           background: rgba(247, 247, 247);
           //transform: translate(0%, 0%);
           // visibility: visible; 
       }  
    }
    .img-container {
        position: relative;
        overflow: hidden;
    }
    .img-container .card-img-top {
        min-height: 157px;
        transition: width 2s, height 2s, transform 2s;
    }
    .img-container:hover .card-img-top {
        transform: scale(1.2);
    }

    .cart-btn {
        position: absolute;     
        bottom: 0;
        right: 0;
        padding: 0.2rem 0.4rem;
        background: var(--lightBlue);
        border: none;
        color: var(--mainWhite);
        border-top-left-radius: 0.5rem;
        transform: translate(100%, 100%); //**
        * that is to hid it from view but will become visible once hover effect happen
         we actually move the btn 100% down away from view(overflow:hidden) and 100% right 
        */    
       transition: all 1s linear;
    }

    
    // if u want the effect to happen while u hover over the container use the container
    //    first before (:hover and then attach the child after)
    //    but if u just want it while u hover over the particular tag then do the usual 

    .img-container:hover .cart-btn {
        transform: translate(0, 0);
    }

    .cart-btn:hover {
        color: var(--mainBlue);
        cursor: pointer;
    }
`;

export default Product;