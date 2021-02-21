import React from "react";
import { Routes, Route } from "react-router-dom"

import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products"
import Cart from './Cart';
import Detail from './Detail';
import { useState } from "react";
export default function App() {

  const [cart, setCart] = useState([]);

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

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/:category/:id" element={<Detail addToCart={addToCart} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
