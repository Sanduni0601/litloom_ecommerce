// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const BookDetail = () => {
//   const { bookId } = useParams();
//   const navigate = useNavigate();
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [addingToCart, setAddingToCart] = useState(false);
//   const [addToCartSuccess, setAddToCartSuccess] = useState(false);
  
//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`http://localhost:8080/api/books/${bookId}`);
//         setBook(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load book details');
//         setLoading(false);
//         console.error('Error fetching book details:', err);
//       }
//     };
    
//     fetchBookDetails();
//   }, [bookId]);
  
//   const handleQuantityChange = (e) => {
//     const value = parseInt(e.target.value);
//     if (value > 0 && value <= (book?.stockQuantity || 1)) {
//       setQuantity(value);
//     }
//   };
  
//   const handleAddToCart = async () => {
//     const token = localStorage.getItem('token');
    
//     if (!token) {
//       navigate('/booklist');
//       return;
//     }
    
//     setAddingToCart(true);
    
//     try {
//       await axios.post(`/api/cart/add/${bookId}/${quantity}`, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
      
//       setAddingToCart(false);
//       setAddToCartSuccess(true);
      
//       // Reset success message after 3 seconds
//       setTimeout(() => {
//         setAddToCartSuccess(false);
//       }, 3000);
//     } catch (err) {
//       setAddingToCart(false);
//       setError('Failed to add to cart');
//       console.error('Error adding to cart:', err);
//     }
//   };
  
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
//           <p className="mt-4 text-gray-600 font-medium">Loading book details...</p>
//         </div>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
//           <div className="flex items-center">
//             <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//             <p className="font-medium">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="bg-gray-50 min-h-screen py-12">
//       <div className="container mx-auto px-4">
//         <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-6xl mx-auto">
//           <div className="md:flex">
//             <div className="md:w-2/5 bg-gray-50 flex justify-center items-center p-8">
//               {book?.imageUrl ? (
//                 <img 
//                   src={`http://localhost:8080${book.imageUrl}`} 
//                   alt={book.title}
//                   className="max-h-96 object-contain rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
//                 />
//               ) : (
//                 <div className="flex flex-col items-center text-gray-400 bg-gray-100 p-12 rounded-lg">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                   </svg>
//                   <p className="mt-4 font-medium">No Cover Available</p>
//                 </div>
//               )}
//             </div>
            
//             <div className="md:w-3/5 p-8">
//               <nav className="mb-4">
//                 <ol className="flex text-sm text-gray-500">
//                   <li className="hover:text-blue-600 cursor-pointer">Home</li>
//                   <li className="mx-2">/</li>
//                   <li className="hover:text-blue-600 cursor-pointer">Books</li>
//                   <li className="mx-2">/</li>
//                   <li className="text-gray-700 font-medium">{book?.genre}</li>
//                 </ol>
//               </nav>
              
//               <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">{book?.title}</h1>
//               <p className="text-gray-600 mb-6 text-lg">by <span className="italic font-medium">{book?.author}</span></p>
              
//               <div className="mb-8 flex items-center">
//                 <div className="flex items-center mr-4">
//                   <span className="text-3xl font-bold text-blue-700">${book?.price?.toFixed(2)}</span>
//                 </div>
//                 <div>
//                   <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                     book?.stockQuantity > 10 
//                       ? 'bg-green-100 text-green-800' 
//                       : book?.stockQuantity > 0 
//                         ? 'bg-yellow-100 text-yellow-800' 
//                         : 'bg-red-100 text-red-800'
//                   }`}>
//                     {book?.stockQuantity > 10 
//                       ? '✓ In Stock' 
//                       : book?.stockQuantity > 0 
//                         ? `Only ${book?.stockQuantity} left` 
//                         : 'Out of Stock'}
//                   </span>
//                 </div>
//               </div>
              
//               <div className="mb-8 bg-gray-50 p-4 rounded-lg">
//                 <h2 className="text-xl font-semibold mb-3 text-gray-800">Description</h2>
//                 <p className="text-gray-700 leading-relaxed">{book?.description || 'No description available.'}</p>
//               </div>
              
//               <div className="mb-8">
//                 <h2 className="text-xl font-semibold mb-3 text-gray-800">Details</h2>
//                 <div className="grid md:grid-cols-2 gap-y-3 gap-x-6 bg-gray-50 p-4 rounded-lg">
//                   <div>
//                     <p className="text-gray-500 text-sm">Genre</p>
//                     <p className="font-medium">{book?.genre || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 text-sm">ISBN</p>
//                     <p className="font-medium">{book?.isbn || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 text-sm">Publisher</p>
//                     <p className="font-medium">{book?.publisher || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 text-sm">Publication Date</p>
//                     <p className="font-medium">{book?.publicationDate || 'N/A'}</p>
//                   </div>
//                 </div>
//               </div>
              
