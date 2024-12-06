import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthContext, AuthProvider } from './src/context/AuthContext';

const App = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { theme } = authContext;

  return (
    <NavigationContainer theme={theme}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
