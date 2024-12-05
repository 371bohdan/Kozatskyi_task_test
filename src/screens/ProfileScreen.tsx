import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen: React.FC = () => {
  const authContext = useContext(AuthContext);

 
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { user, logout } = authContext;

 
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Please log in to see your profile.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.avatar || 'https://reqres.in/img/faces/1-image.jpg' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user.name || 'Anonymous'}</Text>
      <Text style={styles.email}>{user.email || 'No Email Provided'}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  email: { fontSize: 16, color: '#555', marginBottom: 16 },
});

export default ProfileScreen;