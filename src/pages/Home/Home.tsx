import React from 'react';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is an amazing product.',
      price: '$49.99',
      imageUrl: 'https://via.placeholder.com/250',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This product will blow your mind.',
      price: '$79.99',
      imageUrl: 'https://via.placeholder.com/250',
    },
  ];

  return (
    <div className={styles['home-container']}>
      <h1>Welcome to Our E-commerce Platform</h1>
      <div className={styles['featured-products']}>
        {featuredProducts.map((product) => (
          <div key={product.id} className={styles['product-card']}>
            <img src={product.imageUrl} alt={product.name} />
            <div className={styles['product-info']}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className={styles['price']}>{product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
