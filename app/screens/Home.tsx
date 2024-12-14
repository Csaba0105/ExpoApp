import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { API_URL, useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';

export default function Home() {
  const { authState } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!authState?.token) {
        Alert.alert('Error', 'You are not authenticated.');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/post`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authState.token}`,
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch posts.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [authState?.token]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <PostCard item={item} />} // Use the Post component
      keyExtractor={(item) => String(item.id)}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
