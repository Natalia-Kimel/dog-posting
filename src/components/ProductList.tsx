import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productsSlice';
import ProductCard from './ProductCard';
import { RootState, AppDispatch } from '../store';
import { Link } from 'react-router-dom';
import { Filter as ProductFilter} from '../types';
import Filter from './Filter';

const ProductList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, filter, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  if (loading) return <div className='loading'>Загрузка...</div>;
  if (error) return <div>Error: {error}</div>;
  if (products.length === 0) return <div>Нет доступных собачек.</div>;

  const filteredProducts = filter === ProductFilter.FAVORITES 
    ? products.filter(product => product.liked) 
    : products;

  return (
    <>
    <h3><Link to="/create-product" className="big-button">Добавить карточку</Link></h3>
    <div>
      <Filter />
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div>Нет избранных собачек.</div>
        )}
      </div>
    </div>
    </>
  );
};

export default ProductList;