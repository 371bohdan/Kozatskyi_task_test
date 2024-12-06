import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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

  const { user } = authContext; 


  if (!user) {
    return <AuthScreen />;
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;