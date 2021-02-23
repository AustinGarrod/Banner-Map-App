import React, { Component } from 'react';
import { DataTable } from 'react-native-paper';

type Props = {
  firstName: string,
  lastName: string,
  branch: string
}

class TableRow extends Component<Props> {
  render(){
    return (
      <DataTable.Row>
        <DataTable.Cell>{this.props.firstName}</DataTable.Cell>
        <DataTable.Cell>{this.props.lastName}</DataTable.Cell>
        <DataTable.Cell>{this.props.branch}</DataTable.Cell>
      </DataTable.Row>
    )
  }
}

export default TableRow;