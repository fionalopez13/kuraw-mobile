import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const UserPage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("JohnDoe"); // Editable username
  const [password, setPassword] = useState(""); // Editable password
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password field
  const [email] = useState("johndoe@example.com"); // Non-editable email
  const navigation = useNavigation();

  const handleSaveChanges = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    Alert.alert("Changes Saved", `Username: ${username}\nPassword: ${password}`);
    // You would handle saving logic here
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.navbarTitle}>Profile</Text>
      </View>

      {/* Editable Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{
            uri: profileImage || "https://randomuser.me/api/portraits/lego/5.jpg",
          }}
          style={styles.profileImage}
        />
      </View>

      {/* Editable User Info Section */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoText}>Username</Text>
        <TextInput
          style={styles.inputField}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.userInfoText}>Email</Text>
        <TextInput
          style={[styles.inputField, styles.disabledInput]}
          value={email}
          editable={false}
        />

        <Text style={styles.userInfoText}>Password</Text>
        <TextInput
          style={styles.inputField}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <Text style={styles.userInfoText}>Confirm Password</Text>
        <TextInput
          style={styles.inputField}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveChanges}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("History")}
        >
          <Text style={styles.actionButtonText}>Order History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("ReservationHistory")}
        >
          <Text style={styles.actionButtonText}>Reservation History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Rewards")}
        >
          <Text style={styles.actionButtonText}>Check Rewards</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          Alert.alert("Logged Out", "You have successfully logged out!");
          navigation.navigate("LandingPage");
        }}
      >
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F9",
    paddingHorizontal: 20,
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
    marginRight:170,
  },

  navbarBackArrow: {
    color: "white",
    fontSize: 18,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileImageContainer: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 20,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#1E1E2C",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },

  userInfoContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },

  userInfoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },

  inputField: {
    backgroundColor: "#F4F4F9",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    marginBottom: 15,
  },

  disabledInput: {
    color: "gray",
  },

  saveButton: {
    backgroundColor: "#1E1E2C",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },

  saveButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  buttonSection: {
    alignItems: "center",
  },

  actionButton: {
    backgroundColor: "#1E1E2C",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    width: "100%",
    alignItems: "center",
  },

  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  logoutButton: {
    backgroundColor: "#FF5A5F",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
  },

  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserPage;
