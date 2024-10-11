import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, removeProduct } from '../features/productSlice';
import './Products.css';

function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);

  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.description) {
      dispatch(addProduct({ 
        id: productList.length + 1,
        name: newProduct.name, 
        price: newProduct.price, 
        description: newProduct.description 
      }));
      setNewProduct({ id: '', name: '', price: '', description: '' });
    }
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <div className="container">
      <h2>Product List</h2>
      <ul className="product-list">
        {productList.map((product) => (
          <li key={product.id} className="product-item">
            <Link to={`/product/${product.id}`}>
              {product.name} - {product.price}
            </Link>
            <button onClick={() => handleRemoveProduct(product.id)} className="remove-btn">Remove</button>
          </li>
        ))}
      </ul>
      
      <h3>Add a New Product</h3>
      <form onSubmit={handleAddProduct} className="product-form">
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={newProduct.name} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input 
            type="text" 
            name="price" 
            value={newProduct.price} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Details:</label>
          <input 
            type="text" 
            name="description" 
            value={newProduct.description} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div className="button-container">
        <button type="submit" className="add-btn">Add Product</button>
        </div>
      </form>
    </div>
  );
}

export default Products;
