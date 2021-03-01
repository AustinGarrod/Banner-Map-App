// Import libraries and componenets
import React, { memo } from 'react';
import { Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

// Import custom componenets
import TableRow from './tableRow';

// Import typescript definitions
import Banner from '../typescript/interfaces/banner';
import { ScreenStackParams } from '../typescript/types/screenparams';
import { Screens } from '../typescript/enumerations/screens';
import { FlatList } from 'react-native-gesture-handler';
 

// Define props for component
interface tableDataProps {
  banners: Banner[],
  navigation: StackNavigationProp<ScreenStackParams, Screens.TableScreen>
}

// Memoize TableRow componenet
const MemoizedTableRow = memo(TableRow);

// Component to display when no search results found
const DataListEmpty = () => (
  <Text style={styles.noResultsMessage}>No Results Found</Text>
)

export const TableData = ({ banners, navigation }: tableDataProps) =>{
  return(
    <FlatList 
      data={banners}
      renderItem={({item}) => (
        (<MemoizedTableRow navigation={navigation} banner={item} />)
      )}
      keyExtractor={(banner) => banner.number.toString()}
      ListEmptyComponent={DataListEmpty}
    />
  );
}

// Define styles
const styles = StyleSheet.create({
  noResultsMessage: {
    flex: 1,
    padding: 10,
    textAlign: "center"
  }
});