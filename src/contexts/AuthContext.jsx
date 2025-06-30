import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Checks if a JWT token has expired
 * @param {string} token - The JWT token to check
 * @returns {boolean} - True if token is expired or invalid, false otherwise
 */
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (e) {
    return true;
  }
};

const AuthContext = createContext();

/**
 * Custom hook to use the authentication context
 * @returns {Object} - Authentication context value
 */
export const useAuth = () => useContext(AuthContext);

/**
 * Authentication Provider Component
 * Manages user authentication state and provides authentication methods
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const navigate = useNavigate();

  /**
   * Extracts user information from stored JWT token
   * @returns {Object|null} - User object or null if token is invalid/expired
   */
  const getUserFromToken = () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken || isTokenExpired(accessToken)) return null;
      const decodedToken = jwtDecode(accessToken);
      return decodedToken ? { userId: decodedToken.user_id } : null;
    } catch (err) {
      return null;
    }
  };

  /**
   * Fetches detailed user information from the API
   * Updates the user state with complete user data
   */
  const fetchUserDetails = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        setIsAuthLoading(false);
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/api/auth/user/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.data?.username && response.data?.email) {
        setUser({
          userId: response.data.id,
          username: response.data.username,
          email: response.data.email,
          avatar: response.data.avatar,
        });
      }
    } catch (err) {
      console.error('Error fetching user:', err);
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Initialize authentication state on component mount
  useEffect(() => {
    const existingUser = getUserFromToken();
    if (existingUser) {
      fetchUserDetails();
    } else {
      setIsAuthLoading(false);
    }
  }, []);

  /**
   * Authenticates user with email and password
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Object} - Result object with success status and message
   */
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login/`, {
        email,
        password,
      });
      const { access, refresh } = response.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      await fetchUserDetails();
      return { success: true };
    } catch (err) {
      if (err.response) {
        const message = err.response.data?.error || err.response.data?.detail || 'Nepareizs e-pasts vai parole';
        return { success: false, message };
      }
      return { success: false, message: 'Radās kļūda pieteikšanās laikā' };
    }
  };

  /**
   * Logs out the current user
   * Clears stored tokens and resets user state
   */
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
