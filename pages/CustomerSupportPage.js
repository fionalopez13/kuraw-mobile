import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ensure this package is installed

const CustomerSupport = ({ navigation }) => { // Add navigation as a prop
  const handleEmailPress = () => {
    Linking.openURL('mailto:support@kurawCoffee.com');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleFAQPress = () => {
    Linking.openURL('https://yourapp.com/faq');
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back" size={25} color="white" />
        </TouchableOpacity>
        <Text style={styles.navbarTitle}>Customer Support</Text>
      </View>

      {/* Logo Section */}
      <View>
          <Image
            source={require("../assets/kuraw_logo.jpg")}
            style={styles.logo}
          />
        </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.description}>
          We’re here to help! Choose an option below to get in touch with us or find the information you need.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleEmailPress}>
          <Text style={styles.buttonText}>Email Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePhonePress}>
          <Text style={styles.buttonText}>Call Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFAQPress}>
          <Text style={styles.buttonText}>Visit website</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Set flex for main container
    backgroundColor: 'white',
  },

  navbar: {
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Space out back arrow and title
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: "100%", // Full width
    position: "absolute",
    top: 40, // Adjust to lower navbar
    zIndex: 1, // Ensure it appears above other content
  },

  navbarTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginRight:100,
  },

  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    backgroundColor: "black",
    marginTop: 50,
    padding: 12,
    flexDirection: "row", // Aligns logo, menu, and icon horizontally
    justifyContent: "space-between", // Spacing between logo, menu, and icon
    alignItems: "center", // Centers items vertically
  },

  logo: {
    width: 150,
    height: 150,
    marginTop: 180,
    marginBottom: 20,
    marginLeft: 135,
    borderRadius: 30,
    resizeMode: "contain",
  },

  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop:-300,
    marginBottom: 30,
    color: 'black',
  },

  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomerSupport;
