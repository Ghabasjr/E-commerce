import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store';
import { checkAuthStatus } from '../store/slices/authSlice';
import { RootStackParamList } from '../types';

import SplashScreen from '../screens/SplashScreen';
import AuthNavigator from './AuthNavigator';
import CustomerNavigator from './CustomerNavigator';
import RestaurantNavigator from './RestaurantNavigator';
import OrderTrackingScreen from '../screens/customer/OrderTrackingScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            {user?.role === 'customer' ? (
              <Stack.Screen name="CustomerMain" component={CustomerNavigator} />
            ) : (
              <Stack.Screen name="RestaurantMain" component={RestaurantNavigator} />
            )}
            <Stack.Screen 
              name="OrderTracking" 
              component={OrderTrackingScreen}
              options={{ 
                headerShown: true,
                title: 'Track Order',
                presentation: 'modal'
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;