//               {book?.stockQuantity > 0 && (
//                 <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//                   <div className="flex items-center mb-6">
//                     <label htmlFor="quantity" className="mr-4 font-medium text-gray-700">Quantity:</label>
//                     <div className="flex border border-gray-300 rounded-md shadow-sm">
//                       <button 
//                         type="button"
//                         className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium rounded-l-md"
//                         onClick={() => quantity > 1 && setQuantity(quantity - 1)}
//                       >
//                         −
//                       </button>
//                       <input
//                         type="number"
//                         id="quantity"
//                         min="1"
//                         max={book?.stockQuantity}
//                         value={quantity}
//                         onChange={handleQuantityChange}
//                         className="w-16 text-center border-l border-r border-gray-300"
//                       />
//                       <button 
//                         type="button"
//                         className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium rounded-r-md"
//                         onClick={() => quantity < book?.stockQuantity && setQuantity(quantity + 1)}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center flex-wrap">
//                     <button
//                       onClick={handleAddToCart}
//                       disabled={addingToCart || book?.stockQuantity === 0}
//                       className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                       </svg>
//                       {addingToCart ? 'Adding...' : 'Add to Cart'}
//                     </button>
                    
//                     <button className="ml-4 border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                       </svg>
//                       Add to Wishlist
//                     </button>
                    
//                     {addToCartSuccess && (
//                       <div className="w-full mt-4 text-green-600 bg-green-50 p-3 rounded-lg flex items-center">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                         Added to cart successfully!
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookDetail;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addToCart } from './services/cartService';

const BookDetail = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addToCartMessage, setAddToCartMessage] = useState('');
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);
  
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/books/${bookId}`);
        setBook(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load book details');
        setLoading(false);
        console.error('Error fetching book details:', err);
      }
    };
    
    fetchBookDetails();
  }, [bookId]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (book?.stockQuantity || 1)) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      const response = await addToCart(bookId, quantity);
      
      if (response.success) {
        setAddToCartSuccess(true);
        setAddToCartMessage(response.message);
      } else {
        setAddToCartSuccess(false);
        setAddToCartMessage(response.message);
        
        // If authentication is required, redirect to login
        if (response.message === 'Authentication required') {
          navigate('/login');
          return;
        }
      }
      
      // Reset message after 3 seconds
      setTimeout(() => {
        setAddToCartMessage('');
        setAddToCartSuccess(false);
      }, 3000);
    } catch (err) {
      setAddToCartSuccess(false);
      setAddToCartMessage('Error adding to cart');
      console.error('Error adding to cart:', err);
    } finally {
      setAddingToCart(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading book details...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-6xl mx-auto">
          <div className="md:flex">
            <div className="md:w-2/5 bg-gray-50 flex justify-center items-center p-8">
              {book?.imageUrl ? (
                <img 
                  src={`http://localhost:8080${book.imageUrl}`} 
                  alt={book.title}
                  className="max-h-96 object-contain rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400 bg-gray-100 p-12 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <p className="mt-4 font-medium">No Cover Available</p>
                </div>
              )}
            </div>
            
            <div className="md:w-3/5 p-8">
              <nav className="mb-4">
                <ol className="flex text-sm text-gray-500">
                  <li className="hover:text-blue-600 cursor-pointer">Home</li>
                  <li className="mx-2">/</li>
                  <li className="hover:text-blue-600 cursor-pointer">Books</li>
                  <li className="mx-2">/</li>
                  <li className="text-gray-700 font-medium">{book?.genre}</li>
                </ol>
              </nav>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">{book?.title}</h1>
              <p className="text-gray-600 mb-6 text-lg">by <span className="italic font-medium">{book?.author}</span></p>
              
              <div className="mb-8 flex items-center">
                <div className="flex items-center mr-4">
                  <span className="text-3xl font-bold text-blue-700">${book?.price?.toFixed(2)}</span>
                </div>
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    book?.stockQuantity > 10 
                      ? 'bg-green-100 text-green-800' 
                      : book?.stockQuantity > 0 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {book?.stockQuantity > 10 
                      ? '✓ In Stock' 
                      : book?.stockQuantity > 0 
                        ? `Only ${book?.stockQuantity} left` 
                        : 'Out of Stock'}
                  </span>
                </div>
              </div>
              
              <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Description</h2>
                <p className="text-gray-700 leading-relaxed">{book?.description || 'No description available.'}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Details</h2>
                <div className="grid md:grid-cols-2 gap-y-3 gap-x-6 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-gray-500 text-sm">Genre</p>
                    <p className="font-medium">{book?.genre || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">ISBN</p>
                    <p className="font-medium">{book?.isbn || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Publisher</p>
                    <p className="font-medium">{book?.publisher || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Publication Date</p>
                    <p className="font-medium">{book?.publicationDate || 'N/A'}</p>
                  </div>
                </div>
              </div>
              
              {book?.stockQuantity > 0 && (
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-6">
                    <label htmlFor="quantity" className="mr-4 font-medium text-gray-700">Quantity:</label>
                    <div className="flex border border-gray-300 rounded-md shadow-sm">
                    
                    </div>
                  </div>
                  
                  <div className="flex items-center flex-wrap">
                    <button
                      onClick={handleAddToCart}
                      disabled={addingToCart || book?.stockQuantity === 0}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {addingToCart ? 'Adding...' : 'Add to Cart'}
                    </button>
                    
                    <button className="ml-4 border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Add to Wishlist
                    </button>
                    
                    {addToCartMessage && (
                      <div className={`w-full mt-4 ${addToCartSuccess ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} p-3 rounded-lg flex items-center`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {addToCartSuccess ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          )}
                        </svg>
                        {addToCartMessage}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;