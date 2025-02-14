import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // This is a mock authentication.
      // In a real app, you would validate credentials against your backend.
      if (email === 'user@example.com' && password === 'password') {
        await AsyncStorage.setItem('authToken', 'dummy-auth-token');
        setIsAuthenticated(true);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return { isAuthenticated, signIn, signOut };
}