import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from "../Products/Heading";

const ProductCard = ({ img, productName, price }) => {
  return (
    <div className="product-card text-center flex flex-col items-center justify-center p-4">
      <img 
        src={img || 'path_to_default_image.jpg'} // Using Cloudinary URL directly or default image
        alt={productName} 
        style={{ width: '160px', height: '160px', objectFit: 'cover', borderRadius: '50%' }} 
      />
      <h3 className="mt-2 text-lg text-[#317248] font-bold">{productName}</h3>
      <p className="mt-1 text-[#317248]">Rs.{price}</p>
      <a href="https://wa.me/03211949184">
        <button
          className="mt-3 px-4 py-2 bg-[#317248] text-white rounded hover:bg-[#2c613b] transition duration-200"
        >
          Order Now
        </button>
      </a>
    </div>
  );
};

const BestSellers = () => {
  const [uniqueProducts, setUniqueProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://ecom-be-h39h.onrender.com/api/products');
        const products = response.data;
        const categories = new Set();
        const filteredProducts = [];

        for (const product of products) {
          if (!categories.has(product.category)) {
            categories.add(product.category);
            filteredProducts.push(product);
          }
        }

        setUniqueProducts(filteredProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full pb-20">
      <Heading heading="Most Used Items" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {uniqueProducts.map(product => (
          <ProductCard
            key={product._id}
            img={product.imageUrl || 'path_to_default_image.jpg'} // Using Cloudinary URL directly or default image
            productName={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
