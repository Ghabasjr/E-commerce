import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderStatus, OrderState } from '../../types';
import * as orderService from '../../services/orderService';

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData: Omit<Order, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const response = await orderService.createOrder(orderData);
    return response;
  }
);

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (customerId: string) => {
    const response = await orderService.getOrders(customerId);
    return response;
  }
);

export const fetchOrderById = createAsyncThunk(
  'order/fetchOrderById',
  async (orderId: string) => {
    const response = await orderService.getOrderById(orderId);
    return response;
  }
);

export const updateOrderStatus = createAsyncThunk(
  'order/updateOrderStatus',
  async ({ orderId, status }: { orderId: string; status: OrderStatus }) => {
    const response = await orderService.updateOrderStatus(orderId, status);
    return response;
  }
);

export const cancelOrder = createAsyncThunk(
  'order/cancelOrder',
  async (orderId: string) => {
    const response = await orderService.cancelOrder(orderId);
    return response;
  }
);

export const rateOrder = createAsyncThunk(
  'order/rateOrder',
  async ({ 
    orderId, 
    rating, 
    review 
  }: { 
    orderId: string; 
    rating: number; 
    review?: string; 
  }) => {
    const response = await orderService.rateOrder(orderId, rating, review);
    return response;
  }
);

export const trackOrder = createAsyncThunk(
  'order/trackOrder',
  async (orderId: string) => {
    const response = await orderService.trackOrder(orderId);
    return response;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
    updateOrderStatusLocal: (state, action: PayloadAction<{ orderId: string; status: OrderStatus }>) => {
      const { orderId, status } = action.payload;
      
      // Update in orders array
      const orderIndex = state.orders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status;
        state.orders[orderIndex].updatedAt = new Date();
      }
      
      // Update current order if it matches
      if (state.currentOrder && state.currentOrder.id === orderId) {
        state.currentOrder.status = status;
        state.currentOrder.updatedAt = new Date();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.orders.unshift(action.payload);
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create order';
      })
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      })
      // Fetch Order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.error = null;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch order';
      })
      // Update Order Status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const orderIndex = state.orders.findIndex(order => order.id === updatedOrder.id);
        if (orderIndex !== -1) {
          state.orders[orderIndex] = updatedOrder;
        }
        if (state.currentOrder && state.currentOrder.id === updatedOrder.id) {
          state.currentOrder = updatedOrder;
        }
      })
      // Cancel Order
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const cancelledOrder = action.payload;
        const orderIndex = state.orders.findIndex(order => order.id === cancelledOrder.id);
        if (orderIndex !== -1) {
          state.orders[orderIndex] = cancelledOrder;
        }
        if (state.currentOrder && state.currentOrder.id === cancelledOrder.id) {
          state.currentOrder = cancelledOrder;
        }
      })
      // Rate Order
      .addCase(rateOrder.fulfilled, (state, action) => {
        const ratedOrder = action.payload;
        const orderIndex = state.orders.findIndex(order => order.id === ratedOrder.id);
        if (orderIndex !== -1) {
          state.orders[orderIndex] = ratedOrder;
        }
        if (state.currentOrder && state.currentOrder.id === ratedOrder.id) {
          state.currentOrder = ratedOrder;
        }
      })
      // Track Order
      .addCase(trackOrder.fulfilled, (state, action) => {
        const trackedOrder = action.payload;
        if (state.currentOrder && state.currentOrder.id === trackedOrder.id) {
          state.currentOrder = trackedOrder;
        }
      });
  },
});

export const { clearError, setCurrentOrder, updateOrderStatusLocal } = orderSlice.actions;
export default orderSlice.reducer;