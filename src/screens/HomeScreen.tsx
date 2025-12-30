import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { removeToken } from '../storage/authStorage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Colors from '../constants'; 

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: NavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  const handleLogout = async () => {
    try {
      await removeToken();
      
      // Navigate back to Login and clear navigation history
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  text: { 
    fontSize: 20,
    marginBottom: 20,
  },
  logoutButton: {
     backgroundColor: Colors.primaryButton,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 20,
  },
  logoutText: {
     color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});