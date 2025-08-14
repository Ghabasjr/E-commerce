import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { CustomerStackParamList } from "../types";
import { RootState } from "../store";

import HomeScreen from "../screens/customer/HomeScreen";
import SearchScreen from "../screens/customer/SearchScreen";
import CartScreen from "../screens/customer/CartScreen";
import OrderHistoryScreen from "../screens/customer/OrderHistoryScreen";
import ProfileScreen from "../screens/customer/ProfileScreen";
import RestaurantDetailScreen from "../screens/customer/RestaurantDetailScreen";
import MenuScreen from "../screens/customer/MenuScreen";
import CheckoutScreen from "../screens/customer/CheckoutScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<CustomerStackParamList>();

const HomeStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RestaurantDetail"
      component={RestaurantDetailScreen}
      options={{
        headerShown: true,
        title: "Restaurant Details",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Menu"
      component={MenuScreen}
      options={{
        headerShown: true,
        title: "Menu",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        headerShown: true,
        title: "Profile",
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

const SearchStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Search"
      component={SearchScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RestaurantDetail"
      component={RestaurantDetailScreen}
      options={{
        headerShown: true,
        title: "Restaurant Details",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Menu"
      component={MenuScreen}
      options={{
        headerShown: true,
        title: "Menu",
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

const CartStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Cart"
      component={CartScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Checkout"
      component={CheckoutScreen}
      options={{
        headerShown: true,
        title: "Checkout",
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

const CustomerNavigator: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const cartItemCount =
    cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "SearchTab") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "CartTab") {
            iconName = focused ? "basket" : "basket-outline";
          } else if (route.name === "OrdersTab") {
            iconName = focused ? "receipt" : "receipt-outline";
          } else if (route.name === "ProfileTab") {
            iconName = focused ? "person" : "person-outline";
          } else {
            iconName = "ellipse-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF6B35",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStackScreen}
        options={{ tabBarLabel: "Search" }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartStackScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrderHistoryScreen}
        options={{
          tabBarLabel: "Orders",
          headerShown: true,
          title: "Order History",
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          headerShown: true,
          title: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomerNavigator;
