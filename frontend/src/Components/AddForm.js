import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { useNavigate } from 'react-router-dom';


const Book = ({ color, delay, position }) => {
  const bookStyle = {
    animation: `float 8s ease-in-out infinite ${delay}s, rotateBook 15s linear infinite ${delay}s`,
    top: `${position.top}%`,
    left: `${position.left}%`,
    zIndex: position.z || 0
  };

  return (
    <div className="absolute" style={bookStyle}>
      <div className="book-container">
        <div className={`book bg-${color}-600 w-16 h-24 relative transform-gpu`}>
          <div className={`book-cover bg-${color}-700 absolute inset-0 transform-gpu`}></div>
          <div className={`book-spine bg-${color}-800 absolute left-0 top-0 bottom-0 w-3 transform-gpu`}></div>
          <div className={`book-page absolute inset-0 bg-white transform-gpu`}></div>
          <div className={`book-page-lines absolute top-1/4 left-1/4 right-1/4 space-y-2`}>
            <div className={`h-1 bg-${color}-200 w-full rounded`}></div>
            <div className={`h-1 bg-${color}-200 w-3/4 rounded`}></div>
            <div className={`h-1 bg-${color}-200 w-1/2 rounded`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Particles = () => {
  return (
    <div className="particles absolute inset-0 overflow-hidden pointer-events-none">
      {Array(30).fill().map((_, i) => (
        <div 
          key={i}
          className="particle absolute rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            background: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
            animation: `particleMove ${Math.random() * 10 + 10}s linear infinite, particleFade ${Math.random() * 5 + 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 10}s`
          }}
        ></div>
      ))}
    </div>
  );
};

const FloatingText = () => {
  const words = ["Book", "Author", "Publisher", "ISBN", "Literature", "Novel", "Genre", "Cover", "Publication", "Library", "Collection", "Pages", "Edition"];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none text-opacity-10">
      {words.map((word, i) => (
        <div 
          key={i}
          className="absolute text-indigo-800 opacity-10 font-serif"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 12 + 12}px`,
            animation: `textFloat ${Math.random() * 20 + 20}s linear infinite, textFade ${Math.random() * 10 + 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 10}s`
          }}
        >{word}</div>
      ))}
    </div>
  );
};
const LibraryShelf = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-1/6 flex items-end overflow-hidden">
      <div className="w-full h-12 bg-amber-800 relative shelf">
        {Array(12).fill().map((_, i) => (
          <div 
            key={i} 
            className="absolute bottom-full" 
            style={{
              left: `${i * 8 + Math.random() * 2}%`,
              width: '5%',
              height: `${Math.random() * 40 + 40}px`,
              backgroundColor: ['#4F46E5', '#0EA5E9', '#F59E0B', '#10B981', '#EC4899', '#6366F1'][Math.floor(Math.random() * 6)],
              transform: `rotate(${Math.random() * 4 - 2}deg)`,
              transformOrigin: 'bottom'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};
const AddBookStyled = () => {
  const initialBookState = {
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    description: '',
    price: '',
    stockQuantity: '',
    category: '',
    language: '',
    publicationYear: ''
  };

  const [book, setBook] = useState(initialBookState);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
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
 
  const [formSections, setFormSections] = useState([]);
  
 
  const books = [
    { color: "indigo", delay: 0.2, position: { top: 10, left: 5, z: 1 } },
    { color: "blue", delay: 0.7, position: { top: 85, left: 8, z: 2 } },
    { color: "purple", delay: 1.2, position: { top: 15, left: 90, z: 1 } },
    { color: "green", delay: 0.5, position: { top: 80, left: 92, z: 2 } },
  ];

  useEffect(() => {

    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
      }
      
      @keyframes rotateBook {
        0% { transform: rotate3d(0.1, 0.1, 0.1, 0deg); }
        25% { transform: rotate3d(0.1, 0.1, 0.1, 90deg); }
        50% { transform: rotate3d(0.1, 0.1, 0.1, 180deg); }
        75% { transform: rotate3d(0.1, 0.1, 0.1, 270deg); }
        100% { transform: rotate3d(0.1, 0.1, 0.1, 360deg); }
      }
      
      @keyframes particleMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(calc(100vw - 100%), calc(100vh - 100%)); }
      }
      
      @keyframes particleFade {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
      }
      
      @keyframes textFloat {
        0% { transform: translateX(0) rotate(0deg); }
        50% { transform: translateX(200px) rotate(15deg); }
        100% { transform: translateX(0) rotate(0deg); }
      }
      
      @keyframes textFade {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.3; }
      }
      
      .book-container {
        perspective: 1000px;
      }
      
      .book {
        transform-style: preserve-3d;
        transition: transform 0.5s;
      }
      
      .book:hover {
        transform: rotateY(30deg);
      }
      
      .book-cover {
        transform: translateZ(5px);
      }
      
      .book-spine {
        transform: rotateY(-90deg) translateZ(2px);
      }
      
      .book-page {
        transform: translateZ(3px);
      }
      
      .form-appear {
        animation: formAppear 0.8s forwards;
        opacity: 0;
        transform: translateY(20px);
      }
      
      @keyframes formAppear {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      
      .input-focus-effect:focus {
        box-shadow: 0 0 15px rgba(79, 70, 229, 0.4);
        transform: translateY(-2px);
      }
      
      .bg-animated {
        background: linear-gradient(
          -45deg, 
          #EEF2FF, 
          #E0E7FF, 
          #C7D2FE, 
          #A5B4FC, 
          #818CF8
        );
        background-size: 400% 400%;
        animation: gradientBG 15s ease infinite;
      }
      
      @keyframes gradientBG {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .btn-shine {
        background-position: right center;
        transition: background 0.8s ease;
        background-size: 200% auto;
        background-image: linear-gradient(to right, #4F46E5 0%, #818CF8 50%, #4F46E5 100%);
      }
      
      .btn-shine:hover {
        background-position: left center;
      }
      
      .field-group {
        transition: all 0.3s ease;
      }
      
      .field-group:hover {
        transform: translateY(-3px);
      }
      
      @keyframes pulseHighlight {
        0%, 100% { box-shadow: 0 0 0 rgba(79, 70, 229, 0); }
        50% { box-shadow: 0 0 15px rgba(79, 70, 229, 0.3); }
      }
      
      .highlight-pulse {
        animation: pulseHighlight 2s infinite;
      }
      
      @keyframes coverReveal {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      
      .cover-reveal {
        animation: coverReveal 0.5s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    
  
    const sections = document.querySelectorAll('.field-group');
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add('form-appear');
      }, 300 + index * 150);
    });
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setBook(initialBookState);
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!image) {
      setMessage({ text: 'Please select an image for the book', type: 'error' });
      return;
    }
    
    setLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      const formData = new FormData();

      const bookData = {
        ...book,
        price: book.price ? parseFloat(book.price) : null,
        stockQuantity: book.stockQuantity ? parseInt(book.stockQuantity) : null,
        publicationYear: book.publicationYear ? parseInt(book.publicationYear) : null,
        rating: book.rating ? parseFloat(book.rating) : null
      };
      
      formData.append('book', new Blob([JSON.stringify(bookData)], {
        type: 'application/json'
      }));

      formData.append('image', image);

      const response = await axios.post('http://localhost:8080/api/books/upload', 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      console.log('Book added successfully:', response.data);
      setMessage({ text: 'Book added successfully!', type: 'success' });
      resetForm();
      
    } catch (err) {
      console.error('Error adding book:', err);
      setMessage({ 
        text: err.response?.data?.message || 'Failed to add book. Please try again.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Fiction', 'Non-fiction', 'Science Fiction', 'Fantasy', 'Mystery',
    'Biography', 'History', 'Self-help', 'Business', 'Computer Science'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Chinese', 
    'Japanese', 'Russian', 'Arabic', 'Hindi'
  ];

  return (
    <>
      <Header/>
      <div className="min-h-screen relative overflow-hidden bg-animated">
     
        <Particles />
        <FloatingText />
        <LibraryShelf/>
        {books.map((book, index) => (
          <Book key={index} color={book.color} delay={book.delay} position={book.position} />
        ))}
        
        <div className="max-w-4xl mx-auto py-12 px-6 relative z-10">
          <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl backdrop-filter backdrop-blur-lg form-appear relative border border-indigo-100 mt-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Add New Book to Your Library</h1>
            
            {message.text && (
              <div className={`mb-6 p-4 rounded-md ${
                message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 
                'bg-red-100 text-red-700 border border-red-300'
              }`}>
                {message.text}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 field-group" style={{animationDelay: '0.15s'}}>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 input-focus-effect transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2 field-group" style={{animationDelay: '0.3s'}}>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                    Author <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 input-focus-effect transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2 field-group" style={{animationDelay: '0.45s'}}>
                  <label htmlFor="publisher" className="block text-sm font-medium text-gray-700">
                    Publisher
                  </label>
                  <input
                    type="text"
                    id="publisher"
                    name="publisher"
                    value={userData?.userId}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 input-focus-effect transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2 field-group" style={{animationDelay: '0.6s'}}>
                  <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
                    ISBN
                  </label>
                  <input
                    type="text"
                    id="isbn"
                    name="isbn"
                    value={book.isbn}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 input-focus-effect transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2 field-group" style={{animationDelay: '0.75s'}}>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={book.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 input-focus-effect transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2 field-group" style={{animationDelay: '0.9s'}}>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={book.price}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className="w-full p-3 pl-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 input-focus-effect transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div className="space-y-2 field-group" style={{animationDelay: '1.05s'}}>
                  <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    id="stockQuantity"
                    name="stockQuantity"
                    value={book.stockQuantity}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 input-focus-effect transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2 field-group" style={{animationDelay: '1.2s'}}>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={book.category}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 input-focus-effect transition-all duration-300"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2 field-group" style={{animationDelay: '1.35s'}}>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                    Language
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={book.language}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 input-focus-effect transition-all duration-300"
                  >
                    <option value="">Select Language</option>
                    {languages.map(language => (
                      <option key={language} value={language}>
                        {language}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2 field-group" style={{animationDelay: '1.5s'}}>
                  <label htmlFor="publicationYear" className="block text-sm font-medium text-gray-700">
                    Publication Year
                  </label>
                  <input
                    type="number"
                    id="publicationYear"
                    name="publicationYear"
                    value={book.publicationYear}
                    onChange={handleChange}
                    min="1000"
                    max={new Date().getFullYear()}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 input-focus-effect transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-4 md:col-span-2 field-group" style={{animationDelay: '1.65s'}}>
                  <label className="block text-sm font-medium text-gray-700">
                    Book Cover Image
                  </label>
                  
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-full md:w-1/2">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors duration-300 highlight-pulse">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <div className="space-y-2">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-sm text-gray-500">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    {imagePreview && (
                      <div className="w-full md:w-1/2 bg-gray-50 p-4 rounded-lg cover-reveal">
                        <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                        <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-md border border-gray-200">
                          <img 
                            src={imagePreview} 
                            alt="Book cover preview" 
                            className="object-cover h-64 w-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center pt-6 field-group" style={{animationDelay: '1.8s'}}>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-8 py-3 text-white rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto btn-shine"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Book...
                    </div>
                  ) : 'Add Book to Library'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBookStyled;