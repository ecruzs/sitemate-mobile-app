import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ArticleCardProps {
  title: string;
  description: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description || 'No description available'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});


export default ArticleCard;
