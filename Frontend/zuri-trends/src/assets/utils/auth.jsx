// src/utils/auth.js

export const logout = () => {
  // Clear authentication token or user data
  localStorage.removeItem('authToken'); // or sessionStorage.removeItem('authToken'); if you're using sessionStorage
  
  // Redirect to login page or home page
  window.location.href = '/users'; // You can redirect to any page you'd like
};
