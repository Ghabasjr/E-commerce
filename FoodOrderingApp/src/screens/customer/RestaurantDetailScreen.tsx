import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchRestaurantById } from "../../services/restaurantService";

const RestaurantDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { restaurantId } = route.params as { restaurantId: string };

  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRestaurant();
  }, [restaurantId]);

  const loadRestaurant = async () => {
    try {
      if (!restaurantId) return;
      const data = await fetchRestaurantById(restaurantId);
      setRestaurant(data);
    } catch (error) {
      console.error("Error loading restaurant:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMenu = () => {
    navigation.navigate("MenuScreen" as never, { restaurantId } as never);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading restaurant details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={80} color="#ccc" />
          <Text style={styles.errorTitle}>Restaurant not found</Text>
          <Text style={styles.errorSubtitle}>
            The restaurant you're looking for doesn't exist
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {restaurant.name}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("CartScreen" as never)}
        >
          <Ionicons name="cart-outline" size={24} color="#FF6B35" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Restaurant Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                restaurant.image ||
                "https://via.placeholder.com/400x200?text=Restaurant",
            }}
            style={styles.restaurantImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{restaurant.rating || 4.5}</Text>
            </View>
          </View>
        </View>

        {/* Restaurant Info */}
        <View style={styles.infoSection}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantDescription}>
            {restaurant.description ||
              "Delicious food awaits you at this amazing restaurant!"}
          </Text>

          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.metaText}>
                {restaurant.estimatedDeliveryTime || 30} min
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="star-outline" size={16} color="#666" />
              <Text style={styles.metaText}>
                {restaurant.reviewCount || 0} reviews
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.metaText}>
                {restaurant.address || "Address not available"}
              </Text>
            </View>
          </View>

          {/* Cuisine Tags */}
          {restaurant.cuisine && restaurant.cuisine.length > 0 && (
            <View style={styles.cuisineSection}>
              <Text style={styles.sectionTitle}>Cuisine</Text>
              <View style={styles.cuisineContainer}>
                {restaurant.cuisine.map((cuisine: string, index: number) => (
                  <View key={index} style={styles.cuisineTag}>
                    <Text style={styles.cuisineText}>{cuisine}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Contact Info */}
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            {restaurant.phone && (
              <View style={styles.contactItem}>
                <Ionicons name="call-outline" size={16} color="#666" />
                <Text style={styles.contactText}>{restaurant.phone}</Text>
              </View>
            )}
            {restaurant.email && (
              <View style={styles.contactItem}>
                <Ionicons name="mail-outline" size={16} color="#666" />
                <Text style={styles.contactText}>{restaurant.email}</Text>
              </View>
            )}
          </View>

          {/* Restaurant Status */}
          <View style={styles.statusSection}>
            <View style={styles.statusItem}>
              <View
                style={[
                  styles.statusIndicator,
                  {
                    backgroundColor: restaurant.isOpen ? "#28A745" : "#DC3545",
                  },
                ]}
              />
              <Text style={styles.statusText}>
                {restaurant.isOpen ? "Open Now" : "Currently Closed"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.viewMenuButton}
          onPress={handleViewMenu}
        >
          <Ionicons name="restaurant-outline" size={20} color="#fff" />
          <Text style={styles.viewMenuButtonText}>View Menu</Text>
        </TouchableOpacity>
      </View>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
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
  imageContainer: {
    position: "relative",
    height: 200,
  },
  restaurantImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
  },
  infoSection: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  restaurantDescription: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
    marginBottom: 16,
  },
  metaInfo: {
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  cuisineSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  cuisineContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  cuisineTag: {
    backgroundColor: "#FFF2ED",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cuisineText: {
    fontSize: 12,
    color: "#FF6B35",
    fontWeight: "600",
  },
  contactSection: {
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  statusSection: {
    marginBottom: 20,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  actionContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  viewMenuButton: {
    backgroundColor: "#FF6B35",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  viewMenuButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RestaurantDetailScreen;
