import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserData {
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'restaurant_owner';
}

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const registerUser = async (userData: UserData, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, password);
    
    // Update display name
    await updateProfile(userCredential.user, { displayName: userData.name });
    
    // Save user data to Firestore
    const collection = userData.role === 'customer' ? 'users' : 'restaurants';
    const userDoc = doc(db, collection, userCredential.user.uid);
    await setDoc(userDoc, {
      ...userData,
      createdAt: new Date(),
    });
    
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserRole = async (userId: string) => {
  try {
    // Check users collection first
    let docRef = doc(db, 'users', userId);
    let docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return 'customer';
    }
    
    // Check restaurants collection
    docRef = doc(db, 'restaurants', userId);
    docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return 'restaurant_owner';
    }
    
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateUserEmail = async (newEmail: string, currentPassword: string) => {
  try {
    const user = auth.currentUser;
    if (!user || !user.email) throw new Error('No user logged in');
    
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updateEmail(user, newEmail);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateUserPassword = async (newPassword: string, currentPassword: string) => {
  try {
    const user = auth.currentUser;
    if (!user || !user.email) throw new Error('No user logged in');
    
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  } catch (error: any) {
    throw new Error(error.message);
  }
};