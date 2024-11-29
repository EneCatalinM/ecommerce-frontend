import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import styles from './ProductDetails.module.scss';
import { Loading } from '../../components/Loading';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

const ProductDetails: React.FC = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (id) {
          setLoading(true);
          const data = await getProductById(id);
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      setErrorMessage('You must login first');
    }

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        images: product.images,
        quantity: 1,
      });
      setErrorMessage(null);
      setSuccessMessage('Added to cart');
    }
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className={styles['product-details']}>
      <h1>{product.name}</h1>
      <div className={styles['details-container']}>
        <img src={product.images[0]} alt={product.name} />
        <div className={styles['product-info']}>
          <p>{product.description}</p>
          <p className={styles['price']}>${product.price.toFixed(2)}</p>
          <button className={styles['add-to-cart']} onClick={handleAddToCart} disabled={!user}>
            Add to Cart
          </button>
          <button className={styles['view-cart']} onClick={handleViewCart}>
            View Cart
          </button>
          {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
          {successMessage && <p className={styles['success-message']}>{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
