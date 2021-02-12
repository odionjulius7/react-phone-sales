// context api
import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
// context object comes with Provider and Consumer


// if u want all the component to have access to ProductProvider u will import it in the index,js
// that is the highest point to supply the data for consumption
class ProductProvider extends Component {

  // we wouldn't want where we change an object it affect other object or somethin lik dat
  state = {
      products: [],//we'll use a func to copy the original array and to avoid receiving the modified ones
      detailProduct: detailProduct,
      cart: [],
      modalOpen: false,
      modalProduct: detailProduct,
      cartSubTotal: 0,
      cartTax: 0,
      cartTotal: 0
  }

  componentDidMount() {
    this.setproducts();
  }

  // note: if we want to keep the original value that originally assign and not the modified value
  // i.e we want to copy and not reference the storeProducts values, to avoid state receiving the modified ones;
 setproducts = () => {
   let tempProducts = [];
   storeProducts.forEach((item) => {
      const singleItem = {...item}// here the destructuring of the objects items in an array
      // it certainly gives us an hedge in getting the copied(origin) version of the objects in the storeProduct array
      // if we had referenced it, te storProducts would also be changed when ever we make changes to our state.product object.
      // we want to keep our storeProducts/database as it is(unchange), only state should change
      tempProducts = [...tempProducts, singleItem];
       // note we also copied(not referenced our former tempProducts..either empty or not to the tempProducts)
      // we fill our tempProduct/state Product dat was an empty aray with the copied objects from the storProducts
   })
   this.setState(() => {
      return {products: tempProducts}
   }) // to avoid binding // always return 
 }

  getSingleItem = id => {
      const product = this.state.products.find(item => item.id === id);
      return product;
  }

  handleDetails = id => {
    const product = this.getSingleItem(id);
    this.setState(() => {
       return {detailProduct: product};
    });
  };

  // Cart updating

  addToCart = id => {
    // we don't want to mutate the state object here that is the reason for destructure copying and not referncing the state object.
    let tempProducts = [...this.state.products];

    // checkin to see if the clicked item.id is an index of tempProducts.
    // if yes, we would want to change it specific details without affecting the whole state object.
    // then pass that value to the var index
    const index = tempProducts.indexOf(this.getSingleItem(id));

    // now pass each clicked item of the tempproducts to a new variable 
    // just as if you want to loop each one and make singular changes on them
    const product = tempProducts[index];
    
    // start making changes to each clicked index/key of array's value(eack is an object: so change the key object value in it)
    product.inCart = true; // was false in data.js
    product.count = 1;
    const price = product.price; // we could have it like" this.state.products[index].price 
    product.total = price;

    this.setState(() => {
      return {
        products: tempProducts,//we copied the state.poducts value back and it remains unchanged, we repopulate the state products 
        cart: [...this.state.cart, product] // we always need to add(empty or not) the current/former value first before we add the new vlues in
      }
    }, () => this.addTotals() );// we just used the call back function to make changes to the cartSubTotal, cartTotal ..., when ever addToCart is clicked
  };

  // our openModal will pass tehe singular id(item) to the modalProduct object 
  // when ever that particular item is clicked the modal passs both the 
  // single product and then make the modalOpen true.
  openModal = id => {
    const product = this.getSingleItem(id);
    this.setState(() => {
      return {
        modalProduct: product,
        modalOpen: true
      };
    })
  };

  closeModal = () => {
    this.setState(() =>{
      return {modalOpen: false}
    })
   };

  increment = (id) => {
     let tempCart = [...this.state.cart];
     const selectedProduct = tempCart.find(item => item.id === id);// find out if the clicked id match the one in the cart

     // get the index position of that single id and make change to it alone
     const index = tempCart.indexOf(selectedProduct);// get the index of selectedProduct object in tempProducts array 
     const product = tempCart[index];// assume that selectedProduct is at index 1 or 3 on the arrary
     // we make change to tempProducts but only to that particular array position of tha clicked id

     // it just as if we cut out that single id position and make changes to it inside the cart array and then push back there and set state new value
    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(()=>{
      return {cart: [...tempCart]}
    }, () => {
      this.addTotals();//always run the call back funct that set the total/ reset the total after all the changes
    })
  }

  decrement = (id) => {
    let tempCart = [...this.state.cart];
     const selectedProduct = tempCart.find(item => item.id === id);

     const index = tempCart.indexOf(selectedProduct);
     const product = tempCart[index];// assume that selectedProduct is at index 1 or 3 on the arrary
     product.count = product.count - 1;

     if( product.count === 0 ) {
        return this.removeItem(id);
     } else {
       product.total = product.count * product.price;

       this.setState(()=>{
          return {cart: [...tempCart]}
        }, () => {
          this.addTotals();
        })       
     }
    
  }

  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    // we filtered all the items in the cart array that doesn't match the clicked one back into tempCart
    // that means the clicked item is trasheds
    tempCart = tempCart.filter(item => item.id !== id);

    const index = tempProducts.indexOf(this.getSingleItem(id));
    const removeProduct = tempProducts[index];
    removeProduct.inCart = false; 
    removeProduct.count= 0;
    removeProduct.total = 0;

    this.setState(()=> {
      return {
        products: [...tempProducts],
        cart: [...tempCart]
      }
    }, () =>{
       this.addTotals();
    })
  }

  clearCart = () => {
    this.setState(()=> {
      return {cart: []};// but note that event if cart is empty the state.product changes remains the same and the cartTotal also.  
    }, ()=> {
      // so running this second call back func in the setState set d product to it original unchanged items 
       // remember we used dis one to get the exact copy of the original datas from the database and not the refernced one.
       // which mean that db is not change but just our state.product that did
      this.setproducts();

      // also run the addTotals so as to set the new cartTotal, carttax .. that cart is empty and the figures are 0.
      this.addTotals();// it will loop thru the empty cart each time clearCart() is called and add up the cartSubtoal, cartTax, .. and it will all amount to zero       
    })
  }

  //after adding the cartSubTotal, cartTotal ..., we can make it a call back function the addToCart() as the second argument in its setState()
  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => {
      return subTotal += item.total; // the to price in cart of each item will be
      // added to the subTotal object each time they are added to cart object
    })
    const tempTax = subTotal * 0.1; // 10% of the price 10%/100%
    const tax = parseFloat(tempTax.toFixed(2)); // to reduce the amount of number after the decimal point i.e $10.20cent
    const total = subTotal + tax;

    this.setState(()=>{
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      }
    })
  }


  render() {
    return (
        // it provide data to children component
        <ProductContext.Provider value={{
            // this is the same: products: this.state.product and detailProduct: this.state.detailProduct
            ...this.state, //destructuring
            handleDetails: this.handleDetails,
            addToCart: this.addToCart,
            openModal: this.openModal,
            closeModal: this.closeModal,
            increment: this.increment,
            decrement: this.decrement,
            removeItem: this.removeItem,
            clearCart: this.clearCart
        }}>
            { this.props.children }
        </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer; // it will accept all info in the productContext(which include ProductProvider component)

export {ProductProvider, ProductConsumer};