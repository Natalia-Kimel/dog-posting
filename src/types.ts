export interface Breed {
    name: string;
    temperament: string;
  }

export enum Filter {
    ALL = 'all',
    FAVORITES = 'favorites',
  }
  
  export interface Product {
    id: string;
    url: string;
    breeds: Breed[];
    liked: boolean;
  }
  
    interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
    filter: Filter,
    searchTerm: string,
  }
  
  export const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null,
    filter: Filter.ALL,
    searchTerm: '',
  };