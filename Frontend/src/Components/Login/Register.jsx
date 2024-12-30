
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
    } catch (err) {
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
          <div className="input-group">
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
          <div className="input-group">
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
          <div className="input-group">
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
          <div className="input-group">
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
          <div className="input-group">
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
          <button type="submit" className="register-button">Register</button>
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


// ZOD -1
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Register.css';
// import land from '../Assets/land.jpg';
// import axios from 'axios';
// import { z } from 'zod';  // Import Zod

// // Define the schema using Zod
// const userSchema = z.object({
//   email: z.string().email("Email must contain @ and domain name...").nonempty("Email is required"),
//   password: z.string().min(8, "Password must be at least 8 characters long")
//     .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//     .regex(/[0-9]/, "Password must contain at least one number")
//     .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
//     .nonempty("Password is required"),
//   fullName: z.string().nonempty("Full Name is required"),
//   address: z.string().nonempty("Address is required"),
//   phone: z.string().length(10, "Phone number must be exactly 10 digits").nonempty("Phone number is required")
// });

// const Register = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     fullName: '',
//     address: '',
//     phone: '',
//   });

//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     // Validate form data with Zod schema
//     const result = userSchema.safeParse(formData);

//     if (!result.success) {
//       // Collect errors and set them in the state
//       const errorMessages = {};
//       result.error.errors.forEach((err) => {
//         errorMessages[err.path[0]] = err.message;
//       });
//       setErrors(errorMessages);
//       return;  // Stop form submission if validation fails
//     }

//     try {
//       const response = await axios.post('http://localhost:8005/auth/register', formData);
//       const data = response.data;

//       if (data.success) {
//         localStorage.setItem('user', JSON.stringify({
//           email: data.email,
//           fullname: data.fullname,
//         }));
//         navigate('/dashboard');
//       } else {
//         alert(data.message);  // Show any backend error messages
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       alert('Something went wrong during registration.');
//     }
//   };

//   return (
//     <div className="register-page">
//       <div className="register-container">
//         <h2>SafeCryptoStocks</h2>
//         <h3>Register</h3>
//         <form onSubmit={handleRegister}>
//           <div className="input-group">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">📧</span>
//             {errors.email && <p className="error-message">{errors.email}</p>}
//           </div>
//           <div className="input-group">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">🔒</span>
//             {errors.password && <p className="error-message">{errors.password}</p>}
//           </div>
//           <div className="input-group">
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               value={formData.fullName}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">👤</span>
//             {errors.fullName && <p className="error-message">{errors.fullName}</p>}
//           </div>

//           <div className="input-group">
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">🏠</span>
//             {errors.address && <p className="error-message">{errors.address}</p>}
//           </div>
//           <div className="input-group">
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">📞</span>
//             {errors.phone && <p className="error-message">{errors.phone}</p>}
//           </div>
//           <button type="submit" className="register-button">Register</button>
//           <p>
//             Already have an account? <Link to="/login" className="login-link">Login</Link>
//           </p>
//         </form>
//       </div>
//       <div className="mockups">
//         <img
//           src={land}
//           alt="Device mockups"
//           className="mockups-img"
//         />
//       </div>
//     </div>
//   );
// };

// export default Register;



// Without client validation
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
// import './Register.css';
// import land from '../Assets/land.jpg';
// import axios from 'axios';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     fullName: '',
//     address: '',
//     phone: '',
   
//   });

//   const [errors, setErrors] = useState({
//     password: '',
//     phone: '',
//     fullName: '',
//     address: '',
//     email: ''
//   });

//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));

//     // Clear specific error message when user starts typing
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: '',
//     }));
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:8005/auth/register', formData); // Your backend API URL
//       const data = response.data;

//       if (data.success) {
//         localStorage.setItem('user', JSON.stringify({
//           email: data.email,
//           fullname: data.fullName
//         }));
//         // Navigate to the landing page if registration is successful
//         navigate('/dashboard');
//       } else {
//         // Handle validation errors from server response
//         if (data.errors) {
//           setErrors(data.errors); // Set the server validation errors
//         }
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       alert(`Something went wrong during registration.=>${error}`);
//     }
//   };

//   return (
//     <div className="register-page">
//       <div className="register-container">
//         <h2>SafeCryptoStocks</h2>
//         <h3>Register</h3>
//         <form onSubmit={handleRegister}>
//           <div className="input-group">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">📧</span>
//             {errors.email && <p className="error-message">{errors.email}</p>}
//           </div>
//           <div className="input-group">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">🔒</span>
//             {errors.password && <p className="error-message">{errors.password}</p>}
//           </div>
//           <div className="input-group">
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               value={formData.fullName}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">👤</span>
//             {errors.fullName && <p className="error-message">{errors.fullName}</p>}
//           </div>

//           <div className="input-group">
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">🏠</span>
//             {errors.address && <p className="error-message">{errors.address}</p>}
//           </div>
//           <div className="input-group">
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">📞</span>
//             {errors.phone && <p className="error-message">{errors.phone}</p>}
//           </div>
//           <button type="submit" className="register-button">Register</button>
//           <p>
//             Already have an account? <Link to="/login" className="login-link">Login</Link>
//           </p>
//         </form>
//       </div>
//       <div className="mockups">
//         <img
//           src={land}
//           alt="Device mockups"
//           className="mockups-img"
//         />
//       </div>
//     </div>
//   );
// };

// export default Register;

// Yech hamara
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
// import './Register.css';
// import land from '../Assets/land.jpg';
// import axios from 'axios';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     fulltName: '',
//     address: '',
//     phone: '',
//     profilePictureUrl: '',
//   });

//   const [errors, setErrors] = useState({
//     password: '',
//     phone: '',
//   });

//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));

//     if (name === 'password') validatePassword(value);
//     if (name === 'phone') validatePhone(value);
//   };

//   const validatePassword = (password) => {
//     const minLength = 8;
//     const hasUppercase = /[A-Z]/.test(password);
//     const hasLowercase = /[a-z]/.test(password);
//     const hasNumber = /[0-9]/.test(password);
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

//     if (password.length < minLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         password: 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.',
//       }));
//       return false;
//     } else {
//       setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
//       return true;
//     }
//   };

//   const validatePhone = (phone) => {
//     const phonePattern = /^[0-9]{10}$/;
//     if (!phonePattern.test(phone)) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         phone: 'Phone number must be exactly 10 digits.',
//       }));
//       return false;
//     } else {
//       setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
//       return true;
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const isPasswordValid = validatePassword(formData.password);
//     const isPhoneValid = validatePhone(formData.phone);



//     if (isPasswordValid && isPhoneValid) {
//       try {
//         const response = await axios.post('http://localhost:8005/auth/register', formData); // Your backend API URL
//         const data = response.data;

//         if (data.success) {
//           localStorage.setItem('user', JSON.stringify({
//             email: data.email,
//             fullname: data.fullname
//           }));
//           // Navigate to the landing page if registration is successful
//           navigate('/dashboard');
//         } else {
//           alert(data.message); // Show any error messages from the backend
//         }
//       } catch (error) {
//         console.error('Error during registration:', error);
//         alert('Something went wrong during registration.');
//       }
//     } else {
//       alert('Please fix the errors before submitting.');
//     }
//   };

//   return (
//     <div className="register-page">
//       <div className="register-container">
//         <h2>SafeCryptoStocks</h2>
//         <h3>Register</h3>
//         <form onSubmit={handleRegister}>
//           <div className="input-group">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">📧</span>
//           </div>
//           <div className="input-group">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">🔒</span>
//             {errors.password && <p className="error-message">{errors.password}</p>}
//           </div>
//           <div className="input-group">
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               value={formData.fullName}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">👤</span>
//           </div>

//           <div className="input-group">
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">🏠</span>
//           </div>
//           <div className="input-group">
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">📞</span>
//             {errors.phone && <p className="error-message">{errors.phone}</p>}
//           </div>
//           {/* <div className="input-group">
//             <input
//               type="url"
//               name="profilePictureUrl"
//               placeholder="Profile Picture URL"
//               value={formData.profilePictureUrl}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">🌐</span>
//           </div> */}
//           <button type="submit" className="register-button">Register</button>
//           <p>
//             Already have an account? <Link to="/login" className="login-link">Login</Link>
//           </p>
//         </form>
//       </div>
//       <div className="mockups">
//         <img
//           src={land}
//           alt="Device mockups"
//           className="mockups-img"
//         />
//       </div>
//     </div>
//   );
// };

// export default Register;






// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
// import './Register.css';
// import land from '../Assets/land.jpg';
// import axios from 'axios';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     fullName: '',
//     address: '',
//     phone: '',
//     profilePictureUrl: '',
//   });

//   const [errors, setErrors] = useState({
//     password: '',
//     phone: '',
//     fullName: '',
//     address: '',
//     email: ''
//   });

//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));

//     // Clear specific error message when user starts typing
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: '',
//     }));
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:8005/auth/register', formData); // Your backend API URL
//       const data = response.data;

//       if (data.success) {
//         localStorage.setItem('user', JSON.stringify({
//           email: data.email,
//           fullname: data.fullName
//         }));
//         // Navigate to the landing page if registration is successful
//         navigate('/dashboard');
//       } else {
//         // Handle validation errors from server response
//         if (data.errors) {
//           // Collect all error messages from the server response
//           let errorMessages = '';
//           for (const [field, message] of Object.entries(data.errors)) {
//             errorMessages += `${field}: ${message}\n`; // Append each field's error message
//           }

//           // Show all error messages in an alert
//           alert(`Registration failed:\n${errorMessages}`);
//         }
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       alert('Something went wrong during registration.');
//     }
//   };

//   return (
//     <div className="register-page">
//       <div className="register-container">
//         <h2>SafeCryptoStocks</h2>
//         <h3>Register</h3>
//         <form onSubmit={handleRegister}>
//           <div className="input-group">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">📧</span>
//             {errors.email && <p className="error-message">{errors.email}</p>}
//           </div>
//           <div className="input-group">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">🔒</span>
//             {errors.password && <p className="error-message">{errors.password}</p>}
//           </div>
//           <div className="input-group">
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               value={formData.fullName}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">👤</span>
//             {errors.fullName && <p className="error-message">{errors.fullName}</p>}
//           </div>

//           <div className="input-group">
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">🏠</span>
//             {errors.address && <p className="error-message">{errors.address}</p>}
//           </div>
//           <div className="input-group">
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//             <span className="icon">📞</span>
//             {errors.phone && <p className="error-message">{errors.phone}</p>}
//           </div>
//           <button type="submit" className="register-button">Register</button>
//           <p>
//             Already have an account? <Link to="/login" className="login-link">Login</Link>
//           </p>
//         </form>
//       </div>
//       <div className="mockups">
//         <img
//           src={land}
//           alt="Device mockups"
//           className="mockups-img"
//         />
//       </div>
//     </div>
//   );
// };

// export default Register;



// // Register.jsx
