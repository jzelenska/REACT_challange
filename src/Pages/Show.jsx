import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Show() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} className="img-fluid mb-3" style={{ maxWidth: '200px' }} />
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
        <Link to="/">Back</Link>
         <span className="mx-1 text-muted">|</span>
        <Link to={`/products/Edit/${id}`}>Edit</Link>
    </div>
  );
}


