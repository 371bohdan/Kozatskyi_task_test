import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AuthScreen from '../screens/AuthScreen';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { AuthContext } from '../context/AuthContext';

type AppTabParamList = {
  Feed: undefined;
  Profile: undefined;
};

const Tab = createMaterialTopTabNavigator<AppTabParamList>();

const AppNavigator: React.FC = () => {
  const authContext = useContext(AuthContext); 

  if (!authContext) {
    return <AuthScreen />; 
  }

  const { user, toggleTheme, theme } = authContext; 


  if (!user) {
    return <AuthScreen />;
  }

  const buttonStyles = {
    backgroundColor: theme.dark ? '#333' : '#f9edea',
    color: theme.dark ? '#FFF' : '#000', 
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={[styles.toggleButton, { backgroundColor: buttonStyles.backgroundColor }]} 
        onPress={toggleTheme}>
        <Text style={[styles.buttonText, { color: buttonStyles.color }]}>{theme.dark ? 'Dark mode on' : 'Dark mode off'}</Text>
      </TouchableOpacity>
      <Tab.Navigator>
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </View>



  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default AppNavigator;