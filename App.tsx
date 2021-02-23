import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import TableScreen from './src/screens/table'

class App extends Component {
  render(){
    return (
      <PaperProvider>
        <View>
          <TableScreen />
        </View>
      </PaperProvider>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    marginTop: 2
  }
});

export default App;