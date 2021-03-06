import React, { useState } from "react";

import useFetch from './useFetch';
import Spinner from './Spinner';
import { useParams, Link } from "react-router-dom";
import PageNotFound from "./PageNotFound";

export default function Products() {

  const [size, setSize] = useState("");
  const { category } = useParams();

  const { data: products, error, loading } = useFetch(
    `products?category=${category}`
  )

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">

        <Link to={`/${category}/${p.id}`}>
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Link>
      </div>
    );
  }

  const fileteredProducts = size
    ? products.filter(product => product.skus.find((s) => s.size === parseInt(size)))
    : products;
  if (error) throw error;
  if (loading) return <Spinner />
  if (products.length === 0) return <PageNotFound />
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
