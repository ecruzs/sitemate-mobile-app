import React from 'react';
import { View, Text } from 'react-native';
import styles from './ArticleCard.styles';

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

export default ArticleCard;
