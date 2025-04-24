import { useState, useEffect } from 'react';
import Header from './Header';

export default function BookCatalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/books');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch books:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, []);

  const addToCart = (book) => {
    setCart([...cart, book]);
    setCartOpen(true);

    setTimeout(() => {
      setCartOpen(false);
    }, 3000);
  };

  const buyNow = (book) => {
    alert(`Proceeding to checkout for ${book.title}!`);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, book) => total + (parseFloat(book.price) || 0), 0).toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your literary adventure...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg w-full text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold text-red-700 mb-2">Unable to Load Books</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen bg-gradient-to-r from-blue-50 to-cyan-50">
        
        <div className="container mx-auto px-6 py-8">
          <div className="fixed bottom-6 right-6 z-10">
            <button 
              onClick={() => setCartOpen(!cartOpen)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
          
          <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 z-20 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">Your Cart ({cart.length})</h2>
                <button onClick={() => setCartOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div key={`${item.id}-${index}`} className="flex items-center bg-gray-50 rounded-lg p-3">
                        <img 
                          src={`http://localhost:8080${item.imageUrl}`}
                          alt={item.title}
                          className="h-16 w-12 object-cover rounded"
                        />
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium text-gray-800 truncate">{item.title}</h3>
                          <p className="text-gray-500 text-sm">${item.price || '0.00'}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="p-4 border-t bg-gray-50">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold">${getTotalPrice()}</span>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Backdrop for Cart Drawer */}
          {cartOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-10"
              onClick={() => setCartOpen(false)}
            ></div>
          )}
          
          {/* Books Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Books</h2>
            
            {books.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="text-gray-500">No books found in the database.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                  <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative pb-2/3">
                      <img
                        src={`http://localhost:8080${book.imageUrl}`}
                        alt={book.title}
                        className="w-full h-64 object-cover transition-transform hover:scale-105"
                      />
                      <div className="absolute top-2 right-2">
                        <button 
                          onClick={() => addToCart(book)}
                          className="bg-blue-600 bg-opacity-90 hover:bg-opacity-100 text-white rounded-full p-2 transform hover:scale-110 transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-bold text-xl text-gray-800 mb-1 line-clamp-1">{book.title}</h3>
                      <p className="text-gray-500 mb-3">by {book.author}</p>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{book.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-blue-600">${book.price || 'N/A'}</span>
                        <button
                          onClick={() => buyNow(book)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
      </div>
    </>
  );
}