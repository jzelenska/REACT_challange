import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function New() {
    const [product, setProduct] = useState({ title: '', description: '', price: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

      const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://fakestoreapi.com/products', product)
      .then((res) => {
        alert('New product added!');
        navigate('/Pages', { state: { newProduct: res.data } });
      })
      .catch((err) => setError(err));
  };

  return (
    <div className="container mt-4">
      <h2>Add New Product</h2>
      {error && <div className="alert alert-danger">{error.message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input name="title" value={product.title} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} className="form-control" rows={4} required />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input name="price" value={product.price} onChange={handleChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-success">Add Product</button>
      </form>
      <Link to="/">Back</Link> 
    </div>
  );
}