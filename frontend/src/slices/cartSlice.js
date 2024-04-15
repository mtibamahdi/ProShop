import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {
      cartItems: [],
    };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      return updateCart(state);
    },
  },
});

export const getCartItems = (state) => state.cart;

export const getTotalCartPrice = (state) =>
  state.cart.cartItems.reduce((acc, item) => item.price * item.qty + acc, 0);

export const getTotalCartQuantity = (state) =>
  state.cart.cartItems.reduce((sum, curr) => curr.qty + sum, 0);

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
