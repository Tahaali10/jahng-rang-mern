import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import Heading from "../Products/Heading";

const ProductCard = ({ img, productName, price }) => {
    return (
        <div className="product-card text-center flex flex-col items-center">
            <img src={img || 'path_to_default_image.jpg'} // Using Cloudinary URL directly
                alt={productName}
                className="w-40 h-40 object-cover"
                style={{ width: '160px', height: '200px', objectFit: 'cover' }} />
            <h3 className="mt-2 text-lg text-[#317248] font-bold">{productName}</h3>
            <p className="text-[#317248]">Rs.{price}</p>
            <a href="https://wa.me/+923211949184">
                <button
                    className="mt-2 px-4 py-2 bg-[#317248] text-white rounded hover:bg-[#2c613b] transition duration-200"
                >
                    Order Now
                </button>
            </a>
        </div>
    );
};

const FastFoodMenu = () => {
    const [fastFoods, setFastFoods] = useState([]);

    useEffect(() => {
        const fetchFastFoods = async () => {
            try {
                const response = await axios.get('https://ecom-be-h39h.onrender.com/api/products?category=fastfood');
                setFastFoods(response.data);
            } catch (error) {
                console.error('Failed to fetch fast food products:', error);
            }
        };

        fetchFastFoods();
    }, []);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="w-full pb-16 mt-16">
            <Heading heading="Our Fast Food Menu" />
            <Slider {...settings}>
                {fastFoods.map(item => (
                    <div className="px-2" key={item._id}>
                        <ProductCard
                            img={item.imageUrl || 'path_to_default_image.jpg'} // Using Cloudinary URL directly
                            productName={item.name}
                            price={item.price}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default FastFoodMenu;
