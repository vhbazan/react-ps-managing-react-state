import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import Spinner from './Spinner';
import PageNotFound from "./PageNotFound";
import { useCart } from "./context/cartContext";

export default function Detail() {
  const { dispatch } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, error, loading } = useFetch("products/" + id);
  const [sku, setSku] = useState("");
  if (loading) return <Spinner />
  if (!product) return <PageNotFound />
  if (error) throw error;
  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select id="size" onChange={(e) => setSku(e.target.value)}
        value={sku}>
        <option value="">What size?</option>
        {product.skus.map(sku => (
          <option value={sku.sku} key={sku.sku}>{sku.size}</option>
        ))}
      </select>
      <p>
        <button className="btn btn-primary" disabled={!sku}
          onClick={() => {
            dispatch({ type: 'ADD', id: product.id, sku });
            navigate("/cart")
          }}>Add to Cart</button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
