import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CartProvider } from "./pages/CartContext";
import { ReservationProvider } from "./pages/ReservationContext";

import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import OrderPage from './pages/OrderPage';
import HistoryPage from './pages/HistoryPage';
import UserPage from './pages/UserPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LandingPage from './pages/LandingPage';
import ReservationPage from './pages/ReservationPage';
import ReservationHistory from './pages/ReservationHistory';
import Rewards from './pages/RewardsPage';
import Notifications from './pages/NotificationsPage';
import CustomerSupport from './pages/CustomerSupportPage';




const Stack = createStackNavigator();


const App = () => {
  return (
    <ReservationProvider>
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={HomePage} options={{headerShown: false}} />
        <Stack.Screen name="Register" component={RegisterPage} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginPage} options={{headerShown: false}}/>
        <Stack.Screen name="Order" component={OrderPage} options={{headerShown: false}}/>
        <Stack.Screen name="Cart" component={CartPage} options={{headerShown: false}}/>
        <Stack.Screen name="History" component={HistoryPage} options={{headerShown: false}}/> 
        <Stack.Screen name="User" component={UserPage} options={{headerShown: false}}/>  
        <Stack.Screen name="Checkout" component={CheckoutPage} options={{headerShown: false}}/> 
        <Stack.Screen name="Reservation" component={ReservationPage} options={{headerShown: false}}/> 
        <Stack.Screen name="ReservationHistory" component={ReservationHistory} options={{headerShown: false}}/> 
        <Stack.Screen name="Rewards" component={Rewards} options={{headerShown: false}}/> 
        <Stack.Screen name="Notifications" component={Notifications} options={{headerShown: false}}/> 
        <Stack.Screen name="CustomerSupport" component={CustomerSupport} options={{headerShown: false}}/> 
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
    </ReservationProvider>
  );
};

export default App;
