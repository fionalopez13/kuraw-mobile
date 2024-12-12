
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // For navigation
import { useCart } from './CartContext'; // Import the cart context

const CheckoutPage = () => {
  const { cart, completeOrder } = useCart();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderType, setOrderType] = useState('Delivery'); // Default to 'Delivery'
  const [notes, setNotes] = useState('');
  const navigation = useNavigation();
  const [rewardsBalance, setRewardsBalance] = useState(10);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(null);
  const [discountInput, setDiscountInput] = useState('');

  const deliveryFee = 50; // Fixed delivery fee
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const grandTotal = orderType === 'Delivery' ? totalPrice + deliveryFee : totalPrice;
  const safeTotalPrice = isNaN(totalPrice) ? 0 : totalPrice;
  const safeGrandTotal = isNaN(grandTotal) ? 0 : grandTotal;

  const paymentMethods = [
    { id: 1, name: 'GCash' },
    { id: 2, name: 'Credit/Debit Card' },
    { id: 3, name: 'Maya' },
    { id: 4, name: 'Cash on Delivery' },
  ];

  const handleApplyDiscount = () => {
    const discountValue = parseInt(discountInput);

    if (isNaN(discountValue) || discountValue <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number of points.');
      return;
    }

    if (discountValue > rewardsBalance) {
      Alert.alert('Insufficient Points', "You don't have enough points.");
      return;
    }

    setDiscount(discountValue);
    setFinalPrice(safeGrandTotal - discountValue);
    setRewardsBalance(rewardsBalance - discountValue);
    setDiscountInput('');
  };

  const handlePlaceOrder = () => {
    if (orderType === 'Delivery' && !deliveryAddress.trim()) {
      Alert.alert('Error', 'Please enter a delivery address.');
      return;
    }
  
    if (!selectedPayment) {
      Alert.alert('Error', 'Please select a payment method.');
      return;
    }
  
    const grandTotal = orderType === 'Delivery' ? safeTotalPrice + deliveryFee : safeTotalPrice;
    const finalOrderPrice = grandTotal - discount;
  
    completeOrder({
      deliveryAddress,
      paymentMethod: selectedPayment,
      orderType,
      notes,
      cart,
      total: safeTotalPrice.toFixed(2),
      deliveryFee: orderType === 'Delivery' ? deliveryFee.toFixed(2) : '0.00',
      grandTotal: grandTotal.toFixed(2),
      discount: discount,
      finalPrice: finalOrderPrice.toFixed(2),
    });
  
    Alert.alert('Order Placed', 'Your order has been placed successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('History') },
    ]);
  };


  return (
    <ScrollView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.navbarBackArrow}>←</Text>
        </TouchableOpacity>
      </View>
  
      {/* Content Wrapper */}
      <View style={styles.contentWrapper}>
        <Text style={styles.header}>Checkout</Text>
  
        {/* Order Type Section */}
        <View style={styles.orderTypeSection}>
          <Text style={styles.sectionHeader}>Order Type</Text>
          <View style={styles.orderTypeOptions}>
            <TouchableOpacity
              style={[
                styles.orderTypeButton,
                orderType === 'Delivery' && styles.selectedOrderTypeButton,
              ]}
              onPress={() => setOrderType('Delivery')}
            >
              <Text
                style={[
                  styles.orderTypeText,
                  orderType === 'Delivery' && styles.selectedOrderTypeText,
                ]}
              >
                Delivery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.orderTypeButton,
                orderType === 'Pick Up' && styles.selectedOrderTypeButton,
              ]}
              onPress={() => setOrderType('Pick Up')}
            >
              <Text
                style={[
                  styles.orderTypeText,
                  orderType === 'Pick Up' && styles.selectedOrderTypeText,
                ]}
              >
                Pick Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
  
        {/* Delivery Address */}
        {orderType === 'Delivery' && (
          <View style={styles.deliverySection}>
            <Text style={styles.sectionHeader}>Delivery Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your delivery address"
              value={deliveryAddress}
              onChangeText={setDeliveryAddress}
            />
          </View>
        )}
  
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Order Summary</Text>
          {cart.map((item, index) => (
            <View key={index} style={styles.cartItem}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>
                  ₱{(item.price || 0).toFixed(2)} x {item.quantity || 1}
                </Text>
              </View>
            </View>
          ))}
        </View>
  
        {/* Total Price */}
        <View style={styles.totalSection}>
          <Text style={styles.totalText}>Total Price:</Text>
          <Text style={styles.totalAmount}>₱{safeTotalPrice.toFixed(2)}</Text>
        </View>
  
        {/* Delivery Fee */}
        {orderType === 'Delivery' && (
          <View style={styles.totalSection}>
            <Text style={styles.totalText}>Delivery Fee:</Text>
            <Text style={styles.totalAmount}>₱{deliveryFee.toFixed(2)}</Text>
          </View>
        )}
  
        {/* Grand Total */}
        <View style={styles.grandTotalSection}>
          <Text style={styles.grandTotalText}>Grand Total:</Text>
          <Text style={styles.grandTotalAmount}>₱{safeGrandTotal.toFixed(2)}</Text>
        </View>
  
        {/* Apply Discount */}
        <View style={styles.discountSection}>
          <Text style={styles.discountText}>Apply Discount:</Text>
          <TextInput
            style={styles.discountInput}
            placeholder="Enter points"
            keyboardType="numeric"
            value={discountInput}
            onChangeText={setDiscountInput}
          />
          <TouchableOpacity style={styles.applyDiscountButton} onPress={handleApplyDiscount}>
            <Text style={styles.applyDiscountText}>Apply</Text>
          </TouchableOpacity>
        </View>
  
        {/* Discount Details */} 
        <View style={styles.discountDetails}>
          <Text style={styles.discountApplied}>
            Discount Applied: ₱{discount || 0}
          </Text>
          <Text style={styles.finalPrice}>
            Final Price: ₱{finalPrice !== null ? finalPrice.toFixed(2) : safeGrandTotal.toFixed(2)}
          </Text>
          <Text style={styles.rewardsLeft}>
            Available Reward Points: {rewardsBalance}
          </Text>
        </View>
  
        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={styles.paymentOption}
              onPress={() => setSelectedPayment(method.id)} // Set selected payment method
            >
              <View style={styles.radioButtonContainer}>
                <View
                  style={[
                    styles.radioButton,
                    selectedPayment === method.id && styles.radioButtonSelected, // Style for selected method
                  ]}
                />
              </View>
              <Text style={styles.paymentText}>{method.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
  
        {/* Notes Section */}
        <View style={styles.notesSection}>
          <Text style={styles.sectionHeader}>Notes (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter any special instructions"
            value={notes}
            onChangeText={setNotes}
            multiline
          />
        </View>
  
        {/* Place Order Button */}
        <TouchableOpacity style={styles.checkoutButton} onPress={handlePlaceOrder}>
          <Text style={styles.checkoutText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentWrapper: {
    paddingHorizontal: 20, // Add horizontal padding
    marginTop: 10, // Add some top margin for separation
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginTop: 30,
    backgroundColor: "#000",
  },
  navbarBackArrow: {
    color: "white",
    fontSize: 18,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center', // Center the header text
    marginVertical: 20,
    color: 'black',
  },
  orderTypeSection: {
    marginBottom: 20, // Add spacing below the section
  },
  orderTypeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  orderTypeButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
  },
  selectedOrderTypeButton: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  orderTypeText: {
    fontSize: 16,
    color: 'black',
  },
  selectedOrderTypeText: {
    color: 'white',
  },
  deliverySection: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 5,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  section: {
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  grandTotalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
  },
  totalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  grandTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  grandTotalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  discountSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  discountText: {
    fontSize: 16,
    marginRight: 10,
  },
  discountInput: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  applyDiscountButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
  },
  applyDiscountText: {
    color: 'white',
    fontWeight: 'bold',
  },
  discountDetails: {
    marginTop: 20,
  },
  discountApplied: {
    fontSize: 16,
    color: 'red',
    marginBottom: 5,
  },
  finalPrice: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rewardsLeft: {
    fontSize: 16,
    color: '#555',
  },
  radioButtonContainer: {
    marginRight: 10, // Space between radio button and text
  },
  
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10, // Circular shape
    borderWidth: 2,
    borderColor: 'black', // Default border color
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  radioButtonSelected: {
    backgroundColor: 'black', // Fill color for selected radio button
  },
  
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8', // Separator line
  },
  
  paymentText: {
    fontSize: 16,
    color: 'black',
  },
  checkoutButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 50,
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutPage;