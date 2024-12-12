import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "./CartContext"; // Import the CartContext


const CustomPicker = ({ selectedValue, onValueChange, items }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.customPicker}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.pickerRow}>
          <Text style={styles.pickerText}>
            {selectedValue || "Select an option"}
          </Text>
          <Text style={styles.dropdownSymbol}>▼</Text>
        </View>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.modalItem}
                onPress={() => {
                  onValueChange(item.value);
                  setModalVisible(false);
                }}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const OrderPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Drinks");
  const [isModalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [temperature, setTemperature] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const { cart, addToCart } = useCart(); 
  const navigation = useNavigation();

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const confirmOrder = () => {
    if (!selectedItem) {
      console.error("No item selected!");
      return;
    }

    const selectedPrice =
      selectedCategory === "Drinks"
        ? temperature.toLowerCase() === "iced"
          ? selectedItem.price.iced[size.toLowerCase()]
          : selectedItem.price.hot[size.toLowerCase()]
        : selectedItem.price;

    const newItem = {
      name:
        selectedCategory === "Drinks"
          ? `${selectedItem.name} (${temperature.toUpperCase()})`
          : selectedItem.name,
      quantity,
      size: selectedCategory === "Drinks" ? size : "N/A",
      temperature: selectedCategory === "Drinks" ? temperature : "N/A",
      price: selectedPrice || 0,
    };

    addToCart(newItem); // Add item to global cart
    setModalVisible(false);
    navigation.navigate("Cart"); // Navigate to CartPage
  };
  

  return (
    <View style={styles.container}>
            {/* Navbar */}
        <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.navbarBackArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.navbarTitle}>Home</Text>
      </View>


      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.dropdownContainer}>
          <CustomPicker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            items={[
              { label: "Drinks", value: "Drinks" },
              { label: "Food", value: "Food" },
            ]}
          />
        </View>

        {selectedCategory === "Drinks" && (
          <View style={styles.cardsContainer}>
            <View style={styles.card}>
              <Image
                source={require("../assets/menu/icedcaramelm.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Caramel Macchiato</Text>
              <Text style={styles.title}>Iced Regular: ₱150 Iced Large: ₱170</Text>
              <Text style={styles.title}>Hot Regular: ₱130          Hot Large: ₱145</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Caramel Macchiato",
                    price: {
                      iced: { regular: 150, large: 170 },
                      hot: { regular: 130, large: 145 },
                    },
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/icedspanishlatte.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Spanish Latte</Text>
              <Text style={styles.title}>Iced Regular: ₱145 Iced Large: ₱165</Text>
              <Text style={styles.title}>Hot Regular: ₱125          Hot Large: ₱140</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Spanish Latte",
                    price: {
                      iced: { regular: 145, large: 165 },
                      hot: { regular: 125, large: 140 },
                    },
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/iceddirtymatcha.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Dirty Matcha</Text>
              <Text style={styles.title}>Iced Regular: ₱150 Iced Large: ₱170</Text>
              <Text style={styles.title}>Hot Regular: ₱130          Hot Large: ₱145</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Dirty Matcha",
                    price: {
                      iced: { regular: 150, large: 170 },
                      hot: { regular: 130, large: 145 },
                    },
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/chocomt.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Chocolate Milktea</Text>
              <Text style={styles.title}>Iced Regular: ₱59</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Chocolate Milktea",
                    price: {
                      iced: { regular: 59},
                    },
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/matchamt.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Matcha Milktea</Text>
              <Text style={styles.title}>Iced Regular: ₱59</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Matcha Milktea",
                    price: {
                      iced: { regular: 59},
                    },
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/wintermelonmt.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Wintermelon Milktea</Text>
              <Text style={styles.title}>Iced Regular: ₱59</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Wintermelon Milktea",
                    price: {
                      iced: { regular: 59},
                    },
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/darkchoco.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Dark Chocolate Latte</Text>
              <Text style={styles.title}>Iced Regular: ₱149</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Dark Chocolate Latte",
                    price: {
                      iced: { regular: 149},
                    },
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/strawberrylatte.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Strawberry Latte</Text>
              <Text style={styles.title}>Iced Regular: ₱159</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Strawberry Latte",
                    price: {
                      iced: { regular: 159},
                    },
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/matchalatte.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Matcha Creamy Latte</Text>
              <Text style={styles.title}>Iced Regular: ₱165</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Matcha Creamy Latte",
                    price: {
                      iced: { regular: 165},
                    },
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/greenapple.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Green Apple</Text>
              <Text style={styles.title}>Iced Regular: ₱99</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Green Apple",
                    price: {
                      iced: { regular: 99},
                    },
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/raspberry.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Raspberry-Sour Candy</Text>
              <Text style={styles.title}>Iced Regular: ₱99</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "",
                    price: {
                      iced: { regular: 99},
                    },
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/mixedberries.jpg")}
                style={styles.image}
              />
              
              <Text style={styles.title}>Mixed Berries</Text>
              <Text style={styles.title}>Iced Regular: ₱109</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "",
                    price: {
                      iced: { regular: 109},
                    },
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}


        {selectedCategory === "Food" && (
          <View style={styles.cardsContainer}>
            <View style={styles.card}>
              <Image
                source={require("../assets/menu/bananacream.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Banana Cream</Text>
              <Text style={styles.title}>Price: ₱69</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Banana Cream",
                    price: 69,
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/garlicbread.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Toasted Garlic Bread</Text>
              <Text style={styles.title}>Price: ₱100</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Toasted Garlic Bread",
                    price: 100,
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/nachos.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Nachos</Text>
              <Text style={styles.title}>Price: ₱169</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Nachos",
                    price: 169,
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/pizza.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Pizza</Text>
              <Text style={styles.title}>Price: ₱198</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Pizza",
                    price: 198,
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/ramen.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Ku-Ramen</Text>
              <Text style={styles.title}>Price: ₱149</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Ku-Ramen",
                    price: 149,
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            


            <View style={styles.card}>
              <Image
                source={require("../assets/menu/clubhouse.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Clubhouse Sandwich</Text>
              <Text style={styles.title}>Price: ₱189</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Clubhouse Sandwich",
                    price: 189,
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/chocolatewaffle.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Hershey's Chocolate Waffle</Text>
              <Text style={styles.title}>Price: ₱79</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Hershey's Chocolate Waffle",
                    price: 79,
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/caramelwaffle.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Hershey's Caramel Waffle</Text>
              <Text style={styles.title}>Price: ₱79</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Hershey's Caramel Waffle",
                    price: 79,
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/strawberrywaffle.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Hershey's Strawberry Waffle</Text>
              <Text style={styles.title}>Price: ₱79</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Hershey's Strawberry Waffle",
                    price: 79,
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Image
                source={require("../assets/menu/chocolatecoffeepudding.jpg")}
                style={styles.image}
              />
              <Text style={styles.title}>Chcocolate-Coffee Pudding</Text>
              <Text style={styles.title}>Price: ₱69</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openModal({
                    name: "Chcocolate-Coffee Pudding",
                    price: 69,
                  })
                }
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.viewCartButton}
        onPress={() => navigation.navigate("Cart")}
      >
        <Text style={styles.viewCartText}>View Cart ({cart.length})</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Customize Your Order</Text>
            <Text>Quantity:</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                <Text style={styles.buttonText1}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Text style={styles.buttonText1}>+</Text>
              </TouchableOpacity>
            </View>

            {selectedCategory === "Drinks" && (
              <>
                <Text>Size:</Text>
                <CustomPicker
                  selectedValue={size}
                  onValueChange={(itemValue) => setSize(itemValue)}
                  items={[
                    { label: "Regular", value: "regular" },
                    { label: "Large", value: "large" },
                  ]}
                />

                <Text>Temperature:</Text>
                <CustomPicker
                  selectedValue={temperature}
                  onValueChange={(itemValue) => setTemperature(itemValue)}
                  items={[
                    { label: "Hot", value: "hot" },
                    { label: "Iced", value: "iced" },
                  ]}
                />
              </>
            )}

            <TouchableOpacity style={styles.button} onPress={confirmOrder}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
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
    paddingTop: 40,
  },
  navbar: {
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  navbarBackArrow: {
    color: "white",
    fontSize: 18,
    marginRight: 10,
  },
  navbarTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  customPicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    backgroundColor: "#fff",
  },
  pickerRow: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
  },
  pickerText: {
    fontSize: 16,
    color: "#000",
    flex: 1, 
  },
  dropdownSymbol: {
    fontSize: 16,
    color: "#000",
    marginLeft: 10,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
    width: "80%",

  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  scrollContent: {
    padding: 20,
  },
  dropdownContainer: {
    marginBottom: 20,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 8,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  viewCartButton: {
    padding: 15,
    backgroundColor: "black",
    position: "absolute",
    bottom: 30,
    left: 10,
    right: 10,
    borderRadius: 5,
  },
  viewCartText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
   
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

 button1: {
    backgroundColor: "white",
    paddingVertical: 8,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 10,
    width:40,
  },

  buttonText1: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },

  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default OrderPage;
