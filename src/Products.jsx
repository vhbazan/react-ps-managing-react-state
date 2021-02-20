import React, { useState, useEffect } from "react";

import { getProducts } from './services/productService';

export default function Products() {

  const [size, setSize] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts("shoes").then(response => {
      setProducts(response);
    }).catch(e => {
      setError(e)
    });
  }, []);

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  const fileteredProducts = size
    ? products.filter(product => product.skus.find((s) => s.size === parseInt(size)))
    : products;
  if (error) throw error;
  return (
    <div>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select id="size" onChange={(e) => setSize(e.target.value)} value={size}>
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        {size && <h2>Found {fileteredProducts.length} items </h2>}
      </section>
      <section id="products">
        {fileteredProducts.map(renderProduct)}
      </section>
    </div>
  );
}