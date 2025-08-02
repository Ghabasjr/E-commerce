// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'customer' | 'restaurant_owner' | 'admin';
  address?: Address;
  profileImage?: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Restaurant Types
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  cuisine: string[];
  address: Address;
  phone: string;
  email: string;
  ownerId: string;
  isOpen: boolean;
  openingHours: OpeningHours;
  deliveryFee: number;
  minimumOrder: number;
  estimatedDeliveryTime: number;
}

export interface OpeningHours {
  [key: string]: {
    open: string;
    close: string;
    isOpen: boolean;
  };
}

// Menu Types
export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  allergens: string[];
  nutritionInfo?: NutritionInfo;
  isAvailable: boolean;
  preparationTime: number;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

// Cart Types
export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations?: string[];
  specialInstructions?: string;
}

export interface Cart {
  id: string;
  customerId: string;
  restaurantId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
}

// Order Types
export interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  items: CartItem[];
  status: OrderStatus;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  deliveryAddress: Address;
  estimatedDeliveryTime: Date;
  actualDeliveryTime?: Date;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
  rating?: number;
  review?: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

// Payment Types
export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'paypal' | 'apple_pay' | 'google_pay' | 'cash';
  isDefault: boolean;
  cardNumber?: string; // Last 4 digits
  cardHolderName?: string;
  expiryDate?: string;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: Date;
}

// Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  CustomerMain: undefined;
  RestaurantMain: undefined;
  OrderTracking: { orderId: string };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type CustomerStackParamList = {
  Home: undefined;
  RestaurantDetail: { restaurantId: string };
  Menu: { restaurantId: string };
  Cart: undefined;
  Checkout: undefined;
  OrderHistory: undefined;
  Profile: undefined;
  Search: undefined;
};

export type RestaurantStackParamList = {
  Dashboard: undefined;
  Orders: undefined;
  Menu: undefined;
  Analytics: undefined;
  Profile: undefined;
};

// Redux State Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface RestaurantState {
  restaurants: Restaurant[];
  currentRestaurant: Restaurant | null;
  menu: MenuCategory[];
  isLoading: boolean;
  error: string | null;
}

export interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
}

export interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  restaurant: RestaurantState;
  cart: CartState;
  order: OrderState;
}