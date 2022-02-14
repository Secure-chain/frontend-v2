import React from 'react';
import Header from '../../components/header/Header';
import CreateProductContent from '../../components/content/CreateProductContent';
function CreateProduct({ addProduct }) {
  return (
  <div>
    <Header title='Create Product' />
    <CreateProductContent addProduct={addProduct}/>
  </div>
  );
}

export default CreateProduct;
