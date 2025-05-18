import { useState, useEffect } from 'react';
import { getCartItems } from './services/cartService'; // Import the cart service
import Header from './Header';

// Assuming you have a DEMO_USER_ID defined in your constants or environment
const DEMO_USER_ID = 1; // Replace with your actual user ID constant

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch cart items when component mounts
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // getCartItems now handles getting the userId internally
      const data = await getCartItems();
      setCartItems(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  };
  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const itemToUpdate = cartItems.find(item => item.id === id);
      const updatedItem = { ...itemToUpdate, quantity: newQuantity };
      
      const response = await fetch(`http://localhost:8080/api/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update quantity');
      }
      
      // Update local state
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const removeItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove item');
      }
      
      // Update local state
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
    <Header/>
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Shopping Cart</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {cartItems.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <button 
            onClick={() => window.location.href = '/books'} 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse Books
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-6 py-3 text-gray-600">Book</th>
                  <th className="px-6 py-3 text-gray-600">Price</th>
                  <th className="px-6 py-3 text-gray-600">Quantity</th>
                  <th className="px-6 py-3 text-gray-600">Subtotal</th>
                  <th className="px-6 py-3 text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {item.book ? item.book.title : `Book #${item.bookId}`}
                          </h3>
                          {item.book && (
                            <p className="text-sm text-gray-500">{item.book.author}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">${item.price?.toFixed(2) || '0.00'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      ${(item.price * item.quantity)?.toFixed(2) || '0.00'}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 bg-gray-50 border-t">
            <div className="flex justify-between items-center">
              <div className="text-gray-600">
                <span className="mr-2">Total Items:</span>
                <span className="font-medium">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <div className="flex items-center">
                <span className="text-lg text-gray-600 mr-2">Total:</span>
                <span className="text-2xl font-bold text-blue-700">${calculateTotal()}</span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors font-medium">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}