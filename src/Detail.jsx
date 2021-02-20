import React from "react";
import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import Spinner from './Spinner';
import PageNotFound from "./PageNotFound";

export default function Detail() {

  const { id } = useParams();

  const { data: product, error, loading } = useFetch("products/" + id);

  if (loading) return <Spinner />
  if (!product) return <PageNotFound />
  if (error) throw error;
  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
