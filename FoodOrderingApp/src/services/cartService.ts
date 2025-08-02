import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cart, CartItem, MenuItem } from '../types';

const CART_KEY = '@cart_data';

// Helper function to generate unique IDs
const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getCart = async (): Promise<Cart | null> => {
  try {
    const cartData = await AsyncStorage.getItem(CART_KEY);
    return cartData ? JSON.parse(cartData) : null;
  } catch (error) {
    console.error('Error getting cart:', error);
    return null;
  }
};

const saveCart = async (cart: Cart): Promise<void> => {
  try {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart:', error);
    throw error;
  }
};

const calculateCartTotals = (items: CartItem[]): {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
} => {
  const subtotal = items.reduce(
    (total, item) => total + item.menuItem.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee = subtotal > 25 ? 0 : 2.99; // Free delivery over $25
  const total = subtotal + tax + deliveryFee;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    deliveryFee: Math.round(deliveryFee * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
};

export const addToCart = async ({
  menuItem,
  quantity,
  customizations,
  specialInstructions,
}: {
  menuItem: MenuItem;
  quantity: number;
  customizations?: string[];
  specialInstructions?: string;
}): Promise<Cart> => {
  await delay(300);

  let cart = await getCart();

  // If cart doesn't exist or is from different restaurant, create new cart
  if (!cart || cart.restaurantId !== menuItem.restaurantId) {
    cart = {
      id: generateId(),
      customerId: '1', // Mock customer ID
      restaurantId: menuItem.restaurantId,
      items: [],
      subtotal: 0,
      tax: 0,
      deliveryFee: 0,
      total: 0,
    };
  }

  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex(
    item => 
      item.menuItem.id === menuItem.id &&
      JSON.stringify(item.customizations) === JSON.stringify(customizations) &&
      item.specialInstructions === specialInstructions
  );

  if (existingItemIndex >= 0) {
    // Update quantity if item exists
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    const cartItem: CartItem = {
      id: generateId(),
      menuItem,
      quantity,
      customizations,
      specialInstructions,
    };
    cart.items.push(cartItem);
  }

  // Recalculate totals
  const totals = calculateCartTotals(cart.items);
  cart = { ...cart, ...totals };

  await saveCart(cart);
  return cart;
};

export const updateCartItem = async (
  itemId: string,
  quantity: number
): Promise<Cart> => {
  await delay(200);

  const cart = await getCart();
  if (!cart) {
    throw new Error('Cart not found');
  }

  const itemIndex = cart.items.findIndex(item => item.id === itemId);
  if (itemIndex === -1) {
    throw new Error('Item not found in cart');
  }

  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    cart.items.splice(itemIndex, 1);
  } else {
    // Update quantity
    cart.items[itemIndex].quantity = quantity;
  }

  // Recalculate totals
  const totals = calculateCartTotals(cart.items);
  const updatedCart = { ...cart, ...totals };

  await saveCart(updatedCart);
  return updatedCart;
};

export const removeFromCart = async (itemId: string): Promise<Cart> => {
  await delay(200);

  const cart = await getCart();
  if (!cart) {
    throw new Error('Cart not found');
  }

  cart.items = cart.items.filter(item => item.id !== itemId);

  // Recalculate totals
  const totals = calculateCartTotals(cart.items);
  const updatedCart = { ...cart, ...totals };

  await saveCart(updatedCart);
  return updatedCart;
};

export const clearCart = async (): Promise<null> => {
  await delay(100);
  
  try {
    await AsyncStorage.removeItem(CART_KEY);
    return null;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

export const getCartItemCount = async (): Promise<number> => {
  const cart = await getCart();
  return cart ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0;
};

export const validateCart = async (): Promise<{
  isValid: boolean;
  unavailableItems: string[];
}> => {
  await delay(300);
  
  const cart = await getCart();
  if (!cart) {
    return { isValid: true, unavailableItems: [] };
  }

  // In a real app, this would check with the restaurant's current menu
  // For now, we'll assume all items are available
  const unavailableItems = cart.items
    .filter(item => !item.menuItem.isAvailable)
    .map(item => item.menuItem.name);

  return {
    isValid: unavailableItems.length === 0,
    unavailableItems,
  };
};