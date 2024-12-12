import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LandingPage = ({ navigation }) => {
  
  const handleRegularLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegularRegister = () => {
    navigation.navigate('Register');
  };  

 

  return (
    <View style={styles.container}> 
        <Image source={require('../assets/kuraw_logo.jpg')} style={styles.image}/>
        <TouchableOpacity style={styles.button} onPress={handleRegularLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleRegularRegister}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },

  image: {
    width: 400, 
    height: 600,
    resizeMode: 'contain',
    margin:-110,
  },


  button: {
    padding:20,
    margin:10,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#E8E4D9',
  },

  backButton: {
    backgroundColor: '#E8E4D9',
    padding: 10,
    marginBottom: 10,
    width: 110,
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    top: 10,
    left: 10,
  },

  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LandingPage;
