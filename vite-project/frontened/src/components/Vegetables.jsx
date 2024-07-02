import React from 'react';
import ProductList from './ProductList';

const Vegetables = ({ products }) => {
  return (
    <div>
      <h2>Vegetables</h2>
      <ProductList products={products} />
    </div>
  );
};

export default Vegetables;
