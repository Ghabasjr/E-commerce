import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem, MenuItem, CartState } from '../../types';
import * as cartService from '../../services/cartService';

const initialState: CartState = {
  cart: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ 
    menuItem, 
    quantity, 
    customizations, 
    specialInstructions 
  }: {
    menuItem: MenuItem;
    quantity: number;
    customizations?: string[];
    specialInstructions?: string;
  }) => {
    const response = await cartService.addToCart({
      menuItem,
      quantity,
      customizations,
      specialInstructions,
    });
    return response;
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
    const response = await cartService.updateCartItem(itemId, quantity);
    return response;
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId: string) => {
    const response = await cartService.removeFromCart(itemId);
    return response;
  }
);

export const clearCart = createAsyncThunk('cart/clearCart', async () => {
  const response = await cartService.clearCart();
  return response;
});

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await cartService.getCart();
  return response;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateCartTotals: (state) => {
      if (state.cart) {
        const subtotal = state.cart.items.reduce(
          (total, item) => total + item.menuItem.price * item.quantity,
          0
        );
        const tax = subtotal * 0.08; // 8% tax
        const deliveryFee = subtotal > 25 ? 0 : 2.99; // Free delivery over $25
        const total = subtotal + tax + deliveryFee;

        state.cart.subtotal = subtotal;
        state.cart.tax = tax;
        state.cart.deliveryFee = deliveryFee;
        state.cart.total = total;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to add item to cart';
      })
      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update cart item';
      })
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to remove item from cart';
      })
      // Clear Cart
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = null;
        state.error = null;
      })
      // Fetch Cart
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = null;
      });
  },
});

export const { clearError, updateCartTotals } = cartSlice.actions;
export default cartSlice.reducer;