import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

interface User {
  email: string;
  password: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: IFormInput) => Promise<void>;
  logout: () => Promise<void>;
  theme: Theme;
  toggleTheme: () => void;
}

interface IFormInput {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme>(DefaultTheme);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        if (storedTheme) {
          setTheme(storedTheme === 'dark' ? DarkTheme : DefaultTheme);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    loadUserData();
  }, []);

  const login = async (data: IFormInput) => {
    const userData: User = {
      ...data,
      avatar: 'https://reqres.in/img/faces/1-image.jpg',
    };
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const toggleTheme = async () => {
    const newTheme = theme === DefaultTheme ? DarkTheme : DefaultTheme;
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme === DarkTheme ? 'dark' : 'light');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, theme, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
