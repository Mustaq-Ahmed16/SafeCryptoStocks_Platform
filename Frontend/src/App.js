// // App.js


// App.js
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import LandingPage from './Components/PortMgmt/LandingPage';
import ForgotPassword from './Components/Login/ForgotPassword';
import OTPVerification from './Components/Login/OTPVerification';
import ResetPassword from './Components/Login/ResetPassword';
import Dashboard from './Components/PortMgmt/Dashboard';
import Market from './Components/PortMgmt/Market';
import BuyStock from './Components/PortMgmt/BuyStock';
import CreatePortfolio from './Components/PortMgmt/CreatePortfolio';
import PortfolioPage from './Components/PortMgmt/PortfolioPage';
import Budget from './Components/PortMgmt/Budget';
import Learn from './Components/PortMgmt/Learn';
import Profile from './Components/ProfilePage/Profile';
import { UserProvider } from './Components/UserContext';
import UnauthorizedPage from './UnauthorizedPage';
import MarketChart from './Components/PortMgmt/MarketChart';
import { ResetStateProvider } from './Components/ResetStateProvider';
import Logout from './Components/Login/Logout';

// import Test from './Components/HomeFolder/Test';



const App = () => {
  return (
    <UserProvider>
      <Router>
        {/* Wrap Routes with ResetStateProvider outside of Routes */}
        <ResetStateProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} /> {/* Logout route */}


            {/* Routes requiring ResetStateProvider */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp-verification" element={<OTPVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Private Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/market" element={<Market />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/create-portfolio" element={<CreatePortfolio />} />
            <Route path="/buy-stock" element={<BuyStock />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/chart" element={<MarketChart />} />

            <Route path="/profile" element={<Profile />} />

            {/* <Route path="/test" element={<Test />} /> */}


            {/* Catch-all for Unauthorized access */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Redirect to UnauthorizedPage if no match */}
            <Route path="*" element={<UnauthorizedPage />} />
          </Routes>
        </ResetStateProvider>
      </Router>
    </UserProvider>
  );
};

export default App;





// // App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from '../src/Components/Login/Login';
// import Register from '../src/Components/Login/Register';
// import LandingPage from '../src/Components/PortMgmt/LandingPage';
// import ForgotPassword from './Components/Login/ForgotPassword';
// import OTPVerification from './Components/Login/OTPVerification';
// import ResetPassword from './Components/Login/ResetPassword';
// import Dashboard from './Components/PortMgmt/Dashboard';
// import Market from './Components/PortMgmt/Market';


// import BuyStock from './Components/PortMgmt/BuyStock';
// import CreatePortfolio from './Components/PortMgmt/CreatePortfolio';
// import PortfolioPage from './Components/PortMgmt/PortfolioPage';
// import Budget from './Components/PortMgmt/Budget';
// import Learn from './Components/PortMgmt/Learn';
// import Profile from './Components/ProfilePage/Profile';
// import { UserProvider } from './Components/UserContext';
// import UnauthorizedPage from './UnauthorizedPage';
// import MarketChart from './Components/PortMgmt/MarketChart';
// import Test from './Components/Home/Test';
// import { ResetStateProvider } from './Components/ResetStateProvider';





// const App = () => {

//   return (
//     <UserProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <ResetStateProvider>
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/otp-verification" element={<OTPVerification />} />
//             <Route path="/reset-password" element={<ResetPassword />} />
//           </ResetStateProvider>

//           <Route path="/dashboard" element={< Dashboard />} />
//           <Route path="/market" element={< Market />} />
//           <Route path="/portfolio" element={<PortfolioPage />} />
//           <Route path="/create-portfolio" element={<CreatePortfolio />} />
//           <Route path="/buy-stock" element={<BuyStock />} />
//           <Route path="/budget" element={<Budget />} />
//           <Route path="/learn" element={<Learn />} />
//           <Route path="/chart" element={<MarketChart />} />
//           <Route path="/test" element={<Test />} />


//           <Route path="/profile" element={<Profile />} />
//           {/* Catch-all for Unauthorized access */}
//           <Route path="/unauthorized" element={UnauthorizedPage} />

//           {/* Redirect to UnauthorizedPage if no match */}
//           <Route path="*" element={UnauthorizedPage} />
//         </Routes>
//       </Router>
//     </UserProvider>
//   );
// };

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from '../src/Components/Login/Login';
// import Register from '../src/Components/Login/Register';
// import LandingPage from '../src/Components/PortMgmt/LandingPage';
// import ForgotPassword from './Components/Login/ForgotPassword';
// import OTPVerification from './Components/Login/OTPVerification';
// import ResetPassword from './Components/Login/ResetPassword';
// import Dashboard from './Components/PortMgmt/Dashboard';
// import Market from './Components/PortMgmt/Market';
// // import Portfolio from './Components/PortMgmt/Portfolio';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/landingpg" element={<LandingPage />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/otp-verification" element={<OTPVerification />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/dashboard" element={< Dashboard />} />
//         <Route path="/market" element={< Market />} />
//         {/* <Route path="/portfolio" element={< Portfolio />} /> */}


//       </Routes>
//     </Router>
//   );
// };

//export default App;
