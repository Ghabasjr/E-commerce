import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order, OrderStatus, PaymentMethod } from '../types';

const ORDERS_KEY = '@orders_data';

// Helper function to generate unique IDs
const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock orders data
let mockOrders: Order[] = [];

const saveOrders = async (orders: Order[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Error saving orders:', error);
    throw error;
  }
};

const loadOrders = async (): Promise<Order[]> => {
  try {
    const ordersData = await AsyncStorage.getItem(ORDERS_KEY);
    return ordersData ? JSON.parse(ordersData) : [];
  } catch (error) {
    console.error('Error loading orders:', error);
    return [];
  }
};

export const createOrder = async (
  orderData: Omit<Order, 'id' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<Order> => {
  await delay(800);

  const now = new Date();
  const estimatedDeliveryTime = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes from now

  const newOrder: Order = {
    ...orderData,
    id: generateId(),
    status: 'pending',
    createdAt: now,
    updatedAt: now,
    estimatedDeliveryTime,
  };

  mockOrders = await loadOrders();
  mockOrders.unshift(newOrder);
  await saveOrders(mockOrders);

  // Simulate real-time order status updates
  setTimeout(() => updateOrderStatusAutomatically(newOrder.id), 5000);

  return newOrder;
};

export const getOrders = async (customerId: string): Promise<Order[]> => {
  await delay(600);

  mockOrders = await loadOrders();
  return mockOrders
    .filter(order => order.customerId === customerId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  await delay(400);

  mockOrders = await loadOrders();
  const order = mockOrders.find(o => o.id === orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  return order;
};

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus
): Promise<Order> => {
  await delay(300);

  mockOrders = await loadOrders();
  const orderIndex = mockOrders.findIndex(o => o.id === orderId);
  if (orderIndex === -1) {
    throw new Error('Order not found');
  }

  mockOrders[orderIndex].status = status;
  mockOrders[orderIndex].updatedAt = new Date();

  if (status === 'delivered') {
    mockOrders[orderIndex].actualDeliveryTime = new Date();
  }

  await saveOrders(mockOrders);
  return mockOrders[orderIndex];
};

export const cancelOrder = async (orderId: string): Promise<Order> => {
  await delay(400);

  mockOrders = await loadOrders();
  const orderIndex = mockOrders.findIndex(o => o.id === orderId);
  if (orderIndex === -1) {
    throw new Error('Order not found');
  }

  const order = mockOrders[orderIndex];
  if (['delivered', 'cancelled'].includes(order.status)) {
    throw new Error('Cannot cancel this order');
  }

  mockOrders[orderIndex].status = 'cancelled';
  mockOrders[orderIndex].updatedAt = new Date();

  await saveOrders(mockOrders);
  return mockOrders[orderIndex];
};

export const rateOrder = async (
  orderId: string,
  rating: number,
  review?: string
): Promise<Order> => {
  await delay(500);

  mockOrders = await loadOrders();
  const orderIndex = mockOrders.findIndex(o => o.id === orderId);
  if (orderIndex === -1) {
    throw new Error('Order not found');
  }

  mockOrders[orderIndex].rating = rating;
  mockOrders[orderIndex].review = review;
  mockOrders[orderIndex].updatedAt = new Date();

  await saveOrders(mockOrders);
  return mockOrders[orderIndex];
};

export const trackOrder = async (orderId: string): Promise<Order> => {
  await delay(300);

  mockOrders = await loadOrders();
  const order = mockOrders.find(o => o.id === orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  // Simulate real-time tracking updates
  return order;
};

export const getRestaurantOrders = async (restaurantId: string): Promise<Order[]> => {
  await delay(600);

  mockOrders = await loadOrders();
  return mockOrders
    .filter(order => order.restaurantId === restaurantId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getOrdersByStatus = async (
  restaurantId: string,
  status: OrderStatus
): Promise<Order[]> => {
  await delay(400);

  mockOrders = await loadOrders();
  return mockOrders
    .filter(order => order.restaurantId === restaurantId && order.status === status)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Simulate automatic order status progression
const updateOrderStatusAutomatically = async (orderId: string) => {
  try {
    const statusProgression: OrderStatus[] = [
      'confirmed',
      'preparing',
      'ready',
      'out_for_delivery',
      'delivered',
    ];

    let currentStatusIndex = 0;

    const updateStatus = async () => {
      if (currentStatusIndex < statusProgression.length) {
        await updateOrderStatus(orderId, statusProgression[currentStatusIndex]);
        currentStatusIndex++;

        // Schedule next status update
        const delay = currentStatusIndex === 1 ? 10000 : 15000; // 10s for confirmed, 15s for others
        setTimeout(updateStatus, delay);
      }
    };

    updateStatus();
  } catch (error) {
    console.error('Error in automatic status update:', error);
  }
};

// Mock payment processing
export const processPayment = async (
  amount: number,
  paymentMethod: PaymentMethod
): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
  await delay(2000); // Simulate payment processing time

  // Simulate payment success/failure (90% success rate)
  const isSuccess = Math.random() > 0.1;

  if (isSuccess) {
    return {
      success: true,
      transactionId: `txn_${generateId()}`,
    };
  } else {
    return {
      success: false,
      error: 'Payment failed. Please try again.',
    };
  }
};

export const refundPayment = async (
  orderId: string,
  amount: number
): Promise<{ success: boolean; refundId?: string; error?: string }> => {
  await delay(1500);

  // Simulate refund processing
  const isSuccess = Math.random() > 0.05; // 95% success rate for refunds

  if (isSuccess) {
    return {
      success: true,
      refundId: `refund_${generateId()}`,
    };
  } else {
    return {
      success: false,
      error: 'Refund processing failed. Please contact support.',
    };
  }
};