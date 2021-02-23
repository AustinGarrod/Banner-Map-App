import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { DataTable } from 'react-native-paper';

import TableRow from '../components/tableRow';

import bannerData from '../data/banners.json';

class TableScreen extends Component {
  render(){
    return (
      <ScrollView>
        <Text>List of names</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>First</DataTable.Title>
            <DataTable.Title>Last</DataTable.Title>
            <DataTable.Title>Branch</DataTable.Title>
          </DataTable.Header>

          {
            bannerData.map((banner, index) => {
              return <TableRow key={index} firstName={banner.firstName} lastName={banner.lastName} branch={banner.branch} />;
            })
          }

        </DataTable>
      </ScrollView>
    )
  }
}

export default TableScreen;