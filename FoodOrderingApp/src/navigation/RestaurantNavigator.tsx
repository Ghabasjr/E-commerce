import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { RestaurantStackParamList } from '../types';

import RestaurantDashboardScreen from '../screens/restaurant/RestaurantDashboardScreen';
import RestaurantOrdersScreen from '../screens/restaurant/RestaurantOrdersScreen';
import RestaurantMenuScreen from '../screens/restaurant/RestaurantMenuScreen';
import RestaurantAnalyticsScreen from '../screens/restaurant/RestaurantAnalyticsScreen';
import RestaurantProfileScreen from '../screens/restaurant/RestaurantProfileScreen';

const Tab = createBottomTabNavigator();

const RestaurantNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'speedometer' : 'speedometer-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Analytics') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={RestaurantDashboardScreen}
        options={{ 
          tabBarLabel: 'Dashboard',
          title: 'Restaurant Dashboard',
        }}
      />
      <Tab.Screen 
        name="Orders" 
        component={RestaurantOrdersScreen}
        options={{ 
          tabBarLabel: 'Orders',
          title: 'Order Management',
        }}
      />
      <Tab.Screen 
        name="Menu" 
        component={RestaurantMenuScreen}
        options={{ 
          tabBarLabel: 'Menu',
          title: 'Menu Management',
        }}
      />
      <Tab.Screen 
        name="Analytics" 
        component={RestaurantAnalyticsScreen}
        options={{ 
          tabBarLabel: 'Analytics',
          title: 'Analytics',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={RestaurantProfileScreen}
        options={{ 
          tabBarLabel: 'Profile',
          title: 'Restaurant Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default RestaurantNavigator;