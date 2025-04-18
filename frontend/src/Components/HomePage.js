import React from 'react';
import {
  FaBookOpen,
  FaShoppingBasket,
  FaStar,
  FaCheck,
  FaBicycle
} from 'react-icons/fa';
import girl from '../Images/image1.png';
import Header from '../Components/Header'
const HomePage = () => {
  return (
<>
     <Header/>

     

      <section className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-cyan-50 px-6 pt-12 pb-16">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-cyan-100 opacity-60"></div>
          <div className="absolute top-40 -left-20 w-40 h-40 rounded-full bg-orange-100 opacity-50"></div>
          <div className="absolute bottom-10 right-1/4 w-28 h-28 rounded-full bg-blue-100 opacity-40"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="md:flex items-center justify-between">
            <div className="max-w-xl mb-10 md:mb-0 md:pr-8">
              <div className="inline-block bg-orange-100 text-orange-500 px-4 py-1 rounded-full font-medium text-sm mb-4">
                Up To 30% Off - Limited Time Offer
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
                Get Your New Book
                <br />
                <span className="text-cyan-700 relative">
                  With The Best Price
                  <span className="absolute bottom-2 left-0 h-3 w-full bg-orange-200 opacity-40 z-0"></span>
                </span>
              </h1>
              
              <p className="text-gray-600 mb-6 text-lg">
                Explore our curated collection of bestsellers, new releases, and timeless classics at unbeatable prices.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="bg-cyan-100 p-2 rounded-full text-cyan-700">
                    <FaBookOpen />
                  </div>
                  <span>10,000+ Books</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="bg-orange-100 p-2 rounded-full text-orange-500">
                    <FaShoppingBasket />
                  </div>
                  <span>Free Shipping</span>
                </div>
              </div>

              <button className="bg-cyan-900 text-white px-8 py-3 rounded-full hover:bg-cyan-800 transition shadow-lg flex items-center gap-2">
                Shop Now 
                <span className="ml-1">→</span>
              </button>
            </div>
           
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-white to-blue-100 rounded-3xl mr-50"></div>
              
              <div className="relative flex flex-col-reverse md:flex-row items-center p-6 rounded-3xl">
                <div className="flex flex-col gap-4 mt-4 md:mt-0 md:mr-10 z-10">
                  <div className="flex items-center bg-white px-4 py-3 rounded-full shadow-md">
                    <div className="mr-2 bg-amber-100 p-2 rounded-full">
                      <FaStar className="text-amber-500" />
                    </div>
                    <div>
                      <p className="font-medium">4.8/5 Rating</p>
                      <p className="text-xs text-gray-500">from 2,500+ reviews</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-white px-4 py-3 rounded-full shadow-md">
                    <div className="mr-2 bg-green-100 p-2 rounded-full">
                      <FaCheck className="text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Trusted Shop</p>
                      <p className="text-xs text-gray-500">100% satisfaction</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-white px-4 py-3 rounded-full shadow-md">
                    <div className="mr-2 bg-green-100 p-2 rounded-full">
                      <FaBicycle className="text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Fast Delivery</p>
                      <p className="text-xs text-gray-500">2/3 days delivery</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <img
                    src={girl}
                    alt="Girl with book"
                    className="w-64 md:w-80 h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden line-height-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0S321.39,56.44,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>
    </>
  );
};

export default HomePage;