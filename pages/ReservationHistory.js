import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useReservation } from "./ReservationContext";

const ReservationHistory = () => {
  const { reservations } = useReservation();
  const navigation = useNavigation();

  const renderReservation = ({ item }) => (
    <View style={styles.reservationItem}>
      <Text style={styles.reservationTitle}>Reservation Details</Text>
      <Text style={styles.reservationText}>Name: {item.name}</Text>
      <Text style={styles.reservationText}>Email: {item.email}</Text>
      <Text style={styles.reservationText}>Phone: {item.phone}</Text>
      <Text style={styles.reservationText}>Date: {item.date}</Text>
      <Text style={styles.reservationText}>Time: {item.time}</Text>
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
      <Text style={styles.pageTitle}>Reservation History</Text>

      {/* Reservation List */}
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        renderItem={renderReservation}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No reservations found.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 0,
    marginTop: 40
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
  reservationItem: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20, 
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderWidth: 2,
    borderColor: "black",
    elevation: 2, 
  },
  reservationText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  reservationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
  },
});

export default ReservationHistory;
