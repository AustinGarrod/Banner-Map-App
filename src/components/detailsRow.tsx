// Import libraries and components
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define props for component
type Props = {
  title: string,
  value: string
}

/**
 * Component to display details for veteran
 */
class DetailsRow extends Component<Props> {
  /**
   * Render method to return TSX
   */
  render(){
    return (
      <View style={styles.row}>
        <View style={styles.labels}>
          <Text style={styles.labelText}>{this.props.title}</Text>
        </View>
        <View style={styles.values}>
          <Text style={styles.valuesText}>{this.props.value}</Text>
        </View>
      </View>
    )
  }
}

// Styles to format component
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  labels: {
    flex: 2,
    padding: 10
  },
  labelText: {
    fontWeight: "bold",
    fontSize: 18
  },
  values: {
    flex: 3,
    padding: 10
  },
  valuesText: {
    fontSize: 18
  }
});

// Export TableRow component
export default DetailsRow;