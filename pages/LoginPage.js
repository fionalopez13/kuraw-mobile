import { View, Text, Text as RNText, StyleSheet, Alert, Image, TouchableOpacity, Button } from "react-native";
import React, { useState, useContext } from "react";
import { TextInput } from 'react-native-paper';
import { useEffect } from "react";
import SubmitButton from "../components/Forms/SubmitButton";
import axios from "axios";

const Login = ({ navigation }) => {

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => { // I-DELETE RANI PAG MAG BACKEND NA!!!
    navigation.navigate('Home');
  };  

// E-UNCOMMENT DAYUN NI FOR BACKEND!!!
// const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       if (!email || !password) {
//         Alert.alert("Please Fill All Fields");
//         setLoading(false);
//         return;
//       }
//       setLoading(false);
//       const { data } = await axios.post("/auth/login", { email, password });
//       setState(data);
//       await AsyncStorage.setItem("@auth", JSON.stringify(data));
//       alert(data && data.message);
//       navigation.navigate("HomeD");
//       console.log("Login Data==> ", { email, password });
//     } catch (error) {
//       alert(error.response.data.message);
//       setLoading(false);
//       console.log(error);
//     }
//   };

// //temp function to check local storage data
// useEffect(() => {
//   const getLocalStorageData = async () => {
//     let data = await AsyncStorage.getItem("@auth");
//     console.log("Local Storage ==> ", data);
//   };
//   getLocalStorageData();
// }, []);

return (
    <View style={styles.container}>
      <Image source={require('../assets/kuraw_logo.jpg')} 
		style={styles.image} />

      <TextInput
        label="Email"
        mode="outlined"
        theme={{
          colors: {
            placeholder: 'black',
            text: '#FF914D',
            primary: 'black',
            background: 'white',
          },
        }}
        value={email} 
        onChangeText={value=> setEmail(value)} 
        style={styles.input}/>
      

      <TextInput
        label="Password"
        mode="outlined"
        theme={{
          colors: {
            placeholder: 'black',
            text: '#FF914D',
            primary: 'black',
            background: 'white',
          },
        }}
        value={password}
        secureTextEntry={!showPass}
        onChangeText={value=> setPassword(value)} 
        right={
          <TextInput.Icon
            icon={showPass ? 'eye' : 'eye-off'}
            style={{ marginTop: 15 }}
            onPress={() => setShowPass(!showPass)}
          />
        }
        style={styles.input}
      />

<SubmitButton
        btnTitle="Login"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <View style={styles.linkContainer}>
        <RNText style={styles.text}>Don't have an account?</RNText>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <RNText style={styles.linkText}>Sign Up</RNText>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.linkContainer}>
      <RNText style={styles.text}>Forgot you password?</RNText>
        <TouchableOpacity onPress={() => navigation.navigate('#')}>
          <RNText style={styles.linkText}>Recover</RNText>
        </TouchableOpacity>
      </View> */}
        </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  image: {
    width: 300, 
    height: 500,
    resizeMode: 'contain',
    margin: -110,
  },


  input: {
    width: 300,
    marginBottom: 10,
    marginTop: 10
  },

  button: {
    marginTop: 30,
    marginBottom: 15,
    width: 160,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#E8E4D9',
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  text: {
    color: '#E8E4D9',
    marginRight: 3,
    marginLeft: 18,
    marginTop: 5,
  },

  linkText: {
    fontWeight: 'bold',
    color: '#E8E4D9',
    marginRight: 14,
    marginTop: 5,
  },

  forgetpassText:{
    color: 'black',
    marginLeft: 100,
  },

  orText:{
    marginBottom: 5,
    color: '#E8E4D9',
    fontSize: 18,
    fontWeight: 'bold',
  },


});


export default Login;


