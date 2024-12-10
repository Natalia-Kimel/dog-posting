import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../features/productsSlice';
import { Filter as ProductFilter} from '../types';
import { RootState } from '../store';

const Filter = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.products.filter);

  return (
    <div className="filter-container">
      <button
        className={`filter-button ${currentFilter === ProductFilter.ALL ? 'active' : ''}`}
        onClick={() => dispatch(setFilter(ProductFilter.ALL))}
      >
        Все
      </button>
      <button
        className={`filter-button ${currentFilter === ProductFilter.FAVORITES ? 'active' : ''}`}
        onClick={() => dispatch(setFilter(ProductFilter.FAVORITES))}
      >
        Избранные
      </button>
    </div>
  );
};

export default Filter;