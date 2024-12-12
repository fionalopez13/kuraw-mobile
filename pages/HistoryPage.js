
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { useCart } from "./CartContext";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const HistoryPage = () => {
  const { orderHistory } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigation = useNavigation();

  const DELIVERY_FEE = 50; // Fixed delivery fee for delivery orders

  const paymentMethodMap = {
    1: "GCash",
    2: "Credit/Debit Card",
    3: "Maya",
    4: "Cash on Delivery",
    5: "Cash",
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleOrderClick(item)}
      style={styles.orderItem}
    >
      <Text style={styles.orderText}>Order ID: {item.id}</Text>
      <Text style={styles.orderText}>Date: {item.date}</Text>
      <Text style={styles.orderText}>Order Type: {item.orderType}</Text>
      <Text style={styles.orderText}>
        Payment Method: {paymentMethodMap[item.paymentMethod] || "Unknown"}
      </Text>
      <Text style={styles.orderText}>Total Price: ₱{item.total.toFixed(2)}</Text>
      {item.orderType === "Delivery" && (
        <Text style={styles.orderText}>
          Delivery Fee: ₱{DELIVERY_FEE.toFixed(2)}
        </Text>
      )}
      <Text style={styles.orderText}>
        Grand Total: ₱{item.grandTotal.toFixed(2)}
      </Text>
      {item.discount > 0 && (
        <Text style={styles.orderText}>
          Discount Applied: ₱{item.discount.toFixed(2)}
        </Text>
      )}
      <Text style={styles.orderText}>
        Final Price: ₱{item.finalPrice.toFixed(2)}
      </Text>
      <Text style={styles.orderText}>Status: {item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.navbarBackArrow}>←</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Order History</Text>
      {orderHistory.length > 0 ? (
        <FlatList
          data={orderHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
        />
      ) : (
        <Text style={styles.emptyText}>No orders in history.</Text>
      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedOrder && (
              <>
                <Text style={styles.modalTitle}>Order Details</Text>
                <Text style={styles.modalText}>
                  Order ID: {selectedOrder.id}
                </Text>
                <Text style={styles.modalText}>
                  Date: {selectedOrder.date}
                </Text>
                <Text style={styles.modalText}>
                  Order Type: {selectedOrder.orderType}
                </Text>
                <Text style={styles.modalText}>
                  Location: {selectedOrder.deliveryAddress || "N/A"}
                </Text>
                <Text style={styles.modalText}>
                  Payment Method:{" "}
                  {paymentMethodMap[selectedOrder.paymentMethod] || "Unknown"}
                </Text>
                <Text style={styles.modalText}>
                  Notes: {selectedOrder.notes || "None"}
                </Text>
                <Text style={styles.modalText}>Items:</Text>
                {selectedOrder.items.map((item, index) => (
                  <Text key={index} style={styles.modalText}>
                    - {item.name} x{item.quantity || 1} (₱
                    {(item.price * (item.quantity || 1)).toFixed(2)})
                  </Text>
                ))}
                <Text style={styles.modalText}>
                  Total Price: ₱{selectedOrder.total.toFixed(2)}
                </Text>
                {selectedOrder.orderType === "Delivery" && (
                  <Text style={styles.modalText}>
                    Delivery Fee: ₱{DELIVERY_FEE.toFixed(2)}
                  </Text>
                )}
                <Text style={styles.modalText}>
                  Grand Total: ₱{selectedOrder.grandTotal.toFixed(2)}
                </Text>
                {selectedOrder.discount > 0 && (
                  <Text style={styles.modalText}>
                    Discount Applied: ₱{selectedOrder.discount.toFixed(2)}
                  </Text>
                )}
                <Text style={styles.modalText}>
                  Final Price: ₱{selectedOrder.finalPrice.toFixed(2)}
                </Text>
                <Text style={styles.modalText}>
                  Status: {selectedOrder.status}
                </Text>
                <TouchableOpacity
                  onPress={handleCloseModal}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 0,
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
  navbarTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 20,
  },
  orderItem: {
    width: "90%",
    alignSelf: "center",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    borderWidth: 2,
    borderColor: "black",
  },
  orderText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 32,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "black",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HistoryPage;
