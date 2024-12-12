import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FooterBottom from '../../components/home/Footer/FooterBottom';
import axiosInstance from '../../AxiosTokenInstance/AxiosTokenInstance';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent form reload
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const response = await axiosInstance.post('/auth/login', { username, password });

      // Store token if login is successful
      localStorage.setItem('user', JSON.stringify({ username: username }));

      if (response.data.isAdmin) {
        navigate('/dashboard');
      } else {
        navigate('/'); // Navigate to the home page after login
      }

      // Refresh the page to reflect the logged-in state
      window.location.reload(); // Refresh the page after login

    } catch (err) {
      const message = err.response?.data?.message || 'Authentication failed';
      setError(message);
      console.log('Login Error:', message); // Log the error for debugging
    }
  };

  return (
    <div>
      <div className="w-full flex items-center justify-center py-10">
        <form className="w-full lgl:w-[450px] flex items-start justify-start" onSubmit={handleSignIn}>
          <div className="px-6 py-1 w-full flex flex-col justify-center">
            <h1 className="font-titleFont decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-5 text-[#f9cc1f]">Sign in</h1>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <p className="font-titleFont text-base font-semibold text-[#317248]">Username</p>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="text"
                  placeholder="username123"
                />
              </div>

              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-[#317248]">Password</p>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="password"
                  placeholder="Create password"
                />
              </div>

              {/* Error message */}
              {error && (
                <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                  <span className="font-bold italic mr-1">!</span>
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="bg-[#317248] hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
              >
                Sign In
              </button>

              <p className="text-sm text-center font-titleFont font-medium text-[#317248]">
                Don't have an Account?{' '}
                <Link to="/signup">
                  <span className="text-[#f9cc1f] duration-300">
                    Sign up
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
      <FooterBottom />
    </div>
  );
};

export default SignIn;
