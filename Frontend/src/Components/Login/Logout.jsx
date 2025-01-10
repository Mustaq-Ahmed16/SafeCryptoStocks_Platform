import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import { useUser } from '../UserContext'; // Assuming you have a UserContext for managing user data

const Logout = () => {
  const navigate = useNavigate();
  const { setUserData } = useUser(); // Reset user context

  useEffect(() => {
    const handleLogout = async () => {
      const token = localStorage.getItem('token'); // Get the stored JWT token

      if (token) {
        try {
          const response = await fetch('http://localhost:8005/auth/logout', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`, // Include the JWT in the Authorization header
            },
          });

          const data = await response.json();

          if (response.ok) {
            // Clear the token and user data from localStorage and context
            localStorage.removeItem('token'); // Remove JWT from localStorage
            console.log('Token removed:', !localStorage.getItem('token')); // Debugging line

            // Reset user data in context
            setUserData(null);

            // Redirect the user to the login page after successful logout
            navigate('/login');
          } else {
            console.error('Logout failed:', data.message); // Handle any error response from the backend
          }
        } catch (error) {
          console.error('Logout request failed:', error);
        }
      } else {
        // If there is no token, just reset the user data and redirect to login
        setUserData(null);
        navigate('/login');
      }
    };

    // Call the logout function when the component mounts
    handleLogout();
  }, [navigate, setUserData]);

  return <div>Logging out...</div>; // Optional: Show loading message or spinner
};

export default Logout;
