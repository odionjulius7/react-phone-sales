import React from 'react';
import CartItem from './CartItem';

function CartList({value}) {
    const {cart} = value;
    return (
        <div className="container-fluid">
            {cart.map(item => {
              return  <CartItem key={item.id} item={item} value={value} />
                // the value props here is needed for the child to have access to it context.js method
            })}
            
        </div>
    )
}

export default CartList;
