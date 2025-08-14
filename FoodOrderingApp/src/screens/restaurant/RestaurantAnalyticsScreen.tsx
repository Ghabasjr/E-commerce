import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../services/firebase";
import { fetchOrdersByRestaurant } from "../../services/orderService";

const RestaurantAnalyticsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const data = await fetchOrdersByRestaurant(user.uid);
        setOrders(data);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalRevenue = () => {
    return orders
      .filter((order: any) => order.status === "delivered")
      .reduce((total: number, order: any) => total + order.total, 0);
  };

  const getTotalOrders = () => {
    return orders.length;
  };

  const getCompletedOrders = () => {
    return orders.filter((order: any) => order.status === "delivered").length;
  };

  const getAverageOrderValue = () => {
    const completedOrders = orders.filter(
      (order: any) => order.status === "delivered"
    );
    if (completedOrders.length === 0) return 0;
    return getTotalRevenue() / completedOrders.length;
  };

  const getOrdersByStatus = (status: string) => {
    return orders.filter((order: any) => order.status === status).length;
  };

  const getTopItems = () => {
    const itemCounts: { [key: string]: number } = {};
    orders.forEach((order: any) => {
      order.items.forEach((item: any) => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
      });
    });

    return Object.entries(itemCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
  };

  const formatDate = (date: any) => {
    if (!date) return "N/A";
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString();
  };

  const getRecentOrders = () => {
    return orders
      .sort((a: any, b: any) => {
        const dateA = a.createdAt.toDate
          ? a.createdAt.toDate()
          : new Date(a.createdAt);
        const dateB = b.createdAt.toDate
          ? b.createdAt.toDate()
          : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 5);
  };

  const StatCard = ({ title, value, icon, color, subtitle }: any) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color="#fff" />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
        {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading analytics...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const totalRevenue = getTotalRevenue();
  const totalOrders = getTotalOrders();
  const completedOrders = getCompletedOrders();
  const averageOrderValue = getAverageOrderValue();
  const topItems = getTopItems();
  const recentOrders = getRecentOrders();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Analytics</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Key Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.statsGrid}>
            <StatCard
              title="Total Revenue"
              value={`$${totalRevenue.toFixed(2)}`}
              icon="cash-outline"
              color="#007AFF"
            />
            <StatCard
              title="Total Orders"
              value={totalOrders}
              icon="receipt-outline"
              color="#FF6B35"
            />
            <StatCard
              title="Completed Orders"
              value={completedOrders}
              icon="checkmark-circle-outline"
              color="#28A745"
            />
            <StatCard
              title="Avg Order Value"
              value={`$${averageOrderValue.toFixed(2)}`}
              icon="trending-up-outline"
              color="#FF9500"
            />
          </View>
        </View>

        {/* Order Status Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Status</Text>
          <View style={styles.statusBreakdown}>
            <View style={styles.statusItem}>
              <View style={styles.statusIndicator} />
              <Text style={styles.statusLabel}>Pending</Text>
              <Text style={styles.statusCount}>
                {getOrdersByStatus("pending")}
              </Text>
            </View>
            <View style={styles.statusItem}>
              <View
                style={[styles.statusIndicator, { backgroundColor: "#007AFF" }]}
              />
              <Text style={styles.statusLabel}>Confirmed</Text>
              <Text style={styles.statusCount}>
                {getOrdersByStatus("confirmed")}
              </Text>
            </View>
            <View style={styles.statusItem}>
              <View
                style={[styles.statusIndicator, { backgroundColor: "#FF6B35" }]}
              />
              <Text style={styles.statusLabel}>Preparing</Text>
              <Text style={styles.statusCount}>
                {getOrdersByStatus("preparing")}
              </Text>
            </View>
            <View style={styles.statusItem}>
              <View
                style={[styles.statusIndicator, { backgroundColor: "#28A745" }]}
              />
              <Text style={styles.statusLabel}>Ready</Text>
              <Text style={styles.statusCount}>
                {getOrdersByStatus("ready")}
              </Text>
            </View>
            <View style={styles.statusItem}>
              <View
                style={[styles.statusIndicator, { backgroundColor: "#6C757D" }]}
              />
              <Text style={styles.statusLabel}>Delivered</Text>
              <Text style={styles.statusCount}>
                {getOrdersByStatus("delivered")}
              </Text>
            </View>
          </View>
        </View>

        {/* Top Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Selling Items</Text>
          {topItems.length > 0 ? (
            topItems.map((item, index) => (
              <View key={index} style={styles.topItem}>
                <View style={styles.itemRank}>
                  <Text style={styles.rankText}>{index + 1}</Text>
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemCount}>{item.count} orders</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No orders yet</Text>
          )}
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          {recentOrders.length > 0 ? (
            recentOrders.map((order: any) => (
              <View key={order.id} style={styles.recentOrder}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderId}>
                    Order #{order.id.slice(-8)}
                  </Text>
                  <Text style={styles.orderDate}>
                    {formatDate(order.createdAt)}
                  </Text>
                </View>
                <View style={styles.orderDetails}>
                  <Text style={styles.customerName}>{order.customerName}</Text>
                  <Text style={styles.orderTotal}>
                    ${order.total.toFixed(2)}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No orders yet</Text>
          )}
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
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    flex: 1,
    minWidth: "45%",
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statTitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  statSubtitle: {
    fontSize: 10,
    color: "#999",
    marginTop: 2,
  },
  statusBreakdown: {
    gap: 12,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FFA500",
    marginRight: 12,
  },
  statusLabel: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  statusCount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  topItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FF6B35",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rankText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  itemCount: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  recentOrder: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  orderInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  orderDate: {
    fontSize: 12,
    color: "#999",
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  customerName: {
    fontSize: 14,
    color: "#666",
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF6B35",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
    paddingVertical: 20,
  },
});

export default RestaurantAnalyticsScreen;
