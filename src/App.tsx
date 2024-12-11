import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductPage from './components/ProductPage';
import CreateProduct from './components/CreateProduct';

const App: React.FC = () => {
  return (
      <div className="App">
        <h1>Список собачек</h1>
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/" element={<ProductList />} />
        </Routes>
      </div>
  );
};

export default App;