import React, { useState, useEffect } from 'react';
import Fruits from './Fruits';
import Vegetables from './Vegetables';
import OtherGroceries from './OtherGroceries';
import './Home.css';
import GrocerySlider from './GrocerySlider';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <div className="home">
      <GrocerySlider />
      <h1>Welcome to Our Store</h1>
      <Fruits products={products.filter(product => product.category === 'Fruits')} />
      <Vegetables products={products.filter(product => product.category === 'Vegetables')} />
      <OtherGroceries products={products.filter(product => product.category === 'Other Groceries')} />
    </div>
  );
};

export default Home;
