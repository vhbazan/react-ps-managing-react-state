import React from 'react'
import { useReducer, useEffect } from 'react';
import cartReducer from '../reducers/cartReducer';
import { useContext } from 'react';

const CartContext = React.createContext(null);

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

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider. Wrap a parent component in <CartProvider> to fix the error.')
  }
  return context;
}