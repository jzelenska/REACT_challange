import React from 'react';
import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

    useEffect(() => {
    fetchProducts();
  }, [reload]);

  const fetchProducts = () => {
  const stored = localStorage.getItem('products');
  if (stored) {
    setProducts(JSON.parse(stored));
  } else {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        localStorage.setItem('products', JSON.stringify(res.data));
      })
      .catch(err => setError(err));
  }
};

  useEffect(() => {
    console.log("Location state:", location.state);
    if (location.state?.updatedProduct) {
      const updated = location.state.updatedProduct;
      setProducts(prev =>
        prev.map(p => (p.id === updated.id ? updated : p))
      );
    }
    if (location.state?.newProduct) {
      const newItem = location.state.newProduct;
      setProducts(prev => [newItem, ...prev]);
    }
  }, [location.state]);

  const handleDelete = (id) => {
  axios.delete(`https://fakestoreapi.com/products/${id}`)
    .then(() => {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStorage.setItem('products', JSON.stringify(updated)); // ✅ update localStorage
      alert('Product deleted successfully');
    })
    .catch(err => setError(err));
};

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Product List</h2>
        <Link to="/products/new">Add New Product</Link>
      </div>

      {error && <div className="alert alert-danger">{error.message}</div>}

      {products.length === 0 ? (
        <p className="text-center">No products available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Price ($)</th>
                <th scope="col" style={{ width: '220px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.description.slice(0, 100)}...</td>
                  <td>{product.price}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button onClick={() => navigate(`/products/show/${product.id}`)} className="btn btn-primary btn-sm">View</button>
                      <button onClick={() => navigate(`/products/edit/${product.id}`)} className="btn btn-warning btn-sm">Edit</button>
                      <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}