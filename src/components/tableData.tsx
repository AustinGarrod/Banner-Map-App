// Import libraries and componenets
import React, { memo, RefObject } from 'react';
import { Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';

// Import custom componenets
import TableRow from './tableRow';

// Import typescript definitions
import Banner from '../typescript/interfaces/banner';
import { ScreenStackParams } from '../typescript/types/screenparams';
import { Screens } from '../typescript/enumerations/screens';

// Define props for component
interface tableDataProps {
  banners: Banner[],
  navigation: StackNavigationProp<ScreenStackParams, Screens.HomeScreen>
  tableRef: RefObject<FlatList<Banner>>
}

// Memoize TableRow componenet
const MemoizedTableRow = memo(TableRow);

// Component to display when no search results found
const DataListEmpty = () => (
  <Text style={styles.noResultsMessage}>No Results Found</Text>
)

export const TableData = ({ banners, navigation, tableRef }: tableDataProps) =>{
  return(
    <FlatList
      ref={tableRef}
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