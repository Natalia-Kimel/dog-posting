import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleLike, removeProduct } from '../features/productsSlice';

interface ProductCardProps {
  product: {
    id: string;
    url: string;
    breeds: { name: string }[];
    liked: boolean;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const breedName = product.breeds.length > 0 ? product.breeds[0].name : 'Unknown Breed';

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.url} alt={breedName} />
        <h3>{breedName}</h3>
      </Link>
      <button onClick={() => dispatch(toggleLike(product.id))}>
        {product.liked ? '❤️' : '🤍'}
      </button>
      <button onClick={() => dispatch(removeProduct(product.id))}>Удалить</button>
    </div>
  );
};

export default ProductCard;