import React, { useState, useEffect } from 'react';
import './Test.css';
import Navbar from '../LandingPage/Navbar';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const Test = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [portfolioId, setPortfolioId] = useState('');
  const [noOfShares, setNoOfShares] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccessErrorModalOpen, setIsSuccessErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false); // Loading state to show processing

  useEffect(() => {
    // Fetch initial stock data (replace with actual API endpoint)
    fetch('http://localhost:8005/auth/stock/coins')
      .then((response) => response.json())
      .then((data) => setStocks(data))
      .catch((error) => console.error('Error fetching stocks:', error));
  }, []);

  const handleBuyButtonClick = (stock) => {
    setSelectedStock(stock); // Store the selected stock for later use
    setIsBuyModalOpen(true); // Open the buy modal
  };

  const handlePaymentButtonClick = () => {
    setIsPaymentModalOpen(true); // Open payment modal
  };

  const handleSubmitPayment = () => {
    setLoading(true); // Start loading
    // Simulate the API call to buy stock
    fetch(`http://localhost:8005/auth/stock/${portfolioId}/buy-stock?stockSymbol=${selectedStock.id}&noOfShares=${noOfShares}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        portfolioId,
        noOfShares,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setModalType('success');
        setModalMessage('Payment successful! Stock purchased.');
        setIsPaymentModalOpen(false); // Close the payment modal after success
        setIsSuccessErrorModalOpen(true); // Open the success modal
        setLoading(false); // End loading
      })
      .catch((error) => {
        setModalType('error');
        setModalMessage('Payment failed. Please try again.');
        setIsPaymentModalOpen(false); // Close the payment modal after error
        setIsSuccessErrorModalOpen(true); // Open the error modal
        setLoading(false); // End loading
      });
  };

  const handleSubmit = () => {
    if (!portfolioId || !noOfShares || !selectedStock) {
      alert('Please fill out all fields.');
      return;
    }
    handlePaymentButtonClick();
  };

  const handleCloseSuccessErrorModal = () => {
    setIsSuccessErrorModalOpen(false); // Close the success/error modal
  };

  return (
    <div className="container">
      <Navbar />
      <h1>Crypto-Currencies</h1>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Stock Name</th>
            <th>Stock Symbol</th>
            <th>Current Price</th>
            <th>24hr %</th>
            <th>Market Cap</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={stock.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={stock.image}
                  alt={`${stock.name} logo`}
                  className="crypto-logo"
                />
                {stock.name}
              </td>
              <td>{stock.id}</td>
              <td>${stock.current_price.toLocaleString()}</td>
              <td className={stock.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                {stock.price_change_percentage_24h >= 0 ? '+' : ''}
                {stock.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td>${stock.market_cap.toFixed(2)}</td>
              <td>
                <button className="buy-btn" onClick={() => handleBuyButtonClick(stock)}>
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for success/error */}
      <Modal
        open={isSuccessErrorModalOpen}
        onClose={handleCloseSuccessErrorModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 2,
            boxShadow: 24,
            textAlign: 'center',
          }}
        >
          {modalType === 'success' ? (
            <CheckCircleIcon sx={{ fontSize: 80, color: 'green', marginBottom: 2 }} />
          ) : (
            <ErrorIcon sx={{ fontSize: 80, color: 'red', marginBottom: 2 }} />
          )}
          <Typography id="modal-title" variant="h6" component="h2">
            {modalType === 'success' ? 'Success!' : 'Error'}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 1 }}>
            {modalMessage}
          </Typography>
          <IconButton
            sx={{ marginTop: 2, color: modalType === 'success' ? 'green' : 'red' }}
            onClick={handleCloseSuccessErrorModal}
          >
            Close
          </IconButton>
        </Box>
      </Modal>

      {/* Buy Stock Modal */}
      {isBuyModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Buy Stock</h2>
            <label htmlFor="portfolioId">Portfolio ID:</label>
            <input
              type="text"
              id="portfolioId"
              placeholder="Enter Portfolio ID"
              value={portfolioId}
              onChange={(e) => setPortfolioId(e.target.value)}
            />
            <label htmlFor="noOfShares">Number of Shares:</label>
            <input
              type="number"
              id="noOfShares"
              placeholder="Enter number of shares"
              value={noOfShares}
              onChange={(e) => setNoOfShares(e.target.value)}
            />
            <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <>
                  Processing... <div className="spinner"></div>
                </>
              ) : (
                'Confirm Purchase'
              )}
            </button>

            <button className="close-btn" onClick={() => setIsBuyModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Pay with Card</h2>
            <CreditCardIcon sx={{ fontSize: 50, color: '#4CAF50', marginBottom: 2 }} />
            <p>Enter your payment details to confirm purchase.</p>

            {/* Card Details Form */}
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              placeholder="1234 5678 9876 5432"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength="16"
            />

            <label htmlFor="expiryDate">Expiry Date (MM/YY):</label>
            <input
              type="text"
              id="expiryDate"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              maxLength="5"
            />

            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength="3"
            />
            <button className="submit-btn" onClick={handleSubmitPayment} disabled={loading}>
              {loading ? (
                <>
                  Processing... <div className="spinner"></div>
                </>
              ) : (
                'Confirm Payment'
              )}
            </button>
            <button className="close-btn" onClick={() => setIsPaymentModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
