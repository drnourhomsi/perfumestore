'use client';

import { useProductContext } from '@/context/ProductProvider';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function Products() {
  const { products, setProducts } = useProductContext();
  const [uniqueProducts, setUniqueProducts] = useState([]);

  useEffect(() => {
    const filterUniqueProducts = (items) => {
      const seenTitles = new Map();

      for (const item of items) {
        seenTitles.set(item.title, item);
      }

      return Array.from(seenTitles.values());
    };

    // Apply the filtering function to the products and update the state
    const uniqueProductsList = filterUniqueProducts(products);
    setUniqueProducts(uniqueProductsList);

    console.log(uniqueProductsList);
  }, [products]);

  return (
      <div>
      {uniqueProducts.map((product, index) => (
        <div key={index}>
              <h3>{product.title}</h3>
              <Image src={`https://cdn.filestackcontent.com/${product.file}`} alt={product.title} width={200} height={200} />
        </div>
      ))}
    </div>
  );
}

export default Products;
