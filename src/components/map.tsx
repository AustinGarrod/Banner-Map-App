// Import libraries and components
import React, { Component } from 'react';
import { View, StyleSheet,  Dimensions } from 'react-native';
import MapView, { Marker, Region, LatLng } from 'react-native-maps';

// Define props for DetailsScreen componenet
type Props = {
  region: Region,
  markers: LatLng[],
  width: number,
  height: number
}

/**
 * Map component to display map and markers
 */
class Map extends Component<Props> {

  /**
   * Render method to return TSX
   */
  render(){

    return (
      <View style={styles.container}>
        <MapView style={{width: this.props.width, height: this.props.height}} region={this.props.region}>
          {
            this.props.markers.map((marker: LatLng, index: number) => {
              return <Marker key={`marker_${index}`} coordinate={marker} />;
            })
          }
        </MapView> 
      </View>
    )
  }
}

// Map layout styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

// Export the details screen componenet
export default Map;