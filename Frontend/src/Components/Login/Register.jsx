//zod -2
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import land from '../Assets/land.jpg';
import axios from 'axios';
import { z } from 'zod';  // Import Zod

const Register = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    address: '',
    phone: '',
    profilePictureUrl: '',
  });

  const [errors, setErrors] = useState({});
  const [backendErrors, setBackendErrors] = useState({}); // To store backend error messages
  const [loading, setLoading] = useState(false); // To control loading spinner
  const [successMessage, setSuccessMessage] = useState(''); // To show success message

  // Zod schema for validation
  const registerSchema = z.object({
    email: z.string().email("Email must contain @ and domain name..."),
    password: z.string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    fullName: z.string().nonempty("Full Name is required"),
    address: z.string().nonempty("Address is required"),
    phone: z.string()
      .length(10, "Phone number must be exactly 10 digits")
      .regex(/^[0-9]+$/, "Phone number must contain only numbers"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate form data with Zod
    try {
      registerSchema.parse(formData); // This will throw an error if validation fails
      setErrors({}); // Clear any previous errors
      setLoading(true); // Show spinner during the process

      // If validation is successful, proceed with the registration
      try {
        const response = await axios.post('http://localhost:8005/auth/register', formData); // Your backend API URL
        const data = response.data;

        if (data.success) {
          localStorage.setItem('user', JSON.stringify({
            email: data.email,
            fullname: data.fullname
          }));
          // Navigate to the landing page if registration is successful
          navigate('/login');
        } else {
          setBackendErrors(data.errors); // Show backend validation errors
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert('Something went wrong during registration.');
      }
      setLoading(false); // Hide spinner once done
    } catch (err) {
      setLoading(false); // Hide spinner if validation fails
      if (err instanceof z.ZodError) {
        // If Zod validation fails, set errors to display
        const newErrors = {};
        err.errors.forEach((e) => {
          newErrors[e.path[0]] = e.message; // Extract error messages
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>SafeCryptoStocks</h2>
        <h3>Register</h3>
        <form onSubmit={handleRegister}>
          <div className="reg-input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <span className="icon">📧</span>
            {errors.email && <p className="error-message">{errors.email}</p>}
            {backendErrors.email && <p className="error-message">{backendErrors.email}</p>}
          </div>
          <div className="reg-input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="icon">🔒</span>
            {errors.password && <p className="error-message">{errors.password}</p>}
            {backendErrors.password && <p className="error-message">{backendErrors.password}</p>}
          </div>
          <div className="reg-input-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <span className="icon">👤</span>
            {errors.fullName && <p className="error-message">{errors.fullName}</p>}
            {backendErrors.fullName && <p className="error-message">{backendErrors.fullName}</p>}
          </div>
          <div className="reg-input-group">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <span className="icon">🏠</span>
            {errors.address && <p className="error-message">{errors.address}</p>}
            {backendErrors.address && <p className="error-message">{backendErrors.address}</p>}
          </div>
          <div className="reg-input-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <span className="icon">📞</span>
            {errors.phone && <p className="error-message">{errors.phone}</p>}
            {backendErrors.phone && <p className="error-message">{backendErrors.phone}</p>}
          </div>
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Processing...' : 'Register'}
          </button>
          {loading && <div className="spinner"></div>} {/* Show spinner */}
          {successMessage && <p className="success-message">{successMessage}</p>} {/* Success message */}
          <p>
            Already have an account? <Link to="/login" className="login-link">Login</Link>
          </p>
        </form>
      </div>
      <div className="mockups">
        <img
          src={land}
          alt="Device mockups"
          className="mockups-img"
        />
      </div>
    </div>
  );
};

export default Register;









