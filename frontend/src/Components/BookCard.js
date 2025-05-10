import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart } from './services/cartService';

const BookCard = ({ book }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
 const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setIsLoggedIn(true);
    }
  }, []);
  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const response = await addToCart(userData.userId,book.id, quantity);
      
      if (response.success) {
        setMessage('Added to cart!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(response.message || 'Failed to add to cart');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error adding to cart');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:transform hover:scale-105">
      <div className="h-48 bg-gray-200 flex justify-center items-center">
        {book.imageUrl ? (
          <img 
            src={`http://localhost:8080${book.imageUrl}`} 
            alt={book.title}
            className="object-cover h-full w-full"
          />
        ) : (
          <div className="text-gray-400 text-center p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p>No Cover Available</p>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">${book.price}</span>
          <span className={`text-xs px-2 py-1 rounded ${
            book.stockQuantity > 10 
              ? 'bg-green-100 text-green-800' 
              : book.stockQuantity > 0 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'
          }`}>
            {book.stockQuantity > 10 
              ? 'In Stock' 
              : book.stockQuantity > 0 
                ? `Only ${book.stockQuantity} left` 
                : 'Out of Stock'}
          </span>
        </div>
        <div className="flex items-center mb-4">
        <label htmlFor={`quantity-${book.id}`} className="mr-2">Qty:</label>
        <select 
          id={`quantity-${book.id}`}
          value={quantity} 
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="border rounded p-1"
        >
          {[...Array(Math.min(10, book.stockQuantity)).keys()].map(num => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link 
            to={`/books/${book.id}`}
            className="text-center px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Details
          </Link>
         
          <button
        onClick={handleAddToCart}
        disabled={loading || book.stockQuantity === 0}
        className={`w-full py-2 px-4 rounded ${
          book.stockQuantity === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {loading ? 'Adding...' : book.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
      
      {message && (
        <div className="mt-2 text-center text-sm font-medium text-green-600">
          {message}
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;