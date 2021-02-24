// Import libraries and components
import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import Banner from '../typescript/banner';

// Define props for DetailsScreen componenet
type Props = {
  route: { params: {
    details: Banner
  } };
}

/**
 * Details screen componenet to display individual veteran details
 */
class DetailsScreen extends Component<Props> {
  /**
   * Render method to return TSX
   */
  render(){
    let details = this.props.route.params.details;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.labels}>
              <Text style={styles.labelText}>Name</Text>
            </View>
            <View style={styles.values}>
              <Text style={styles.valuesText}>{`${details.firstName} ${details.lastName}`}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.labels}>
              <Text style={styles.labelText}>Branch</Text>
            </View>
            <View style={styles.values}>
              <Text style={styles.valuesText}>
                {details.branch !== "" ? details.branch : "-"}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.labels}>
              <Text style={styles.labelText}>Era</Text>
            </View>
            <View style={styles.values}>
              <Text style={styles.valuesText}>{details.era !== "" ? details.era : "-"}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.labels}>
              <Text style={styles.labelText}>Banner Sponsor</Text>
            </View>
            <View style={styles.values}>
              <Text style={styles.valuesText}>{details.sponsor !== "" ? details.sponsor : "-"}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

// Styles to format screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
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

// Export the details screen componenet
export default DetailsScreen;