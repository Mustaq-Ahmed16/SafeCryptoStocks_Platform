// Zod
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Login.css';
import land from '../Assets/land.jpg';
import { useUser } from '../UserContext'; // Import useUser hook
import { z } from 'zod'; // Import Zod for validation

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // State to track loading status
  const navigate = useNavigate(); // Initialize navigate
  const { setUserData } = useUser(); // Access setUserData from context

  // Zod validation schema
  const loginSchema = z.object({
    email: z.string().email('Please enter a Valid Email Address').nonempty('Email is required'),
    password: z
      .string()
      .nonempty('Password is required'),
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading state to true before starting the login process
    try {
      // Validate input using Zod schema
      const validatedData = loginSchema.parse({ email, password });

      // If validation passes, proceed with login request
      const response = await fetch('http://localhost:8005/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token); // Save token
        // Store user details in context and localStorage
        setUserData({
          id: data.user.id,
          fullName: data.user.fullName,
          email: data.user.email,
          address: data.user.address,
          phone: data.user.phone,
        });

        navigate('/dashboard'); // Navigate to the dashboard page
      } else {
        alert('Invalid email or password.');
      }
    } catch (error) {
      // If validation fails, display error messages below the input fields
      if (error instanceof z.ZodError) {
        const validationErrors = {};
        error.errors.forEach((err) => {
          validationErrors[err.path[0]] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('Error during login:', error);
      }
    }
    finally {
      setLoading(false); // Set loading to false after the login process finishes
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>SAFE CRYPTOSTOCKS</h2>
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
          <div className="login-input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="icon">📧</span>
          </div>
          {errors.email && <p className="error-message">{errors.email}</p>}

          <div className="login-input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="icon">🔒</span>
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              <>
                Processing... <div className="spinner"></div>
              </>
            ) : (
              'Login'
            )}
          </button>


          <p>
            <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
          </p>
          <p>
            Don’t have an account? <Link to="/register" className="register-link">Register</Link>
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

export default Login;



// Login.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// import './Login.css';
// import land from '../Assets/land.jpg';
// import { useUser } from '../UserContext'; // Import useUser hook



// const Login = () => {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const navigate = useNavigate(); // Initialize navigate
//   const { setUserData } = useUser(); // Access setUserData from context

//   const validatePassword = (password) => {
//     const minLength = 4;
//     const hasUppercase = /[A-Z]/.test(password);
//     const hasLowercase = /[a-z]/.test(password);
//     const hasNumber = /[0-9]/.test(password);
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

//     if (password.length < minLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
//       setPasswordError(
//         'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.'
//       );
//       return false;
//     } else {
//       setPasswordError('');
//       return true;
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (validatePassword(password)) {
//       try {
//         const response = await fetch('http://localhost:8005/auth/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email, password }),
//         });
//         const data = await response.json();
//         if (data.token) {
//           localStorage.setItem('token', data.token); // Save token
//           // Store user details in context and localStorage
//           setUserData({
//             id: data.user.id,
//             fullName: data.user.fullName,
//             email: data.user.email,
//             address: data.user.address,
//             phone: data.user.phone,
//           });

//           navigate('/dashboard'); // Navigate to the dashboard page
//         } else {
//           alert('Invalid email or password.');
//         }
//       } catch (error) {
//         console.error('Error during login:', error);
//       }
//     }
//   };


//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <h2>SAFE CRYPTOSTOCKS</h2>
//         <h3>Login</h3>
//         <form onSubmit={handleLogin}>
//           <div className="input-group">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <span className="icon">📧</span>
//           </div>
//           <div className="input-group">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 validatePassword(e.target.value); // Validate password on each change
//               }}
//               required
//             />
//             <span className="icon">🔒</span>
//           </div>
//           {passwordError && <p className="error-message">{passwordError}</p>}
//           <button type="submit" className="login-button">Login</button>
//           <p>
//             <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
//           </p>
//           <p>
//             Don’t have an account? <Link to="/register" className="register-link">Register</Link>
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

// export default Login;