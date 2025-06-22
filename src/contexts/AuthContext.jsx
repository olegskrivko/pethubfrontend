import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const navigate = useNavigate();

  const getCurrentUser = () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) return null;

      const decodedToken = jwtDecode(accessToken);
      return decodedToken ? { userId: decodedToken.user_id } : null;
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  };

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

  useEffect(() => {
    const existingUser = getCurrentUser();
    if (existingUser) {
      fetchUserDetails();
    } else {
      setIsAuthLoading(false);
    }
  }, []);

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
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    navigate('/logout');
  };

  return <AuthContext.Provider value={{ user, login, logout, isAuthLoading }}>{children}</AuthContext.Provider>;
};
