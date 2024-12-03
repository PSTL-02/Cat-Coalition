import { useContext, useEffect, useState } from 'react';
import wooCommerceApi from '../woocommerceApi';
import { CartContext } from '../context/CartContext';
import PageHeader from '../components/PageHeader';
import Seo from '../components/Seo';

const Store = () => {
  const [shopProducts, setShopProducts] = useState([]);
  const [donationProducts, setDonationProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  // Fetch products from both categories
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [category18Response, category17Response] = await Promise.all([
          wooCommerceApi.get('/products?category=18&per_page=30'), // Shop
          wooCommerceApi.get('/products?category=17&per_page=30'), // Donations
        ]);

        // Set products for each category
        setShopProducts(category18Response.data);
        setDonationProducts(category17Response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <>
      <Seo
        title="Shop - Community Cat Coalition"
        description="Explore our wide range of products to buy."
        url={window.location.href}
      />

      <div>
        <PageHeader title="SHOP / DONATIONS" image_url="/Header/Shop-header.png" />

        {/* Shop Section */}
        <h2 className="section-title">Shop</h2>
        <ul className="product-container">
          {shopProducts.map((product) => (
            <li key={product.id} className="product-item">
              <img src={product.images[0].src} alt={product.name} />
              <h4>
                {product.name} - ${product.prices.price / 100} {product.prices.currency_code}
              </h4>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>

        {/* Donations Section */}
        <h2 className="section-title">Donations</h2>
        <ul className="product-container">
          {donationProducts.map((product) => (
            <li key={product.id} className="product-item">
              <img src={product.images[0].src} alt={product.name} />
              <h4>
                {product.name} - ${product.prices.price / 100} {product.prices.currency_code}
              </h4>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Store;
