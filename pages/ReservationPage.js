import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker"; 
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { useReservation } from "./ReservationContext"; // Context for reservations

const Reservation = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { addReservation } = useReservation(); // Context function to add a reservation
  const navigation = useNavigation();

  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(
      time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
    setIsTimePickerVisible(false); // Close the picker after selection
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !selectedDate ||
      !selectedTime
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Add reservation to the context
    addReservation({
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: selectedDate,
      time: selectedTime,
    });

    Alert.alert(
      "Reservation Confirmed",
      `Reservation for ${formData.name} on ${selectedDate} at ${selectedTime} has been submitted!`,
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("ReservationHistory"), // Navigate to ReservationHistory
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.navbarBackArrow}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Section */}
      <View style={styles.calendarSection}>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={{
            [formattedToday]: {
              selected: true,
              selectedColor: "#000", // Black circle for today's date
              selectedTextColor: "#FFF", // White text for today's date
            },
            ...(selectedDate && selectedDate !== formattedToday && {
              [selectedDate]: {
                selected: true,
                selectedColor: "#E8E4D9", // Light background for selected date
                selectedTextColor: "#000", // Black text for the selected date
              },
            }),
          }}
          theme={{
            calendarBackground: "#FFF",
            textSectionTitleColor: "#000",
            dayTextColor: "#000",
            arrowColor: "#000",
            todayTextColor: "#FFF",
            selectedDayBackgroundColor: "#000",
            selectedDayTextColor: "#FFF",
            textDisabledColor: "#d9e1e8",
            monthTextColor: "#000",
            textMonthFontWeight: "bold",
            textMonthFontSize: 20,
            textDayHeaderFontSize: 14,
            textDayFontWeight: "500",
            textDayFontSize: 16,
          }}
          style={{
            borderWidth: 1,
            borderColor: "#E8E8E8",
            borderRadius: 10,
            padding: 10,
          }}
        />

        {/* Selected Date Display */}
        {selectedDate && (
          <View style={styles.selectedDateBox}>
            <Text style={styles.selectedDateText}>
              Selected Date: {selectedDate}
            </Text>
          </View>
        )}
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        <Text style={styles.header}>Reservation Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={formData.name}
          onChangeText={(value) => handleFormChange("name", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleFormChange("email", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(value) => handleFormChange("phone", value)}
        />

        <TouchableOpacity
          style={styles.input}
          onPress={() => setIsTimePickerVisible(true)}
        >
          <Text>{selectedTime || "Select Reservation Time"}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={() => setIsTimePickerVisible(false)}
          textColor="black"  
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Reservation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
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
  navbarTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  calendarSection: {
    marginBottom: 20,
  },
  selectedDateBox: {
    marginTop: 10,
    alignItems: "center",
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  formSection: {
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
    width: "90%",
    alignSelf: "center", 
  },
  submitButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "90%",
    alignSelf: "center", 
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Reservation;
