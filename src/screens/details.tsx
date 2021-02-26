// Import libraries and components
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Card } from 'react-native-paper'
import Banner from '../typescript/interfaces/banner';

// Import componenets
import DetailsRow from '../components/detailsRow'
import Map from '../components/map';

// Define props for DetailsScreen componenet
type Props = {
  route: { params: {
    details: Banner
  } };
}

type Region = {
  latitude: Number,
  longitude: Number,
  latitudeDelta: Number,
  longitudeDelta: Number
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

        <Map 
          region={{
            latitude: details.lat,
            longitude: details.long,
            longitudeDelta: 0.01,
            latitudeDelta: 0.01
          }}

          markers={[{latitude: details.lat, longitude: details.long}]}
         />

        <Card>
          <Card.Content>
            <DetailsRow title="Name" value={`${details.firstName} ${details.lastName}`} />
            <DetailsRow title="Branch" value={details.branch !== "" ? details.branch : "-"} />
            <DetailsRow title="Era" value={details.era !== "" ? details.era : "-"} />
            <DetailsRow title="Banner Sponsor" value={details.sponsor !== "" ? details.sponsor : "-"}/>
          </Card.Content>
        </Card>
      </ScrollView>
    )
  }
}

// Export the details screen componenet
export default DetailsScreen;