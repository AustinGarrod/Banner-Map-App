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
  }

  /**
   * Filters out banners that are disabled from array of banners
   * @param banners Array of banners to be filtered
   * @returns filtered list of banners
   */
  filterDisabledBanners(banners: Banner[]): Banner[] {
    return [...banners].filter((banner) => {
      return banner.enabled === true;
    });
  }

  /**
   * Filters out banners without locations from array of banners
   * @param banners Array of banners to be filtered
   * @returns filtered list of banners
   */
  filterUnknownLocationBanners(banners: Banner[]): Banner[] {
    return [...banners].filter((banner) => {
      return banner.lat !== 0 && banner.long !==0;
    })
  }

  /**
   * Sort an array banners by first name
   * @param banners Array of banners to be sorted
   * @param order Order to sort by, "asc" or "desc"
   */
  sortBannersByFirstName(banners: Banner[], order?: string): Banner[] {
    // Check if order ascending, otherwise assume descending
    if (order === "asc") {
      return [...banners].sort((a ,b) => {
        if (a.firstName < b.firstName) return 1;
        if (a.firstName > b.firstName) return -1;
        return 0;
      });
    } else {
      return [...banners].sort((a ,b) => {
        if (a.firstName > b.firstName) return 1;
        if (a.firstName < b.firstName) return -1;
        return 0;
      });
    }
  }

  /**
   * Sort an array banners by last name
   * @param banners Array of banners to be sorted
   * @param order Order to sort by, "asc" or "desc"
   */
  sortBannersByLastName(banners: Banner[], order?: string): Banner[] {
    // Check if order ascending, otherwise assume descending
    if (order === "asc") {
      return [...banners].sort((a ,b) => {
        if (a.lastName < b.lastName) return 1;
        if (a.lastName > b.lastName) return -1;
        return 0;
      });
    } else {
      return [...banners].sort((a ,b) => {
        if (a.lastName > b.lastName) return 1;
        if (a.lastName < b.lastName) return -1;
        return 0;
      });
    }
  }

  /**
   * Sort an array banners by branch
   * @param banners Array of banners to be sorted
   * @param order Order to sort by, "asc" or "desc"
   */
  sortBannersByBranch(banners: Banner[], order?: string): Banner[] {
    // Check if order ascending, otherwise assume descending
    if (order === "asc") {
      return [...banners].sort((a ,b) => {
        if (a.branch < b.branch) return 1;
        if (a.branch > b.branch) return -1;
        return 0;
      });
    } else {
      return [...banners].sort((a ,b) => {
        if (a.branch > b.branch) return 1;
        if (a.branch < b.branch) return -1;
        return 0;
      });
    }
  }

  /**
   * Render method to return TSX
   */
  render(){
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