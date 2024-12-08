import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const { user, logout, theme } = useContext(AuthContext)!;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image source={{ uri: user?.avatar || '' }} style={styles.avatar} />
      <Text style={[styles.email, { color: theme.colors.text }]}>{user?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  email: { fontSize: 16, marginBottom: 16 },
  button: { padding: 16, backgroundColor: '#4CAF50', borderRadius: 8, marginBottom: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default ProfileScreen;
