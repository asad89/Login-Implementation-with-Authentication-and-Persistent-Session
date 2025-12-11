import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Modal } from 'react-native';



export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isEmailValid = (value: string) => {
    return value.includes('@') && value.includes('.');
  };
  const isButtonEnabled = () => {
    return isEmailValid(email) && password.length >= 6;
  };
  

  return (
    <View style={styles.container}>
          <TextInput style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
       <TextInput style={styles.input} placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {loading && (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
)}
      <TouchableOpacity
        style={[styles.button, (!isButtonEnabled() || loading) && styles.buttonDisabled]}
        disabled={!isButtonEnabled() || loading}
        onPress={() => {
          if (!isButtonEnabled()) return;

          setLoading(true);

          setTimeout(() => {
            setLoading(false);
            navigation.navigate('Home');
          }, 5000);
        }}
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
    backgroundColor: '#f5f5f5',
  },
  
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#A0CFFF', 
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});