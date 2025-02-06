import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchNews } from '../../services/newsApi';
import { storeSearchHistory, loadSearchHistory } from '../../services/searchHistory';
import ArticleCard from '../components/ArticleCard';
import ErrorMessage from '../components/ErrorMessage';
import styles from './HomeScreen.styles';

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
    if (query.trim() === '') {
      setError('Please enter a search term.');
      setArticles([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const news = await fetchNews(query);
      if (news.length === 0) {
        setArticles([]);
        setError(null);
        return;
      }
      setArticles(news);
      await storeSearchHistory(query);
      const updatedHistory = await loadSearchHistory();
      setSearchHistory(updatedHistory);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'Network Error') {
          setError('Network error. Please check your connection.');
        } else if (err.message === 'No articles found.') {
          setError('No articles found for this search term.');
        } else {
          setError('Something went wrong. Please try again.');
        }
      } else {
        setError('Unexpected error occurred.');
      }
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
        onSubmitEditing={searchNews}
      />

      <TouchableOpacity style={styles.button} onPress={searchNews}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <ErrorMessage message={error} />}

      <Text style={styles.subtitle}>Recent Searches</Text>
      <View style={styles.recentSearchesContainer}>
        <FlatList
          data={searchHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setQuery(item)}>
              <Text style={styles.historyItem}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

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

export default HomeScreen;