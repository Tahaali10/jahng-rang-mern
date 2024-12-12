import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaUser, FaCaretDown, FaShoppingCart, FaTimes } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  emptyCart
} from "../../../redux/orebiSlice";

const HeaderBottom = () => {
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const ref = useRef();

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.orebiReducer.products);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    // Fetch product categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        const productData = response.data;

        const uniqueCategories = [
          ...new Set(productData.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products or categories:", error);
      }
    };

    fetchCategories();

    // Check if user is logged in
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setIsLoggedIn(true);
      setUsername(storedUser.username);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername(null);
    setShowUser(false);
    navigate("/");
  };

  return (
    <div className="w-full bg-[#ffffff] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div className="flex w-full items-center justify-between lg:hidden mt-2">
            {/* Category Dropdown */}
            <div
              onClick={() => setShow(!show)}
              ref={ref}
              className="flex cursor-pointer items-center gap-2 text-[#2f734a]"
            >
              <HiOutlineMenuAlt4 className="w-5 h-5" />
              <p className="text-[14px] font-normal text-[#fdcd1d]">
                Shop by Category
              </p>

              {show && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-8 left-8 z-50 bg-[#2f734a] w-auto text-[#767676] h-auto p-4 pb-6"
                >
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      to={`/category/${category.toLowerCase()}`}
                      onClick={() => setShow(false)}
                    >
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        {category}
                      </li>
                    </Link>
                  ))}
                </motion.ul>
              )}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              {/* User Icon and Dropdown */}
              <div
                className="flex gap-1 items-center cursor-pointer relative"
                ref={ref}
              >
                <div
                  onClick={() => setShowUser(!showUser)}
                  className="flex items-center"
                >
                  <FaUser className="text-[#fdcd1d]" />
                  <FaCaretDown className="text-[#fdcd1d]" />
                </div>

                {showUser && (
                  <motion.ul
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-6 right-0 z-50 bg-[#2f734a] w-44 text-[#767676] h-auto p-4 pb-6"
                  >
                    {isLoggedIn ? (
                      <>
                        <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 cursor-default">
                          Welcome, {username}
                        </li>
                        <li
                          onClick={handleLogout}
                          className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                        >
                          Logout
                        </li>
                      </>
                    ) : (
                      <>
                        <Link to="/signin" onClick={() => setShowUser(false)}>
                          <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                            Login
                          </li>
                        </Link>
                        <Link to="/signup" onClick={() => setShowUser(false)}>
                          <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                            Sign Up
                          </li>
                        </Link>
                      </>
                    )}
                  </motion.ul>
                )}
              </div>

              {/* Shopping Cart Icon */}
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setShowCartDrawer(true)}
              >
                <FaShoppingCart className="text-[#fdcd1d]" />
                {cartItems.length > 0 && (
                  <span className="ml-1 text-sm font-semibold text-[#2f734a]">
                    ({cartItems.length})
                  </span>
                )}
              </div>


            </div>
          </div>
        </Flex>
      </div>

      {/* Cart Drawer */}
      {showCartDrawer && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-lg p-6 mt-20 mr-0 z-50"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-4 text-[#317248]">Cart</h2>
            {cartItems.length > 0 && (
  <button
    onClick={() => {
      dispatch(emptyCart());
      setShowCartDrawer(false);
    }}
    className="bg-red-500 text-white px-4 py-2 rounded"
  >
    Empty All
  </button>
)}
            <FaTimes
              onClick={() => setShowCartDrawer(false)}
              className="text-xl cursor-pointer"
            />
          </div>

          <div className="cart-scrollable overflow-y-auto max-h-[calc(100vh-160px)]">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between mb-4"
                >
                  <img
                    src={item.imageUrl || "path_to_default_image.jpg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                  <div>
                    <p>{item.name}</p>
                    <p>Rs. {item.price * item.quantity}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          dispatch(decreaseQuantity({ _id: item._id }))
                        }
                        className="px-2 py-1 bg-gray-200"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(increaseQuantity({ _id: item._id }))
                        }
                        className="px-2 py-1 bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <FaTimes
                    onClick={() => dispatch(deleteItem(item._id))}
                    className="text-red-500 cursor-pointer"
                  />
                </div>
              ))
            ) : (
              <p>No items in the cart.
                <br/>
               <Link to='shop' className="text-[#ffcf76] cursor-pointer"
                    >
                     Continue Shopping
                    </Link>
              </p>
            )}
          </div>

          {/* Make sure this button stays at the bottom */}
          <div className="sticky bottom-0 w-full mt-3 backdrop-blur-2xl">
            <hr />
            <div className="text-lg font-semibold">
              Total: Rs. {totalPrice}
            </div>
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/+923211949184?text=I want to place an order. My total is Rs. ${totalPrice}`,
                  "_blank"
                )
              }
              className="mt-4 w-full py-2 bg-green-600 text-white text-center rounded-md"
            >
              Checkout on WhatsApp
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HeaderBottom;
