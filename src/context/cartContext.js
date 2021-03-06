import React from 'react'
import { useReducer } from 'react';
import cartReducer from '../reducers/cartReducer';
import { useEffect } from 'react';

export const CartContext = React.createContext(null);

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem('cart')) ?? [];
} catch {
  console.error('The cart could not be parsed into JSON');
  initialCart = [];
}

export function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart
  );
  useEffect(() => {
    return localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])

  const contextValue = {
    cart,
    dispatch
  }

  return <CartContext.Provider value={contextValue}>
    {props.children}
  </CartContext.Provider>
}