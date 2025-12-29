import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; // import type
import Colors from '../constants'; 

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
//Creates a type for the navigation prop 

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

const isButtonEnabled = () => {
  return username.length > 0 && password.length > 0;
};



  const handleLogin = async () => {
  if (!isButtonEnabled()) return;

  setLoading(true);

  try {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username, 
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();

    // Save token
    await AsyncStorage.setItem('token', data.token);

    // Navigate and disable back
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });

  } catch (error) {
    Alert.alert('Login Failed', 'Please check your credentials.');
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
          <TextInput style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
       <TextInput style={styles.input} placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {loading && (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" />
    </View>
)}
      <TouchableOpacity
        style={[styles.button, (!isButtonEnabled() || loading) && styles.buttonDisabled]}
        disabled={!isButtonEnabled() || loading}
       onPress={handleLogin}

      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>


    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center',      
    padding: 20,
    backgroundColor: Colors.background,
  },
  
  input: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.primaryButton,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: Colors.disabledButton, 
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});