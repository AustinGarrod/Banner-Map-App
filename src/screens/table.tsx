import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

import TableRow from '../components/tableRow';

import bannerData from '../data/banners.json';
import { ScreenStackParams } from '../typescript/screenparams';
import { Screens } from '../typescript/screens';


type Props = {
  navigation: StackNavigationProp<ScreenStackParams, Screens.TableScreen>
}

class TableScreen extends Component<Props> {
  render(){
    return (
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>First</DataTable.Title>
            <DataTable.Title>Last</DataTable.Title>
            <DataTable.Title>Branch</DataTable.Title>
          </DataTable.Header>

          {
            bannerData.slice(0, 20).map((banner, index) => {
              return <TableRow key={index} navigation={this.props.navigation} banner={banner} />;
            })
          }

        </DataTable>
      </ScrollView>
    )
  }
}

export default TableScreen;