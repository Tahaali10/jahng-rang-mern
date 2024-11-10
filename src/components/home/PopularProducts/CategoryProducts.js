// CategoryProducts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CategoryProducts = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch all products from the backend
                const response = await axios.get(`https://ecom-be-h39h.onrender.com/api/products?category=${categoryName}`);

                // Set products based on the selected category
                setProducts(response.data);
            } catch (error) {
                console.error(`Failed to fetch products for category ${categoryName}:`, error);
            }
        };

        fetchProducts();
    }, [categoryName]);

    return (
        <div className="container mx-auto p-2">
            <h2 className="text-xl font-bold mb-4 text-center" style={{ textTransform: 'uppercase' }}>{categoryName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                    <div key={product._id} className="border rounded-md overflow-hidden shadow-sm bg-white">
                        {product.imageUrl && (
                            <img
                                src={product.imageUrl || 'default_product_image.jpg'} // Using the direct imageUrl property
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-t-md"
                            />
                        )}
                        <div className="p-3 flex flex-col items-start">
                            <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                            <p className="text-gray-500 mb-3">Price: Rs. {product.price}</p>
                            <a href={`https://wa.me/+923211949184?text=I would like more information about ${product.name}`} target="_blank" rel="noopener noreferrer">
                                <button
                                    className="mt-auto bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md w-full text-sm"
                                >
                                    Order Now
                                </button>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryProducts;