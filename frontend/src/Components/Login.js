import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

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
  const words = ["Fantasy", "Mystery", "Novel", "Story", "Adventure", "Fiction", "Nonfiction", "Classic", "Bestseller", "Author", "Chapter", "Bookstore", "Literary", "Saga", "Series", "Romance"];
  
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

const PageTurn = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="book-opened w-64 h-48 relative">
        <div className="book-page-left absolute left-0 top-0 bottom-0 w-1/2 bg-white border-r border-gray-300"></div>
        <div className="book-page-right absolute right-0 top-0 bottom-0 w-1/2 bg-white border-l border-gray-300"></div>
        <div className="book-page-turning absolute right-0 top-0 bottom-0 w-1/2 bg-white shadow-lg origin-left"></div>
      </div>
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

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState("");

  const books = [
    { color: "indigo", delay: 0, position: { top: 15, left: 10, z: 2 } },
    { color: "blue", delay: 0.5, position: { top: 25, left: 85, z: 1 } },
    { color: "green", delay: 1.2, position: { top: 70, left: 15, z: 3 } },
    { color: "amber", delay: 0.7, position: { top: 65, left: 80, z: 2 } },
    { color: "red", delay: 1.5, position: { top: 40, left: 5, z: 1 } },
    { color: "purple", delay: 0.3, position: { top: 20, left: 40, z: 2 } },
    { color: "pink", delay: 1.8, position: { top: 75, left: 45, z: 3 } },
    { color: "indigo", delay: 0.9, position: { top: 10, left: 70, z: 1 } },
    { color: "emerald", delay: 1.1, position: { top: 50, left: 90, z: 2 } },
  ];

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-30px); }
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
      
      @keyframes pageTurn {
        0%, 100% { transform: rotateY(0deg); box-shadow: none; }
        50% { transform: rotateY(-180deg); box-shadow: -10px 0 15px rgba(0,0,0,0.1); }
      }
      
      .book-page-turning {
        animation: pageTurn 4s ease-in-out infinite;
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
        animation: formAppear 1s forwards;
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
      
      .shelf {
        box-shadow: 0 -5px 15px rgba(0,0,0,0.3);
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
        background-image: linear-gradient(to right,rgb(70, 134, 229) 0%, #818CF8 50%,rgb(70, 144, 229) 100%);
      }
      
      .btn-shine:hover {
        background-position: left center;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    // Check if using admin credentials directly
    if (formData.email === "admin@gmail.com" && formData.password === "Admin@1234") {
      // Store admin user data in localStorage
      const adminUserData = {
        token: "admin-token", // You might want to use a real token from your backend
        userId: "admin-user-id",
        email: formData.email,
        fullName: "Admin User",
        isAdmin: true
      };
      
      localStorage.setItem('userData', JSON.stringify(adminUserData));
      
      setMessage("Admin login successful! 🚀");
      setMessageType("success");
      
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 500);
      
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email: formData.email,
        password: formData.password
      });

      const userData = {
        token: response.data.token,
        userId: response.data.userId,
        email: response.data.email,
        fullName: response.data.fullName,
        isAdmin: response.data.isAdmin || false
      };

      localStorage.setItem('userData', JSON.stringify(userData));

      setMessage("Login successful! 🚀");
      setMessageType("success");

      if (response.data.isAdmin) {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      let errorMsg;

      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg = error.response.data;
        } else if (error.response.data.message) {
          errorMsg = error.response.data.message;
        }
      }

      if (!errorMsg) {
        errorMsg = "Login failed. Please check your credentials.";
      }

      setMessage(errorMsg);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen relative overflow-hidden bg-animated flex items-center justify-center">
    
      <Particles />
      <FloatingText />
      <LibraryShelf />

      {books.map((book, index) => (
        <Book key={index} color={book.color} delay={book.delay} position={book.position} />
      ))}

      <div className="max-w-md w-full z-20 mx-4">
        <div 
          className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl backdrop-filter backdrop-blur-lg form-appear relative border border-indigo-100"
          style={{animationDelay: '0.3s'}}
        >
  
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-indigo-900 mb-1">Start Your Reading Journey</h2>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            
            {message && (
              <div 
                className={`p-3 rounded text-sm font-medium ${
                  messageType === "success" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message}
              </div>
            )}
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="animate-spin h-5 w-5 text-indigo-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                ) : null}
                {loading ? "Logging in..." : "Log in to LitLoom"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;