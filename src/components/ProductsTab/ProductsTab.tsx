import React from 'react';
import styles from './ProductsTab.module.scss';

interface ProductsTabProps {
  products: any[];
  newProduct: { name: string; description: string; price: number; images: string[]; category: string };
  setNewProduct: (product: { name: string; description: string; price: number; images: string[]; category: string }) => void;
  onCreateProduct: () => void;
  onDeleteProduct: (productId: string) => void;
}

const ProductsTab: React.FC<ProductsTabProps> = ({ products, newProduct, setNewProduct, onCreateProduct, onDeleteProduct }) => {
  return (
    <div className={styles['products-section']}>
      <h2>All Products</h2>
      <ul className={styles.productList}>
        {products.map(product => (
          <li key={product._id}>
            <div className={styles.productInfo}>
              <span className={styles.name}>{product.name}</span>
              <span className={styles.price}>${product.price.toFixed(2)}</span>
            </div>
            <button onClick={() => onDeleteProduct(product._id)}>Delete Product</button>
          </li>
        ))}
      </ul>
      <h2>Create Product</h2>
      <div className={styles.createProduct}>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.images[0] || ''}
          onChange={(e) => setNewProduct({ ...newProduct, images: [e.target.value] })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <button onClick={onCreateProduct}>Create Product</button>
      </div>
    </div>
  );
};

export default ProductsTab;
