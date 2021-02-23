import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import Banner from '../typescript/banner';

type Props = {
  route: { params: {
    details: Banner
  } };
}

class DetailsScreen extends Component<Props> {
  render(){
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.labels}>
              <Text style={styles.labelText}>Name</Text>
            </View>
            <View style={styles.values}>
              <Text style={styles.valuesText}>{`${this.props.route.params.details.firstName} ${this.props.route.params.details.lastName}`}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.labels}>
              <Text style={styles.labelText}>Branch</Text>
            </View>
            <View style={styles.values}>
              <Text style={styles.valuesText}>{this.props.route.params.details.branch}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.labels}>
              <Text style={styles.labelText}>Era</Text>
            </View>
            <View style={styles.values}>
              <Text style={styles.valuesText}>{this.props.route.params.details.era}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.labels}>
              <Text style={styles.labelText}>Banner Sponsor</Text>
            </View>
            <View style={styles.values}>
              <Text style={styles.valuesText}>{this.props.route.params.details.sponsor}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

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

export default DetailsScreen;