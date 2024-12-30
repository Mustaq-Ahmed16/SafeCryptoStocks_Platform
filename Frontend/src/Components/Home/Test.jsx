import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './Test.css';

function Test() {
  const [cryptoData, setCryptoData] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch stock and crypto data from CoinGecko API
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then(response => {
        setCryptoData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });

    // Fetch Bitcoin price data for the last 7 days for chart
    axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7')
      .then(response => {
        const data = response.data.prices.map(price => price[1]);
        const labels = response.data.prices.map(price => new Date(price[0]).toLocaleTimeString());
        setChartData({
          labels: labels,
          datasets: [{
            label: 'Bitcoin Price (USD)',
            data: data,
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
            tension: 0.1,
            pointBackgroundColor: 'rgba(75,192,192,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(75,192,192,1)',
          }],
        });
      })
      .catch(error => {
        console.error('Error fetching chart data', error);
      });
  }, []);

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <a href="/">SafeCryptoStocks</a>
        </div>
        <div className="auth-buttons">
          <a href="/login" className="btn login">Login</a>
          <a href="/register" className="btn signup">Sign Up</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Start Your Journey to Financial Freedom with Cryptos</h1>
          <p>Unlock your financial future with SafeCryptoStocks. Start trading now!</p>
          <a href="/register" className="btn get-started">Get Started</a>
        </div>
      </header>

      {/* Crypto Market Overview */}
      <main>
        <section className="crypto-market">
          <h2>Live Cryptocurrency Prices</h2>
          <div className="market-overview">
            {cryptoData.map((coin) => (
              <div className="crypto-card" key={coin.id}>
                <h3>{coin.name} ({coin.symbol.toUpperCase()})</h3>
                <p className="price">Price: <span>${coin.current_price}</span></p>
                <p className={`change ${coin.price_change_percentage_24h >= 0 ? 'up' : 'down'}`}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Chart Section for Bitcoin Prices */}
        <section className="chart-section">
          <h2>Bitcoin Price - Last 7 Days</h2>
          {chartData && <Line data={chartData} options={{
            animation: {
              duration: 2000,
              easing: 'easeInOutBounce'
            },
            responsive: true,
            scales: {
              x: {
                ticks: {
                  color: '#fff',
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.2)'
                }
              },
              y: {
                ticks: {
                  color: '#fff',
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.2)'
                }
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: '#fff'
                }
              }
            }
          }} />}
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 SafeCryptoStocks. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Test;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';
// import './Test.css';

// function Test() {
//   const [cryptoData, setCryptoData] = useState([]);
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     // Fetch stock and crypto data from CoinGecko API
//     axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
//       .then(response => {
//         setCryptoData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data', error);
//       });

//     // Fetch Bitcoin price data for the last 7 days for chart
//     axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7')
//       .then(response => {
//         const data = response.data.prices.map(price => price[1]);
//         const labels = response.data.prices.map(price => new Date(price[0]).toLocaleTimeString());
//         setChartData({
//           labels: labels,
//           datasets: [{
//             label: 'Bitcoin Price (USD)',
//             data: data,
//             borderColor: 'rgba(75,192,192,1)',
//             fill: false,
//             tension: 0.1,
//           }],
//         });
//       })
//       .catch(error => {
//         console.error('Error fetching chart data', error);
//       });
//   }, []);

//   return (
//     <div className="App">
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">
//           <a href="/">SafeCryptoStocks</a>
//         </div>
//         <div className="auth-buttons">
//           <a href="/login" className="btn login">Login</a>
//           <a href="/register" className="btn signup">Sign Up</a>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <header className="hero-section">
//         <div className="hero-content">
//           <h1>Invest in Cryptocurrencies with Confidence</h1>
//           <p>Join SafeCryptoStocks to trade securely and efficiently.</p>
//           <a href="/signup" className="btn get-started">Get Started</a>
//         </div>
//       </header>

//       {/* Crypto Market Overview */}
//       <main>
//         <section className="crypto-market">
//           <h2>Live Cryptocurrency Prices</h2>
//           <div className="market-overview">
//             {cryptoData.map((coin) => (
//               <div className="crypto-card" key={coin.id}>
//                 <h3>{coin.name} ({coin.symbol.toUpperCase()})</h3>
//                 <p className="price">Price: <span>${coin.current_price}</span></p>
//                 <p className={`change ${coin.price_change_percentage_24h >= 0 ? 'up' : 'down'}`}>
//                   {coin.price_change_percentage_24h.toFixed(2)}%
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>
//         {/* Chart Section for Bitcoin Prices */}
//         <section className="chart-section">
//           <h2>Bitcoin Price - Last 7 Days</h2>
//           {chartData && <Line data={chartData} />}
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="footer">
//         <p>&copy; 2024 SafeCryptoStocks. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default Test;
