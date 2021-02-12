import React, { Component } from "react";
import Product from "./Product";
import Title from './Title';

// import {storeProducts} from '../data';
import {ProductConsumer} from '../Context';

class ProuctList extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="our" title="products" />
                        <div className="row">
                            <ProductConsumer>
                                {/* accessing the value of ProductConsumer from context// and it's the parent component */}
                                {(value) => {
                                    return value.products.map(product => {
                                        return <Product product={product} key={product.id} />
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ProuctList;