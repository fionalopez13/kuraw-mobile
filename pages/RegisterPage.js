import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-paper";
import SubmitButton from "../components/Forms/SubmitButton";
import axios from "axios";

const Register = ({ navigation }) => {
  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to handle registration
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        alert("Please fill all fields");
        setLoading(false);
        return;
      }
      const { data } = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      alert(data?.message);
      navigation.navigate("Login");
      setLoading(false);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  // Top-left navigation to HomePage
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.headerButtonText}>Back to Home</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/kuraw_logo.jpg")} style={styles.image} />
      <TextInput
        placeholder="Name"
        label="Name"
        mode="outlined"
        theme={{
          colors: {
            placeholder: "#FF914D",
            text: "#FF914D",
            primary: "#FF914D",
            background: "white",
          },
        }}
        value={name}
        onChangeText={(value) => setName(value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        label="Email"
        mode="outlined"
        theme={{
          colors: {
            placeholder: "#FF914D",
            text: "#FF914D",
            primary: "#FF914D",
            background: "white",
          },
        }}
        value={email}
        onChangeText={(value) => setEmail(value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        label="Password"
        mode="outlined"
        theme={{
          colors: {
            placeholder: "#FF914D",
            text: "#FF914D",
            primary: "#FF914D",
            background: "white",
          },
        }}
        value={password}
        secureTextEntry={!showPass}
        onChangeText={(value) => setPassword(value)}
        right={
          <TextInput.Icon
            icon={showPass ? "eye" : "eye-off"}
            style={{ marginTop: 15 }}
            onPress={() => setShowPass(!showPass)}
          />
        }
        style={styles.input}
      />
      <SubmitButton
        btnTitle="Register"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <View style={styles.linkContainer}>
        <Text style={styles.text}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    width: 300,
    height: 500,
    resizeMode: "contain",
    margin: -110,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  input: {
    width: 300,
    marginBottom: 15,
  },
  text: {
    marginTop: 5,
    color: "#E8E4D9",
    marginRight: 5,
    marginLeft: 18,
  },
  linkText: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#E8E4D9",
    marginRight: 14,
  },
  headerButtonText: {
    color: "Black",
    marginLeft: 10,
    fontSize: 16,
  },
});

export default Register;
