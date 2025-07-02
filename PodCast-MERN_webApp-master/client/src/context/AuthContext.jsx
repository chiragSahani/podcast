// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { BACKEND_URL } from "../config/constants";
import { config } from "../config/config";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/auth/check-auth`,
        config
      );
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        showAuthModal,
        setShowAuthModal,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
