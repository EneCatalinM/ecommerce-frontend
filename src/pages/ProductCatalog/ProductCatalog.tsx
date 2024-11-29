import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, searchProducts } from '../../services/productService';
import styles from './ProductCatalog.module.scss';
import { Loading } from '../../components/Loading';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

const ProductCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPrice, setFilterPrice] = useState<'low' | 'high' | ''>('');
  const navigate = useNavigate();

  // Debounce pentru căutarea produselor
  const debouncedFetchProducts = useCallback(
    debounce(async (query: string) => {
      try {
        setLoading(true);
        if (query) {
          const data = await searchProducts(query);
          setProducts(data);
        } else {
          const data = await getAllProducts();
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedFetchProducts(searchTerm);
  }, [searchTerm, debouncedFetchProducts]);

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as 'low' | 'high' | '';
    setFilterPrice(value);
  };

  const handleProductClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  const filteredProducts = [...products].sort((a, b) => {
    if (filterPrice === 'low') {
      return a.price - b.price;
    } else if (filterPrice === 'high') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className={styles['catalog-container']}>
      <h1>Product Catalog</h1>
      <div className={styles['search-bar']}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <div className={styles['filter-bar']}>
        <label>Sort by Price:</label>
        <select onChange={handleFilterChange} value={filterPrice}>
          <option value="">None</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {filteredProducts.length > 0 ? (
            <div className={styles['product-grid']}>
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className={styles['product-card']}
                  onClick={() => handleProductClick(product._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/250'}
                    alt={product.name}
                  />
                  <div className={styles['product-info']}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className={styles['price']}>${product.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles['no-products']}>No products found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProductCatalog;
