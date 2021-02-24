// Import libraries and components
import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

// Import custom component
import TableRow from '../components/tableRow';

//  Import banner data from local file
import bannerData from '../data/banners.json';

// Import typescript values
import { ScreenStackParams } from '../typescript/screenparams';
import { Screens } from '../typescript/screens';
import Banner from '../typescript/banner';

// Define props for TableScreen componenet
type Props = {
  navigation: StackNavigationProp<ScreenStackParams, Screens.TableScreen>
}

/**
 * TableScreen componenet to display table of all veterans
 */
class TableScreen extends Component<Props> {
  /**
   * Constructor for componenent
   * @param props Props passed to component
   */
  constructor(props: Props){
    super(props);

    // this.state = {
    //   banner: bannerData
    // }

    this.filterDisabledBanners = this.filterDisabledBanners.bind(this);
    this.filterUnknownLocationBanners = this.filterUnknownLocationBanners.bind(this);
  }

  filterDisabledBanners(banners: Banner[]): Banner[] {
    return banners.filter((banner) => {
      return banner.enabled === true;
    });
  }

  filterUnknownLocationBanners(banners: Banner[]): Banner[] {
    return banners.filter((banner) => {
      return banner.lat !== 0 && banner.long !==0;
    })
  }

  /**
   * Render method to return TSX
   */
  render(){
    console.log(bannerData.length)
    console.log(this.filterDisabledBanners(bannerData).length)
    console.log(
      this.filterDisabledBanners(
        this.filterUnknownLocationBanners(bannerData)
      ).length
    );

    return (
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>First</DataTable.Title>
            <DataTable.Title>Last</DataTable.Title>
            <DataTable.Title>Branch</DataTable.Title>
          </DataTable.Header>

          { // Loop through rows of veterans, creating new row for each
            bannerData.slice(0, 20).map((banner, index) => {
              return <TableRow key={index} navigation={this.props.navigation} banner={banner} />;
            })
          }

        </DataTable>
      </ScrollView>
    )
  }
}

// Export TableScreen componenet
export default TableScreen;