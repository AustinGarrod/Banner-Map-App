// Import libraries and components
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import TableScreen from './src/screens/table';
import DetailsScreen from './src/screens/details';

// Import typescript values
import { ScreenStackParams } from './src/typescript/types/screenparams';
import { Screens } from './src/typescript/enumerations/screens';

// Create a navigation stack
const Stack = createStackNavigator<ScreenStackParams>();

/**
 * Main app componenet to hold screens for navigation
 */
class App extends Component {
  /**
   * Render method to return TSX
   */
  render(){
    return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name={Screens.TableScreen}
              component={TableScreen}
              options={{
                title: 'Tap a name to learn more'
              }}
            />
            <Stack.Screen 
              name={Screens.DetailsScreen}
              component={DetailsScreen}
              options={{
                title: 'Veteran Details'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    )
  }
}

// Export the main app componenet
export default App;