'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ProductsContext = createContext(undefined);
const contextTarget = 'products';

export function ProductsProvider({ children }) {

  const [products, setProducts] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(window.localStorage.getItem(contextTarget)) || [];
    }
    
  });

  useEffect(() => {
    localStorage.setItem(contextTarget, JSON.stringify(products));
  }, [products]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductsContext);
}