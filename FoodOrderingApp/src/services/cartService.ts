import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
  id: string;
  menuItemId: string;
  restaurantId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Cart {
  items: CartItem[];
  restaurantId?: string;
  restaurantName?: string;
}

const CART_STORAGE_KEY = '@cart_data';

export const getCart = async (): Promise<Cart> => {
  try {
    const cartData = await AsyncStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : { items: [] };
  } catch (error) {
    console.error('Error loading cart:', error);
    return { items: [] };
  }
};

export const saveCart = async (cart: Cart): Promise<void> => {
  try {
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
};

export const addToCart = async (item: Omit<CartItem, 'id'>, restaurantName?: string): Promise<Cart> => {
  const cart = await getCart();
  
  // Check if item is from the same restaurant
  if (cart.restaurantId && cart.restaurantId !== item.restaurantId) {
    throw new Error('You can only order from one restaurant at a time. Please clear your cart first.');
  }
  
  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex(cartItem => cartItem.menuItemId === item.menuItemId);
  
  if (existingItemIndex >= 0) {
    // Update quantity
    cart.items[existingItemIndex].quantity += item.quantity;
  } else {
    // Add new item
    cart.items.push({
      ...item,
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    });
  }
  
  // Set restaurant info if not already set
  if (!cart.restaurantId) {
    cart.restaurantId = item.restaurantId;
    cart.restaurantName = restaurantName;
  }
  
  await saveCart(cart);
  return cart;
};

export const updateCartItemQuantity = async (itemId: string, quantity: number): Promise<Cart> => {
  const cart = await getCart();
  const itemIndex = cart.items.findIndex(item => item.id === itemId);
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    
    await saveCart(cart);
  }
  
  return cart;
};

export const removeFromCart = async (itemId: string): Promise<Cart> => {
  const cart = await getCart();
  cart.items = cart.items.filter(item => item.id !== itemId);
  
  // Clear restaurant info if cart is empty
  if (cart.items.length === 0) {
    cart.restaurantId = undefined;
    cart.restaurantName = undefined;
  }
  
  await saveCart(cart);
  return cart;
};

export const clearCart = async (): Promise<Cart> => {
  const emptyCart = { items: [] };
  await saveCart(emptyCart);
  return emptyCart;
};

export const getCartTotal = (cart: Cart): number => {
  return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartItemCount = (cart: Cart): number => {
  return cart.items.reduce((count, item) => count + item.quantity, 0);
};