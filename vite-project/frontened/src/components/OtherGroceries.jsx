import React from 'react';
import ProductList from './ProductList';

const OtherGroceries = ({ products }) => {
  return (
    <div>
      <h2>Other Groceries</h2>
      <ProductList products={products} />
    </div>
  );
};

export default OtherGroceries;
