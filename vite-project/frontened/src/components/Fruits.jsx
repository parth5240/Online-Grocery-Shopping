import React from 'react';
import ProductList from './ProductList';

const Fruits = ({ products }) => {
  return (
    <div>
      <h2>Fruits</h2>
      <ProductList products={products} />
    </div>
  );
};

export default Fruits;
