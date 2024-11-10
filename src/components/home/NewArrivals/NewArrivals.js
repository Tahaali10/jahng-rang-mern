import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import Heading from "../Products/Heading";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";

const ProductCard = ({ img, productName, price }) => {
  return (
    <div className="product-card text-center flex flex-col items-center">
      <img 
        src={img || 'path_to_default_image.jpg'} // Using Cloudinary URL directly
        alt={productName} 
        className="object-cover"
        style={{ width: '160px', height: '160px', objectFit: 'cover' }}
      />
      <h3 className="mt-2 text-lg text-[#317248] font-bold">{productName}</h3>
      <p className="mt-1 text-[#317248]">Rs.{price}</p>
      <a href="https://wa.me/+923211949184">
        <button
          className="mt-3 px-4 py-2 bg-[#317248] text-white rounded hover:bg-[#2c613b] transition duration-200"
        >
          Order Now
        </button>
      </a>
    </div>
  );
};

const NewArrivals = () => {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        const response = await axios.get('https://ecom-be-h39h.onrender.com/api/products?category=grocery');
        setGroceries(response.data);
      } catch (error) {
        console.error('Failed to fetch grocery products:', error);
      }
    };

    fetchGroceries();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          // Ensuring images are centered on mobile
          centerMode: true,
          centerPadding: '0px',
        },
      },
    ],
  };

  return (
    <div className="w-full pb-16 mt-16">
      <Heading heading="Kiryana Products" />
      <Slider {...settings}>
        {groceries.map(item => (
          <div className="px-2 flex justify-center" key={item._id}>
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

export default NewArrivals;
