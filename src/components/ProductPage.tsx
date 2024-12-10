// src/components/ProductPage.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const products = useSelector((state: any) => state.products.products);
  const product = products.find((p: any) => p.id === id);

  if (!product) {
    return <div>Собачка не найдена</div>;
  }

  const breedName = product.breeds.length > 0 ? product.breeds[0].name : 'Порода неизвестна';
  const temperament = product.breeds.length > 0 ? product.breeds[0].temperament : 'Темперамент неизвестен';

  return (
    <div>
      <h2>{breedName}</h2>
      <img src={product.url} alt={breedName} />
      <p>Темперамент: {temperament}</p>
      <Link to="/products" className="big-button">Назад к списку собачек</Link>
    </div>
  );
};

export default ProductPage;