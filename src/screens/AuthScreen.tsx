import React, { useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../context/AuthContext'; // Імпортуємо AuthContext

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

// Схема валідації
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const AuthScreen: React.FC = () => {
  const authContext = useContext(AuthContext);

  // Перевірка на наявність контексту
  if (!authContext) {
    return null;
  }

  const { login } = authContext;

  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    login(data);
  };

  return (
    <View style={styles.container}>
      <Text>Name:</Text>
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Text>Email:</Text>
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text>Password:</Text>
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 12, padding: 8 },
  error: { color: 'red', marginBottom: 8 },
});

export default AuthScreen;