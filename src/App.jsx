import React from "react";
import { Routes, Route } from "react-router-dom"

import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products"
import Cart from './Cart';
import Detail from './Detail';
import Checkout from "./Checkout";

export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/:category/:id" element={<Detail />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
