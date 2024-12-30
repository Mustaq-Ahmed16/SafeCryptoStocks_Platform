// ResetStateContext.js
// ResetStateProvider.jsx

import React, { createContext, useContext, useState } from 'react';

// Create the context
const ResetStateContext = createContext();

// Create a provider component
export const ResetStateProvider = ({ children }) => {
  // Update resetState to be an object with status and email
  const [resetState, setResetState] = useState({ status: '', email: '' });

  const [otpVerified, setOtpVerified] = useState(false); // State for OTP verification

  return (
    <ResetStateContext.Provider value={{ resetState, setResetState, otpVerified, setOtpVerified }}>
      {children}
    </ResetStateContext.Provider>
  );
};

// Custom hook to access the context
export const useResetState = () => useContext(ResetStateContext);



// import React, { createContext, useContext, useState } from 'react';

// // Create the context
// const ResetStateContext = createContext();

// // Create a provider component
// export const ResetStateProvider = ({ children }) => {
//   const [resetState, setResetState] = useState(''); // State for reset state
//   const [otpVerified, setOtpVerified] = useState(false); // State for OTP verification

//   return (
//     <ResetStateContext.Provider value={{ resetState, setResetState }}>
//       {children}
//     </ResetStateContext.Provider>
//   );
// };



// // Custom hook to access the context
// export const useResetState = () => useContext(ResetStateContext);