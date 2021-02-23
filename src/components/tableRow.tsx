import React, { Component } from 'react';
import { DataTable } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

import Banner from '../typescript/banner';
import { Screens } from '../typescript/screens';
import { ScreenStackParams } from '../typescript/screenparams';

type TableNavigationProps = StackNavigationProp<ScreenStackParams, Screens.TableScreen>

type Props = {
  banner: Banner,
  navigation: TableNavigationProps,
}

class TableRow extends Component<Props> {
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

export default TableRow;