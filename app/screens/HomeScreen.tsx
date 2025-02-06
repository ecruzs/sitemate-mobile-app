import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchNews } from '../../services/newsApi';
import { storeSearchHistory, loadSearchHistory } from '../../services/searchHistory';
import ArticleCard from '../components/ArticleCard';

const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchHistory = async () => {
      const history = await loadSearchHistory();
      setSearchHistory(history);
    };
    fetchHistory();
  }, []);

  const searchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const news = await fetchNews(query);
      setArticles(news);
      
      // Save search to history
      await storeSearchHistory(query);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };


    return (
    <View style={styles.container}>
      <Text style={styles.title}>Sitemate News App</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for news"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={searchNews} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>{error}</Text>}

      <Text style={styles.subtitle}>Recent Searches</Text>
      <FlatList
        data={searchHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setQuery(item)}>
            <Text style={styles.historyItem}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={articles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ArticleCard title={item.title} description={item.description || 'No description available'} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  historyItem: {
    fontSize: 16,
    color: '#007BFF',
    marginVertical: 5,
    textDecorationLine: 'underline',
  },
});

export default HomeScreen;