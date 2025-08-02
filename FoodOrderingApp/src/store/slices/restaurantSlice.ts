import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Restaurant, MenuCategory, RestaurantState } from '../../types';
import * as restaurantService from '../../services/restaurantService';

const initialState: RestaurantState = {
  restaurants: [],
  currentRestaurant: null,
  menu: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchRestaurants = createAsyncThunk(
  'restaurant/fetchRestaurants',
  async (filters?: { location?: string; cuisine?: string; search?: string }) => {
    const response = await restaurantService.getRestaurants(filters);
    return response;
  }
);

export const fetchRestaurantById = createAsyncThunk(
  'restaurant/fetchRestaurantById',
  async (restaurantId: string) => {
    const response = await restaurantService.getRestaurantById(restaurantId);
    return response;
  }
);

export const fetchRestaurantMenu = createAsyncThunk(
  'restaurant/fetchRestaurantMenu',
  async (restaurantId: string) => {
    const response = await restaurantService.getRestaurantMenu(restaurantId);
    return response;
  }
);

export const searchRestaurants = createAsyncThunk(
  'restaurant/searchRestaurants',
  async (query: string) => {
    const response = await restaurantService.searchRestaurants(query);
    return response;
  }
);

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentRestaurant: (state, action: PayloadAction<Restaurant | null>) => {
      state.currentRestaurant = action.payload;
    },
    clearCurrentRestaurant: (state) => {
      state.currentRestaurant = null;
      state.menu = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Restaurants
      .addCase(fetchRestaurants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.restaurants = action.payload;
        state.error = null;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch restaurants';
      })
      // Fetch Restaurant by ID
      .addCase(fetchRestaurantById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRestaurant = action.payload;
        state.error = null;
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch restaurant';
      })
      // Fetch Restaurant Menu
      .addCase(fetchRestaurantMenu.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menu = action.payload;
        state.error = null;
      })
      .addCase(fetchRestaurantMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch menu';
      })
      // Search Restaurants
      .addCase(searchRestaurants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchRestaurants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.restaurants = action.payload;
        state.error = null;
      })
      .addCase(searchRestaurants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Search failed';
      });
  },
});

export const { clearError, setCurrentRestaurant, clearCurrentRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;