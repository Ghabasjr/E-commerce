import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import AuthNavigator from "./AuthNavigator";
import CustomerNavigator from "./CustomerNavigator";
import RestaurantNavigator from "./RestaurantNavigator";
import SplashScreen from "../screens/SplashScreen";

const AppNavigator: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [splashComplete, setSplashComplete] = useState(false);

  useEffect(() => {
    // Minimum splash screen duration
    const splashTimer = setTimeout(() => {
      setSplashComplete(true);
    }, 2000);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          // Check users collection first
          let docRef = doc(db, "users", firebaseUser.uid);
          let docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setRole("customer");
          } else {
            // Check restaurants collection
            docRef = doc(db, "restaurants", firebaseUser.uid);
            docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              setRole("restaurant_owner");
            } else {
              setRole(null);
            }
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setRole(null);
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => {
      clearTimeout(splashTimer);
      unsubscribe();
    };
  }, []);

  // Show splash screen until both loading is complete and minimum duration has passed
  if (loading || !splashComplete) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {!user ? (
        <AuthNavigator />
      ) : role === "customer" ? (
        <CustomerNavigator />
      ) : role === "restaurant_owner" ? (
        <RestaurantNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
