import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TableScreen from './src/screens/table';
import DetailsScreen from './src/screens/details';

import { ScreenStackParams } from './src/typescript/screenparams';
import { Screens } from './src/typescript/screens';

const Stack = createStackNavigator<ScreenStackParams>();

class App extends Component {
  render(){
    return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name={Screens.TableScreen}
              component={TableScreen}
            />
            <Stack.Screen 
              name={Screens.DetailsScreen}
              component={DetailsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    marginTop: 30
  }
});

export default App;