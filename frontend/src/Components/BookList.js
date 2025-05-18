import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import Header from './Header';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
   const [category, setCategory] = useState("");
  //const [books, setBooks] = useState([]);

  const fetchBooks = (category) => {
    const params = {};
    if (category) params.category = category;

    axios
      .get("http://localhost:8080/api/books/books", { params })
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books", err));
  };

  const handleFilterChange = (type, value) => {
    if (type === "category") {
      setCategory(value);
      fetchBooks(value);
    }
  };

  useEffect(() => {
    fetchBooks(); // Load all books initially
  }, []);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/books');
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load books');
        setLoading(false);
        console.error('Error fetching books:', err);
      }
    };
    
    fetchBooks();
  }, []);
  
  // Filter books based on search term
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get current books for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader">Loading...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }
  
  return (
    <>
    <Header/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Discover Books</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search books by title or author..."
          className="w-full px-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page when searching
          }}
        />
      </div>
      
      {filteredBooks.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">No books found matching your search.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <ul className="flex">
              {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }).map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`mx-1 px-3 py-1 rounded ${
                      currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default BookList;