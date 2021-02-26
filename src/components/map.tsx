// Import libraries and components
import React, { Component } from 'react';
import { View, StyleSheet,  Dimensions } from 'react-native';
import MapView, { Marker, Region, LatLng } from 'react-native-maps';

// Define props for DetailsScreen componenet
type Props = {
  region: Region,
  markers: LatLng[]
}

/**
 * Details screen componenet to display individual veteran details
 */
class Map extends Component<Props> {

  /**
   * Render method to return TSX
   */
  render(){

    return (
      <View style={styles.container}>
        <MapView style={styles.map} region={this.props.region}>
          {
            this.props.markers.map((marker: LatLng) => {
              return <Marker key={marker.latitude+marker.longitude} coordinate={marker} />;
            })
          }
        </MapView> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
  },
});

// Export the details screen componenet
export default Map;