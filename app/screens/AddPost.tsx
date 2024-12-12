import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { API_URL, useAuth } from '../context/AuthContext';

type AddPostScreenProps = {
  navigation: NavigationProp<any>;
};

const AddPostScreen: React.FC<AddPostScreenProps> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { authState } = useAuth();

  const handleAddPost = async () => {
    if (!title || !content) {
      Alert.alert('Error', 'Both title and content are required.');
      return;
    }

    if (!authState?.token) {
      Alert.alert('Error', 'You must be logged in to add a post.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Post added successfully!');
        navigation.goBack();
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || 'Failed to add post.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter post title"
      />

      <Text style={styles.label}>Content</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setContent}
        placeholder="Enter post content"
        multiline
      />

      <Button title="Add Post" onPress={handleAddPost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
  },
});

export default AddPostScreen;
