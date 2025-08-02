import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

// Mock data for development
const mockUsers: User[] = [
  {
    id: '1',
    email: 'customer@example.com',
    name: 'John Doe',
    phone: '+1234567890',
    role: 'customer',
    address: {
      id: '1',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      coordinates: {
        latitude: 40.7128,
        longitude: -74.0060,
      },
    },
  },
  {
    id: '2',
    email: 'restaurant@example.com',
    name: 'Jane Smith',
    phone: '+1234567891',
    role: 'restaurant_owner',
  },
];

const AUTH_TOKEN_KEY = '@auth_token';
const USER_KEY = '@user_data';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const login = async (email: string, password: string): Promise<User> => {
  await delay(1000); // Simulate network delay
  
  const user = mockUsers.find(u => u.email === email);
  
  if (!user || password !== 'password123') {
    throw new Error('Invalid email or password');
  }
  
  // Store auth token and user data
  const token = `mock_token_${user.id}`;
  await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  
  return user;
};

export const register = async (userData: Omit<User, 'id'>): Promise<User> => {
  await delay(1000);
  
  // Check if user already exists
  const existingUser = mockUsers.find(u => u.email === userData.email);
  if (existingUser) {
    throw new Error('User already exists with this email');
  }
  
  // Create new user
  const newUser: User = {
    ...userData,
    id: `${Date.now()}`, // Simple ID generation
  };
  
  mockUsers.push(newUser);
  
  // Store auth token and user data
  const token = `mock_token_${newUser.id}`;
  await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
  
  return newUser;
};

export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  await AsyncStorage.removeItem(USER_KEY);
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    const userData = await AsyncStorage.getItem(USER_KEY);
    
    if (token && userData) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const updateProfile = async (userData: Partial<User>): Promise<User> => {
  await delay(500);
  
  const currentUserData = await AsyncStorage.getItem(USER_KEY);
  if (!currentUserData) {
    throw new Error('User not found');
  }
  
  const currentUser = JSON.parse(currentUserData);
  const updatedUser = { ...currentUser, ...userData };
  
  // Update in mock data
  const userIndex = mockUsers.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    mockUsers[userIndex] = updatedUser;
  }
  
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  
  return updatedUser;
};

export const forgotPassword = async (email: string): Promise<void> => {
  await delay(1000);
  
  const user = mockUsers.find(u => u.email === email);
  if (!user) {
    throw new Error('User not found with this email');
  }
  
  // In a real app, this would send an email
  console.log(`Password reset email sent to ${email}`);
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  await delay(500);
  
  // In a real app, this would validate the token and update the password
  console.log('Password reset successful');
};

export const getAuthToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
};