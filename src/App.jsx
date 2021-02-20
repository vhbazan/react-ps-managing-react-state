import React from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products"
import { Routes, Route } from "react-router-dom"
import Cart from './Cart';
import Detail from './Detail';
export default function App() {


  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/detail" element={<Detail />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
