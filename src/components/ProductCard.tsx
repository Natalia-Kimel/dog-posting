import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleLike, removeProduct } from '../features/productsSlice';
import { ReactComponent as LikeActive } from '../assets/images/like-active.svg';
import { ReactComponent as LikeInactive } from '../assets/images/like-inactive.svg';
import { ReactComponent as DeleteButton } from '../assets/images/delete-button.svg'

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
      <div className='card-button'>
        <button onClick={() => dispatch(toggleLike(product.id))}>
            {product.liked ? <LikeActive /> : <LikeInactive />}
        </button>
        <button onClick={() => dispatch(removeProduct(product.id))}> <DeleteButton /> </button>
      </div>
    </div>
  );
};

export default ProductCard;