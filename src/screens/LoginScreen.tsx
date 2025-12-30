import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { loginApi } from '../api/authApi';
import { saveToken } from '../storage/authStorage';
import Colors from '../constants'; 


type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: NavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isButtonEnabled = () => username.length > 0 && password.length > 0;

  const handleLogin = async () => {
    if (!isButtonEnabled()) return; 

    setLoading(true);

    try {
      const data = await loginApi(username, password);
      await saveToken(data.token);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      Alert.alert('Login Failed', 'Please check your credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={Colors.grey}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={Colors.grey}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[
          styles.button,
          (!isButtonEnabled || loading) && styles.disabled,
        ]}
      disabled={!isButtonEnabled() || loading} 
        onPress={handleLogin}
      >
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  input: {
    backgroundColor: Colors.primary,
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
    borderColor: Colors.secondary,
  },
  button: {
    backgroundColor: Colors.primaryButton,
    padding: 14,
    alignItems: 'center',
    borderRadius: 6,
  },
  disabled: {
   backgroundColor: Colors.disabledButton, 
  },
  text: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
