import axios from 'axios';

// Base Axios instance for API calls
const axiosInstance = axios.create({
  baseURL: 'https://ecom-be-h39h.onrender.com/api', // Adjust this to match your API's base URL
  headers: {
    'Content-Type': 'application/json'
  }
});


// Request interceptor for attaching token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from local storage or session storage
    const token = localStorage.getItem('token'); // or sessionStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling global API response errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Simply return the response if it's successful
    return response;
  },
  (error) => {
    // If the token was invalid or expired
    if (error.response.status === 401) {
      console.log('Token invalid or expired');
      localStorage.removeItem('token'); // Clear the token if it's invalid
      // Optionally, redirect the user to the login page or handle re-authentication
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
