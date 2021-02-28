// Import libraries and componenets
import React, { memo } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
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
  navigation: StackNavigationProp<ScreenStackParams, Screens.TableScreen>
}

// Memoize TableRow componenet
const MemoizedTableRow = memo(TableRow)

export const TableData = ({ banners, navigation }: tableDataProps) =>{
  return(
    <ScrollView>

      { // Loop through rows of veterans, creating new row for each
        banners.map((banner, index) => {
          return <MemoizedTableRow key={`row_${index}`} navigation={navigation} banner={banner} />;
        })
      }
      {
        banners.length === 0 &&
        <Text style={styles.noResultsMessage}>No Results Found</Text>
      }

    </ScrollView>
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