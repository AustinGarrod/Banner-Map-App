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

// Define state for TableScreen componenet
type State = {
  banners: Banner[],
  firstNameSortDirection?: "ascending" | "descending" | undefined
  lastNameSortDirection?: "ascending" | "descending" | undefined,
  branchSortDirection?: "ascending" | "descending" | undefined
}

/**
 * TableScreen componenet to display table of all veterans
 */
class TableScreen extends Component<Props, State> {
  /**
   * Constructor for componenent
   * @param props Props passed to component
   */
  constructor(props: Props){
    // Pass props to react componenent class
    super(props);

    let banners: Banner[];

    // prepare banner data
    banners = this.filterDisabledBanners(bannerData);
    banners = this.filterUnknownLocationBanners(banners);
    banners = this.sortBannersByLastName(banners);

    // bind this for event handlers
    this.handleHeaderFirstNameTap = this.handleHeaderFirstNameTap.bind(this);
    this.handleHeaderLastNameTap = this.handleHeaderLastNameTap.bind(this);
    this.handleHeaderBranchTap = this.handleHeaderBranchTap.bind(this);

    this.state = {
      banners: banners,
      firstNameSortDirection: undefined,
      lastNameSortDirection: "descending",
      branchSortDirection: undefined
    }
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
   * @param order Order to sort by, "ascending" or "descending"
   */
  sortBannersByFirstName(banners: Banner[], order?: string): Banner[] {
    // Check if order ascending, otherwise assume descending
    if (order === "ascending") {
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
   * @param order Order to sort by, "ascending" or "descending"
   */
  sortBannersByLastName(banners: Banner[], order?: string): Banner[] {
    // Check if order ascending, otherwise assume descending
    if (order === "ascending") {
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
   * @param order Order to sort by, "ascending" or "descending"
   */
  sortBannersByBranch(banners: Banner[], order?: string): Banner[] {
    // Check if order ascending, otherwise assume descending
    if (order === "ascending") {
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
   * Handles tap on first name header of table
   */
  handleHeaderFirstNameTap(){
    let banners: Banner[];
    let direction: "ascending" | "descending" | undefined;

    direction = this.state.firstNameSortDirection === "descending" ? "ascending" : "descending";
    banners = this.sortBannersByFirstName(this.state.banners, direction);

    this.setState({
      banners: banners,
      firstNameSortDirection: direction,
      lastNameSortDirection: undefined,
      branchSortDirection: undefined
    })
  }

  /**
   * Handles tap on last name header of table
   */
  handleHeaderLastNameTap(){
    let banners: Banner[];
    let direction: "ascending" | "descending" | undefined;

    direction = this.state.lastNameSortDirection === "descending" ? "ascending" : "descending";
    banners = this.sortBannersByLastName(this.state.banners, direction);

    this.setState({
      banners: banners,
      firstNameSortDirection: undefined,
      lastNameSortDirection: direction,
      branchSortDirection: undefined
    })
  }

  /**
   * Handles tap on last name header of table
   */
  handleHeaderBranchTap(){
    let banners: Banner[];
    let direction: "ascending" | "descending" | undefined;

    direction = this.state.branchSortDirection === "descending" ? "ascending" : "descending";
    banners = this.sortBannersByBranch(this.state.banners, direction);

    this.setState({
      banners: banners,
      firstNameSortDirection: undefined,
      lastNameSortDirection: undefined,
      branchSortDirection: direction
    })
  }

  /**
   * Render method to return TSX
   */
  render(){
    return (
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title 
              sortDirection={this.state.firstNameSortDirection}
              onPress={this.handleHeaderFirstNameTap}
            >
              First
            </DataTable.Title>
            <DataTable.Title 
              sortDirection={this.state.lastNameSortDirection}
              onPress={this.handleHeaderLastNameTap}
            >
              Last
            </DataTable.Title>
            <DataTable.Title 
              sortDirection={this.state.branchSortDirection}
              onPress={this.handleHeaderBranchTap}
            >
              Branch
            </DataTable.Title>
          </DataTable.Header>

          { // Loop through rows of veterans, creating new row for each
            this.state.banners.map((banner, index) => {
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