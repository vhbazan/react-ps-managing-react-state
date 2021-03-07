import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Fetch } from './useFetch';
import Spinner from './Spinner';
import PageNotFound from "./PageNotFound";
import { useCart } from "./context/cartContext";

export default function DetailWrapper() {
  const { dispatch } = useCart();
  const { id } = useParams();
  return (
    <Detail
      id={id}
      navigate={useNavigate()}
      dispatch={dispatch}
    />
  )
}

class Detail extends React.Component {
  state = {
    sku: ''
  }
  render() {
    const { id, navigate, dispatch } = this.props;
    const { sku } = this.state;
    return (
      <Fetch url={`products/${id}`} render={
        (product, loading, error) => {
          if (loading) return <Spinner />
          if (!product) return <PageNotFound />
          if (error) throw error;
          return (
            <div id="detail">
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <p id="price">${product.price}</p>
              <select id="size" onChange={(e) => this.setState({ sku: e.target.value })}
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
          )
        }
      }
      />
    );
  }
}


