import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useCart } from "./CartContext";

const CartPage = ({ navigation }) => {
  const { cart, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) => total + ((item.price || 0) * (item.quantity || 1)),
        0
      )
      .toFixed(2);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert("Warning", "Your cart is empty!");
      return;
    }
    navigation.navigate("Checkout"); // Navigate to CheckoutPage
  };

  const handleRemoveItem = (item) => {
    Alert.alert(
      "Remove Item",
      `Are you sure you want to remove "${item.name}" from your cart?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => removeFromCart(item),
        },
      ]
    );
  };

  const handleBackToOrder = () => {
    navigation.navigate("Order");
  };

  return (
    <View style={styles.container}>
            {/* Navbar */}
            <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.navbarBackArrow}>←</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>Your Cart</Text>

      {cart.length > 0 ? (
        <FlatList
          data={cart}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.cartItemName}>{item.name || "Unknown Item"}</Text>
              <Text>Quantity: {item.quantity || 1}</Text>
              <Text>Size: {item.size || "N/A"}</Text>
              <Text>Temperature: {item.temperature || "N/A"}</Text>
              <Text>
                Price: ₱{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveItem(item)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty!</Text>
      )}

      {cart.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total: ₱{calculateTotal()}</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToOrder}>
        <Text style={styles.backButtonText}>Add More Items</Text>
      </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#000",
  },
  navbarBackArrow: {
    color: "white",
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  cartItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyCartText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 50,
  },
  footer: {
    padding: 20,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "right",
  },
  checkoutButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 5,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 10,
    padding: 16,
    backgroundColor: "#343434",
    borderRadius: 5,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
     fontWeight: "bold",
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: "#FF3131",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CartPage;


