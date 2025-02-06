import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchNews } from '../services/newsApi';

const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const searchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const news = await fetchNews(query);
      setArticles(news);
    } catch (err) {
      setError("Something went wrong. Please try again.");
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

      <FlatList
        data={articles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.article}>
            <Text style={styles.articleTitle}>{item.title}</Text>
            <Text style={styles.articleDescription}>{item.description}</Text>
          </View>
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
  article: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  articleDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default HomeScreen;
