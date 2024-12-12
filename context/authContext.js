import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Create context
const AuthContext = createContext();

// Provider
const AuthProvider = ({ children }) => {
  // Global state to hold user data and token
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  // Load local storage data on initial load
  useEffect(() => {
    const loadLocalStorageData = async () => {
      const data = await AsyncStorage.getItem("@auth");
      const loginData = JSON.parse(data);

      // If there's data, update the state
      if (loginData) {
        setState({
          user: loginData.user,
          token: loginData.token,
        });
      }
    };

    loadLocalStorageData();
  }, []);

  // Update Axios headers whenever the token changes
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
    } else {
      // Clear the Authorization header if no token is available
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [state.token]); // Only re-run when the token changes

  // Default axios configuration
  useEffect(() => {
    axios.defaults.baseURL = "https://react-native-server-4tfd.onrender.com/api/v1";
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
