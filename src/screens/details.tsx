// Import libraries and components
import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-paper'
import Banner from '../typescript/banner';

// Import componenets
import DetailsRow from '../components/detailsRow'

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

          <Card>
            <Card.Content>
              <DetailsRow title="Name" value={`${details.firstName} ${details.lastName}`} />
              <DetailsRow title="Branch" value={details.branch !== "" ? details.branch : "-"} />
              <DetailsRow title="Era" value={details.era !== "" ? details.era : "-"} />
              <DetailsRow title="Banner Sponsor" value={details.sponsor !== "" ? details.sponsor : "-"}/>
            </Card.Content>
          </Card>
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