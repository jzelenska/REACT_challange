import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ title: '', description: '', price: '' });
  const [error, setError] = useState('');
  
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://fakestoreapi.com/products/${id}`, product)
      .then((res) => {
        alert('Product updated!');
        navigate('/Pages', { state: { updatedProduct: res.data } });
      })
      .catch((err) => setError(err));
  };

    return (
    <div className="container mt-4">
      <h2>Edit Product</h2>
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
        <button type="submit" className="btn btn-primary">Update Product</button>
      </form>
      <hr />
        <div className="d-flex justify-content-end mt-4">
          <div className="text-end">
            <Link to={`/products/show/${id}`} className="me-2 text-decoration-none text-primary">
              View
            </Link>
            <span className="mx-1 text-muted">|</span>
            <Link to="/" className="ms-2 text-decoration-none text-primary">
              Back
            </Link>
          </div>
        </div>
    </div>
  );
}