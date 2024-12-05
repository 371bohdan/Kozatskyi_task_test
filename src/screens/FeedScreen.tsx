import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Image, RefreshControl, StyleSheet } from 'react-native';
import axios from 'axios';

interface ImageData {
  id: string;
  author: string;
  download_url: string;
}

const FeedScreen: React.FC = () => {
  const [data, setData] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=10`);
      setData((prevData) => [...prevData, ...response.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    setPage(1);
    setData([]);
    fetchData();
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
          <Text>{item.author}</Text>
        </View>
      )}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={handleRefresh} />}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 16 },
  image: { width: '100%', height: 200 },
});

export default FeedScreen;
