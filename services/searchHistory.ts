import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'searchHistory';

export const storeSearchHistory = async (query: string) => {
  try {
    const existingHistory = await AsyncStorage.getItem(STORAGE_KEY);
    const history = existingHistory ? JSON.parse(existingHistory) : [];

    // Avoid duplicates
    if (!history.includes(query)) {
      history.unshift(query);
    }

    // Limit history to the 5 most recent searches
    if (history.length > 5) {
      history.pop();
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving search history:', error);
  }
};

export const loadSearchHistory = async (): Promise<string[]> => {
  try {
    const history = await AsyncStorage.getItem(STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading search history:', error);
    return [];
  }
};
