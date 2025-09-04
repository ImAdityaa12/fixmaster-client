import { authClient } from "@/lib/auth-client";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface Service {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
  color: string;
}

const services: Service[] = [
  {
    id: "1",
    title: "Air Conditioning",
    icon: "snow-outline",
    description: "AC repair & maintenance",
    color: "#3B82F6",
  },
  {
    id: "2",
    title: "Refrigerator",
    icon: "cube-outline",
    description: "Fridge repair & service",
    color: "#10B981",
  },
  {
    id: "3",
    title: "Washing Machine",
    icon: "refresh-circle-outline",
    description: "Washer repair & parts",
    color: "#8B5CF6",
  },
  {
    id: "4",
    title: "Television",
    icon: "tv-outline",
    description: "TV repair & installation",
    color: "#F59E0B",
  },
  {
    id: "5",
    title: "Microwave",
    icon: "radio-outline",
    description: "Microwave repair service",
    color: "#EF4444",
  },
  {
    id: "6",
    title: "Electrical Wiring",
    icon: "flash-outline",
    description: "Electrical installations",
    color: "#06B6D4",
  },
];

export default function HomeScreen() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const session = await authClient.getSession();
        setUser(session.data?.user);
      } catch (error) {
        console.error("Error getting user:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await authClient.signOut();
            router.replace("/login");
          } catch (error) {
            console.error("Logout error:", error);
          }
        },
      },
    ]);
  };

  const handleServicePress = (service: Service) => {
    Alert.alert(
      service.title,
      `Book ${service.description.toLowerCase()} service?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Book Now",
          onPress: () => console.log(`Booking ${service.title}`),
        },
      ]
    );
  };

  const renderServiceCard = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={[styles.serviceCard, { borderLeftColor: item.color }]}
      onPress={() => handleServicePress(item)}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: item.color + "20" }]}
      >
        <Ionicons name={item.icon} size={32} color={item.color} />
      </View>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceTitle}>{item.title}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name || "User"}!</Text>
            <Text style={styles.subGreeting}>What needs fixing today?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton} onPress={handleLogout}>
            <Ionicons name="person-circle-outline" size={32} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>FixMaster</Text>
            <Text style={styles.heroSubtitle}>
              Professional electrical & electronics repair services at your
              doorstep
            </Text>
          </View>
          <View style={styles.heroIcon}>
            <Ionicons name="construct" size={48} color="#2563EB" />
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Repairs Done</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Support</Text>
          </View>
        </View>

        {/* Services Section */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <FlatList
            data={services}
            renderItem={renderServiceCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Emergency Contact */}
        <View style={styles.emergencySection}>
          <View style={styles.emergencyContent}>
            <Ionicons name="call" size={24} color="#EF4444" />
            <View style={styles.emergencyText}>
              <Text style={styles.emergencyTitle}>Emergency Service</Text>
              <Text style={styles.emergencySubtitle}>
                Available 24/7 for urgent repairs
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>Call Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#6B7280",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  subGreeting: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 4,
  },
  profileButton: {
    padding: 8,
  },
  heroSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF4FF",
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 20,
    borderRadius: 16,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
  },
  heroIcon: {
    marginLeft: 16,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563EB",
  },
  statLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  servicesSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  serviceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  emergencySection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    marginHorizontal: 20,
    marginVertical: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  emergencyContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  emergencyText: {
    marginLeft: 12,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#DC2626",
  },
  emergencySubtitle: {
    fontSize: 14,
    color: "#7F1D1D",
    marginTop: 2,
  },
  emergencyButton: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  emergencyButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
