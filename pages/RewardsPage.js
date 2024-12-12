import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { useCart } from "./CartContext"; // Adjust the path to CartContext.js


const RewardsPage = () => {
  const { rewardsBalance, pointsHistory } = useCart(); // Use rewardsBalance and pointsHistory from context
  const [redeemInput, setRedeemInput] = useState("");
  const navigation = useNavigation(); // Initialize navigation

  const handleRedeemPoints = () => {
    const pointsToRedeem = parseInt(redeemInput);

    if (isNaN(pointsToRedeem) || pointsToRedeem <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid number of points.");
      return;
    }

    if (pointsToRedeem > rewardsBalance) {
      Alert.alert("Insufficient Points", "You don't have enough points.");
      return;
    }

    // Add logic for redeeming points if needed
    Alert.alert("Success", "Points redeemed successfully!");
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>{item.date}</Text>
      <Text style={styles.historyText}>{item.activity}</Text>
      <Text style={styles.historyText}>{item.points}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("User")}>
          <Text style={styles.navbarBackArrow}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.pageTitle}>My Rewards</Text>

      {/* Reward Points Section */}
      <View style={styles.rewardsContainer}>
        <Text style={styles.sectionTitle}>Reward Points</Text>
        <Text style={styles.availablePoints}>
          Available Points: {rewardsBalance}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter points to redeem"
          keyboardType="numeric"
          value={redeemInput}
          onChangeText={setRedeemInput}
        />
        <TouchableOpacity
          style={styles.redeemButton}
          onPress={handleRedeemPoints}
        >
          <Text style={styles.redeemButtonText}>Redeem Points</Text>
        </TouchableOpacity>
      </View>

      {/* Points History Section */}
      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Points History</Text>
        <View style={styles.historyHeader}>
          <Text style={styles.historyHeaderText}>Date</Text>
          <Text style={styles.historyHeaderText}>Activity</Text>
          <Text style={styles.historyHeaderText}>Points</Text>
        </View>
        <FlatList
          data={pointsHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderHistoryItem}
          ListEmptyComponent={
            <Text style={styles.noHistoryText}>No history available.</Text>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    marginTop: 40,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "100%",
  },
  navbarBackArrow: {
    color: "white",
    fontSize: 18,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  rewardsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  availablePoints: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
  },
  redeemButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  redeemButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  historyContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingBottom: 5,
  },
  historyHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  historyText: {
    fontSize: 14,
    color: "#555",
  },
  noHistoryText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});

export default RewardsPage;
