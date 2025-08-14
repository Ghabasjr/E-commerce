import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  image?: string;
  cuisine?: string[];
  rating?: number;
  reviewCount?: number;
  estimatedDeliveryTime?: number;
  isOpen?: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  isAvailable?: boolean;
}

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'restaurants'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Restaurant));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchRestaurantById = async (id: string): Promise<Restaurant | null> => {
  try {
    const docRef = doc(db, 'restaurants', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Restaurant : null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchRestaurantMenu = async (restaurantId: string): Promise<MenuItem[]> => {
  try {
    const q = query(collection(db, 'menu'), where('restaurantId', '==', restaurantId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const addMenuItem = async (menuItem: Omit<MenuItem, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'menu'), menuItem);
    return docRef.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateMenuItem = async (id: string, updates: Partial<MenuItem>): Promise<void> => {
  try {
    const docRef = doc(db, 'menu', id);
    await updateDoc(docRef, updates);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'menu', id);
    await deleteDoc(docRef);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateRestaurantProfile = async (restaurantId: string, updates: Partial<Restaurant>): Promise<void> => {
  try {
    const docRef = doc(db, 'restaurants', restaurantId);
    await updateDoc(docRef, updates);
  } catch (error: any) {
    throw new Error(error.message);
  }
};