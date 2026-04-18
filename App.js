import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [name, setName] = useState('');
  const [savedName, setSavedName] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('@user_name', name);
      setSavedName(name); 
      setName('');
      Keyboard.dismiss();
      alert('Data Saved!');
    } catch (e) {
      alert('Failed to save');
    }
  };

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user_name');
      if (value !== null) {
        setSavedName(value);
      }
    } catch (e) {
      alert('Failed to load');
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('@user_name');
      setSavedName('');
    } catch (e) {
      alert('Failed to delete');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes</Text>

      <Text style={styles.savedText}>Data: {savedName}</Text>

      <TextInput
        style={styles.input}
        placeholder="example"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TouchableOpacity style={styles.button} onPress={saveData}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.deleteBtn]} onPress={removeData}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  savedText: { fontSize: 18, color: '#333', marginBottom: 20 },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  deleteBtn: { backgroundColor: '#FF3B30' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
