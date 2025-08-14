import { db } from './firebase';
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, query, where, orderBy } from 'firebase/firestore';

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  restaurantId: string;
  restaurantName: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  deliveryInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedDeliveryTime?: number;
}

export const placeOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const orderWithTimestamps = {
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const docRef = await addDoc(collection(db, 'orders'), orderWithTimestamps);
    return docRef.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchOrdersByUser = async (userId: string): Promise<Order[]> => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('customerId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchOrdersByRestaurant = async (restaurantId: string): Promise<Order[]> => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('restaurantId', '==', restaurantId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const docRef = doc(db, 'orders', orderId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Order : null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<void> => {
  try {
    const docRef = doc(db, 'orders', orderId);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getOrderStatusText = (status: Order['status']): string => {
  switch (status) {
    case 'pending': return 'Order Placed';
    case 'confirmed': return 'Order Confirmed';
    case 'preparing': return 'Preparing Your Order';
    case 'ready': return 'Ready for Pickup/Delivery';
    case 'delivered': return 'Delivered';
    case 'cancelled': return 'Cancelled';
    default: return 'Unknown Status';
  }
};