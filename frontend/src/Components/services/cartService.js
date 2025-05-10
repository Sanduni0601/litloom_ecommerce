import api from './api';

// For demo purposes, using a fixed userId
const DEMO_USER_ID = 1;

export const addToCart = async (userId,bookId, quantity) => {
  try {
    const response = await api.post('/cart/add', {
      userId,
      bookId,
      quantity
    });
    return response.data;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

// export const getCartItems = async () => {
//   try {
//     const response = await api.get(`/cart/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching cart items:', error);
//     throw error;
//   }
// };

export const removeFromCart = async (cartItemId) => {
  try {
    const response = await api.delete(`/cart/${cartItemId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

export const updateCartItemQuantity = async (cartItemId, quantity) => {
  try {
    const response = await api.put(`/cart/${cartItemId}`, { quantity });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw error;
  }
};