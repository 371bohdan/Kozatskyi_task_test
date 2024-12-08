import React, { useContext, useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, RefreshControl, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

interface ImageData {
  id: string;
  author: string;
  download_url: string;
}

const FeedScreen: React.FC = () => {
  const { theme } = useContext(AuthContext)!;
  const [data, setData] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchData = useCallback(
    async (reset: boolean = false) => {
      setLoading(true);
      try {
        const response = await axios.get(`https://picsum.photos/v2/list?page=${reset ? 1 : page}&limit=10`);
        setData((prevData) => (reset ? response.data : [...prevData, ...response.data]));
        if (reset) {
          setPage(2); 
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [page]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData(true);
  };

  const handleLoadMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.download_url }} style={styles.image} />
          <Text style={{color: theme.colors.text}}>{item.author}</Text>
        </View>
      )}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { marginBottom: 16 },
  image: { width: '100%', height: 200 },
  text: { fontSize: 16 },
});

export default FeedScreen;