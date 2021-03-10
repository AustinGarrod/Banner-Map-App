import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper'

// Define props for component
interface loadingScreenProps {
  loadingTextContent: string
}

export const LoadingScreen = ({ loadingTextContent }: loadingScreenProps) =>{
  return(
    <View style={styles.loadingIndicatorContainer}>
      <ActivityIndicator animating={true} size="large" />
      <Text style={styles.loadingText}>{ loadingTextContent }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingIndicatorContainer: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    alignItems: "center",
    justifyContent: "center"
  },
  loadingText: {
    marginStart: 10
  }
});
