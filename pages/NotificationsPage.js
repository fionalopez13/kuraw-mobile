
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const NotificationsPage = ({ navigation }) => {
  // Sample notifications data
  const notifications = [
    { id: '1', title: 'Order Update', message: 'Your order #1234 has been delivered.' },
    { id: '2', title: 'New Offer', message: 'Get 20% off on your next purchase!' },
    { id: '3', title: 'Profile Update', message: 'Your profile was updated successfully.' },
  ];

  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >    
          <Text style={styles.navbarBackArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.navbarTitle}>Notifications</Text>
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.list}
      />
    </View>    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingTop: 70, // Adjust for navbar height
  },
  navbar: {
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Space out back arrow and title
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: "115%", // Full width
    position: "absolute",
    top: 40, // Lower it slightly
    zIndex: 1, // Ensure it appears above other content
  },
  navbarTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 140,
  },
  navbarBackArrow: {
    color: "white",
    fontSize: 18,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    paddingBottom: 20,
    marginTop:60,
  },
  notificationCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    marginTop: 5,
    color: '#555',
  },
});

export default NotificationsPage;