import api from './api';

export const getAllBooks = async () => {
  try {
    const response = await api.get('/books');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    throw error;
  }
};