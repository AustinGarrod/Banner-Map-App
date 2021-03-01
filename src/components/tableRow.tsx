// Import libraries and components
import React, { PureComponent } from 'react';
import { DataTable } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

// Import typescript values
import Banner from '../typescript/interfaces/banner';
import { Screens } from '../typescript/enumerations/screens';
import { ScreenStackParams } from '../typescript/types/screenparams';

// Create custom navigation props definition 
type TableNavigationProps = StackNavigationProp<ScreenStackParams, Screens.TableScreen>

// Define props for TableRow componenet
type Props = {
  banner: Banner,
  navigation: TableNavigationProps,
}

/**
 * TableRow componenet to create row of veteran data
 */
class TableRow extends PureComponent<Props> {
  /**
   * Render method to return TSX
   */
  render(){
    return (
      <DataTable.Row 
        onPress={()=>{
          this.props.navigation.navigate(Screens.DetailsScreen, {details: this.props.banner})
        }}
      >
        <DataTable.Cell>{this.props.banner.firstName}</DataTable.Cell>
        <DataTable.Cell>{this.props.banner.lastName}</DataTable.Cell>
        <DataTable.Cell>{this.props.banner.branch}</DataTable.Cell>
      </DataTable.Row>
    )
  }
}

// Export TableRow componenet
export default TableRow;