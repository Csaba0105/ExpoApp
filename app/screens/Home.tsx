import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import { Image } from 'expo-image';
import { API_URL, useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { ThemedText } from '../components/ThemedText';
import LikeButton from '../components/LikeButton';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function Home() {
  const { authState } = useAuth(); // Hitelesítési állapot használata
  const [data, setData] = useState([]); // Állapot az adatok tárolására
  const [loading, setLoading] = useState(true); // Betöltési állapot
  const router = useRouter();

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
            'Authorization': `Bearer ${authState.token}`,
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        setData(result); // Az API-tól kapott adat beállítása
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch posts.');
        console.error(error);
      } finally {
        setLoading(false); // Betöltési állapot frissítése
      }
    };

    fetchPosts(); // Adatok betöltése az API-ból
  }, [authState?.token]);

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.item}>
        {/* Ha vannak képek, megjelenítjük őket egy lapozható listában */}
        {item.imageUrls.length > 0 && (
          <FlatList
            data={item.imageUrls} // Képek tömbje
            horizontal // Vízszintes lapozás
            showsHorizontalScrollIndicator={false} // Görgetősáv elrejtése
            keyExtractor={(image, index) => `${item.id}-image-${index}`} // Egyedi kulcs minden képhez
            renderItem={({ item: image }) => (
              <Image source={{ uri: image }} placeholder={{ blurhash }} cachePolicy={'memory-disk'} contentFit='fill' /> // Kép megjelenítése
            )} 
          />
        )}
        {/* Poszt címe és tartalma */}
        <ThemedText type="title" onPress={() => router.push(`/post/${item.id}`)}>
          {item.title}
        </ThemedText>
        <ThemedText type="subtitle">{item.content}</ThemedText>
        {/* Post Tools */}
        <View style={{ top: 15, alignItems: 'flex-start'}}>
          <LikeButton></LikeButton>
          <ThemedText type='default'>99 likes</ThemedText>
        </View>
      </View>
    );
  };  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={data} // Az API-tól kapott adatok
      renderItem={renderItem} // Hogyan jelenjenek meg az elemek
      keyExtractor={(item) => String(item.id)} // Egyedi kulcs az adatokból
      initialNumToRender={10} // Kezdeti renderelendő elemek száma
      maxToRenderPerBatch={10} // Egyszerre renderelt elemek száma
      windowSize={5} // A látható területen kívüli elemek mérete
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
