import React, { createContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: IFormInput) => void;
  logout: () => void;
}

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (data: IFormInput) => {
    // Додаємо avatar за замовчуванням
    const userData: User = {
      ...data,
      avatar: '', // Значення avatar за замовчуванням
    };
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
