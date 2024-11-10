import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaUser, FaCaretDown } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const HeaderBottom = () => {
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const ref = useRef();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ecom-be-h39h.onrender.com/api/products');
        const uniqueCategories = [...new Set(response.data.map(item => item.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();

    // Check if user is logged in on component mount
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setIsLoggedIn(true);
      setUsername(storedUser.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername(null);
    setShowUser(false);
    navigate('/');
  };

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowUser(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full bg-[#ffffff] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div className="flex w-full items-center justify-between lg:hidden mt-2">
            <div
              onClick={() => setShow(!show)}
              ref={ref}
              className="flex cursor-pointer items-center gap-2 text-primeColor"
            >
              <HiOutlineMenuAlt4 className="w-5 h-5" />
              <p className="text-[14px] font-normal text-[#e7c12a]">Shop by Category</p>

              {show && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-8 left-8 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
                >
                  {categories.map((category, index) => (
                    <Link key={index} to={`/category/${category.toLowerCase()}`} onClick={() => setShow(false)}>
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        {category}
                      </li>
                    </Link>
                  ))}
                </motion.ul>
              )}
            </div>

            {/* Right side: User Icon and Dropdown */}
            <div className="flex gap-4 items-center pr-6 cursor-pointer relative" ref={ref}>
              <div onClick={() => setShowUser(!showUser)} className="flex">
                <FaUser className="text-[#e7c12a]" />
                <FaCaretDown className="text-[#e7c12a]" />
              </div>

              {showUser && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-6 right-0 z-50 bg-[#317248] w-44 text-[#767676] h-auto p-4 pb-6"
                >
                  {isLoggedIn ? (
                    <>
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 cursor-default">
                        {username}
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
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
