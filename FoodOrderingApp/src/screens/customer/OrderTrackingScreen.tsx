import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  fetchOrderById,
  getOrderStatusText,
} from "../../services/orderService";

const OrderTrackingScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params as { orderId: string };
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    try {
      if (!orderId) return;
      const data = await fetchOrderById(orderId);
      setOrder(data);
    } catch (error) {
      console.error("Error loading order:", error);
      Alert.alert("Error", "Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status: string) => {
    const steps = ["pending", "confirmed", "preparing", "ready", "delivered"];
    return steps.indexOf(status);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return "time-outline";
      case "confirmed":
        return "checkmark-circle-outline";
      case "preparing":
        return "restaurant-outline";
      case "ready":
        return "checkmark-done-circle-outline";
      case "delivered":
        return "car-outline";
      default:
        return "help-circle-outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#FFA500";
      case "confirmed":
        return "#007AFF";
      case "preparing":
        return "#FF6B35";
      case "ready":
        return "#28A745";
      case "delivered":
        return "#6C757D";
      case "cancelled":
        return "#DC3545";
      default:
        return "#666";
    }
  };

  const formatDate = (date: any) => {
    if (!date) return "N/A";
    const d = date.toDate ? date.toDate() : new Date(date);
    return (
      d.toLocaleDateString() +
      " " +
      d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading order details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={80} color="#ccc" />
          <Text style={styles.errorTitle}>Order not found</Text>
          <Text style={styles.errorSubtitle}>
            The order you're looking for doesn't exist
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentStep = getStatusStep(order.status);
  const steps = [
    { title: "Order Placed", description: "Your order has been received" },
    {
      title: "Order Confirmed",
      description: "Restaurant has confirmed your order",
    },
    { title: "Preparing", description: "Your food is being prepared" },
    { title: "Ready", description: "Your order is ready for pickup/delivery" },
    { title: "Delivered", description: "Your order has been delivered" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Track Order</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Order Info */}
        <View style={styles.orderInfoCard}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>Order #{order.id.slice(-8)}</Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(order.status) },
              ]}
            >
              <Text style={styles.statusText}>
                {getOrderStatusText(order.status)}
              </Text>
            </View>
          </View>
          <Text style={styles.restaurantName}>{order.restaurantName}</Text>
          <Text style={styles.orderDate}>
            Placed on {formatDate(order.createdAt)}
          </Text>
          <Text style={styles.estimatedTime}>
            Estimated delivery: {order.estimatedDeliveryTime || 30} minutes
          </Text>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {order.items.map((item: any, index: number) => (
            <View key={index} style={styles.orderItem}>
              <Text style={styles.itemName}>
                {item.quantity}x {item.name}
              </Text>
              <Text style={styles.itemPrice}>${item.total.toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.orderTotal}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Delivery Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Information</Text>
          <View style={styles.deliveryInfo}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={styles.deliveryAddress}>{order.deliveryAddress}</Text>
          </View>
          {order.deliveryInstructions && (
            <View style={styles.deliveryInfo}>
              <Ionicons name="chatbubble-outline" size={20} color="#666" />
              <Text style={styles.deliveryInstructions}>
                {order.deliveryInstructions}
              </Text>
            </View>
          )}
        </View>

        {/* Tracking Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Status</Text>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <View style={styles.stepIconContainer}>
                <View
                  style={[
                    styles.stepIcon,
                    index <= currentStep && {
                      backgroundColor: getStatusColor(order.status),
                    },
                  ]}
                >
                  <Ionicons
                    name={getStatusIcon(
                      steps[index].title.toLowerCase().replace(" ", "")
                    )}
                    size={20}
                    color={index <= currentStep ? "#fff" : "#ccc"}
                  />
                </View>
                {index < steps.length - 1 && (
                  <View
                    style={[
                      styles.stepLine,
                      index < currentStep && {
                        backgroundColor: getStatusColor(order.status),
                      },
                    ]}
                  />
                )}
              </View>
              <View style={styles.stepContent}>
                <Text
                  style={[
                    styles.stepTitle,
                    index <= currentStep && { color: "#333" },
                  ]}
                >
                  {step.title}
                </Text>
                <Text
                  style={[
                    styles.stepDescription,
                    index <= currentStep && { color: "#666" },
                  ]}
                >
                  {step.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
  },
  errorSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  content: {
    flex: 1,
  },
  orderInfoCard: {
    backgroundColor: "#f9f9f9",
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  restaurantName: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: "#999",
    marginBottom: 4,
  },
  estimatedTime: {
    fontSize: 14,
    color: "#FF6B35",
    fontWeight: "600",
  },
  section: {
    margin: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemName: {
    fontSize: 16,
    color: "#333",
  },
  itemPrice: {
    fontSize: 16,
    color: "#FF6B35",
    fontWeight: "bold",
  },
  orderTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: "#eee",
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B35",
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  deliveryAddress: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
    flex: 1,
  },
  deliveryInstructions: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
    flex: 1,
    fontStyle: "italic",
  },
  stepContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  stepIconContainer: {
    alignItems: "center",
    marginRight: 16,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  stepLine: {
    width: 2,
    height: 30,
    backgroundColor: "#eee",
    marginTop: 8,
  },
  stepContent: {
    flex: 1,
    paddingTop: 8,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ccc",
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: "#ccc",
  },
});

export default OrderTrackingScreen;
