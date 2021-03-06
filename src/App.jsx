import React, { useEffect, useReducer } from "react";
import { Routes, Route } from "react-router-dom"

import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products"
import Cart from './Cart';
import Detail from './Detail';
import Checkout from "./Checkout";
import cartReducer from './reducers/cartReducer';
import { CartContext } from './context/cartContext';

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem('cart')) ?? [];
} catch {
  console.error('The cart could not be parsed into JSON');
  initialCart = [];
}

export default function App() {


  const [cart, dispatch] = useReducer(cartReducer, initialCart
  );
  useEffect(() => {
    return localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/cart" element={<Cart cart={cart} dispatch={dispatch} />} />
            <Route path="/:category/:id" element={<Detail dispatch={dispatch} />} />
            <Route path="/checkout" element={<Checkout cart={cart} dispatch={dispatch} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartContext.Provider>
  );
}
