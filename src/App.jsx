import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom"

import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products"
import Cart from './Cart';
import Detail from './Detail';
import { useState } from "react";
import Checkout from "./Checkout";
export default function App() {

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) ?? [];
    } catch {
      console.error('The cart could not be parsed into JSON');
      return []
    }
  }
  );
  useEffect(() => {
    return localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])

  function addToCart(id, sku) {
    console.log('addToCart')
    setCart((items) => {
      const itemInCart = items.find((item) => item.sku === sku);
      if (itemInCart) {
        return items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...items,
      { id, sku, quantity: 1 }
      ]
    })
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      return quantity === 0
        ? items.filter(item => item.sku !== sku)
        : items.map(i => i.sku === sku ? { ...i, quantity } : i)
    })
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />} />
            <Route path="/:category/:id" element={<Detail addToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
