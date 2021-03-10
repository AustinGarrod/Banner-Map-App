// Import libraries and components
import React, { Component, createRef } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { DataTable, Card, TextInput, FAB, ActivityIndicator } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';
import Fuse from 'fuse.js'

// Import custom component
import Map from '../components/map';

// Import external values
import SETTINGS from '../config/settings';
import SECRETS from '../config/secrets';

// Import typescript values
import { ScreenStackParams } from '../typescript/types/screenparams';
import { Screens } from '../typescript/enumerations/screens';
import Banner from '../typescript/interfaces/banner';
import { TableData } from '../components/tableData';


// Constants
const MAP_PERCENTAGE_FACTOR = 3.5;
const SEARCH_AREA_HEIGHT = 75;

// Define props for TableScreen componenet
type Props = {
  navigation: StackNavigationProp<ScreenStackParams, Screens.TableScreen>
}

// Define state for TableScreen componenet
type State = {
  banners: Banner[],
  filteredBanners: Banner[],
  searchText: string,
  firstNameSortDirection?: "ascending" | "descending" | undefined
  lastNameSortDirection?: "ascending" | "descending" | undefined,
  branchSortDirection?: "ascending" | "descending" | undefined,
  isDataLoading: boolean
}

/**
 * TableScreen componenet to display table of all veterans
 */
class HomeScreen extends Component<Props, State> {
  tableRef: React.RefObject<FlatList<Banner>>;

  /**
   * Constructor for componenent
   * @param props Props passed to component
   */
  constructor(props: Props){
    // Pass props to react componenent class
    super(props);

    this.tableRef = createRef();

    // bind this for functions
    this.handleHeaderFirstNameTap = this.handleHeaderFirstNameTap.bind(this);
    this.handleHeaderLastNameTap = this.handleHeaderLastNameTap.bind(this);
    this.handleHeaderBranchTap = this.handleHeaderBranchTap.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleClearTextboxTap = this.handleClearTextboxTap.bind(this);

    this.state = {
      banners: [],
      filteredBanners: [],
      searchText: "",
      firstNameSortDirection: undefined,
      lastNameSortDirection: "descending",
      branchSortDirection: undefined,
      isDataLoading: true
    }
  }

  /**
   * Called after component mounts successfuly
   */
  componentDidMount() {
    // Get banners from API
    fetch(`${SETTINGS.API_DOMAIN}/api/banner/all`, {
      headers: {
        "Authorization": `Bearer ${SECRETS.API_KEY}`
      }
    })
    .then(response => {
      if (response.status !== 200) return Promise.reject(response.body);
      return Promise.resolve(response);
    })
    .then(response => response.json())
    .then(data => {

      // prepare banner data
      let banners = this.filterDisabledBanners(data);
      banners = this.filterUnknownLocationBanners(banners);
      banners = this.sortBannersByLastName(banners);

      this.setState({
        banners: banners,
        filteredBanners: banners,
        isDataLoading: false
      })
    })
    .catch(error => { console.log("Failed to load banners", error) });
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
    banners = this.sortBannersByFirstName(this.state.filteredBanners, direction);

    this.setState({
      filteredBanners: banners,
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
    banners = this.sortBannersByLastName(this.state.filteredBanners, direction);

    this.setState({
      filteredBanners: banners,
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
    banners = this.sortBannersByBranch(this.state.filteredBanners, direction);

    this.setState({
      filteredBanners: banners,
      firstNameSortDirection: undefined,
      lastNameSortDirection: undefined,
      branchSortDirection: direction
    })
  }

  /**
   * Handles the search functionality
   */
  handleSearchTextChange(text: string){
    // scroll to top of data table
    this.tableRef.current?.scrollToIndex({index: 0})

    if (text === "") {
      const results = this.state.banners;

      this.setState({
        filteredBanners: results,
        searchText: text
      });

    } else {
      const fuse = new Fuse(this.state.banners, {
        keys: ['lastName', 'firstName', 'bannerName', 'era', 'branch', 'sponsor'],
        threshold: 0.1,
        findAllMatches: true,
      });
  
      const results = fuse.search(text).map(result => {
        return result.item;
      });

      this.setState({
        filteredBanners: results,
        searchText: text,
        firstNameSortDirection: undefined,
        lastNameSortDirection: undefined,
        branchSortDirection: undefined
      });
    }
  }

  /**
   * Handles tap on the clear textbox FAB
   */
  handleClearTextboxTap(){
    this.handleSearchTextChange("");
  }

  /**
   * Render method to return TSX
   */
  render(){

    return (
      <View>
        {
          this.state.isDataLoading &&
          <View style={styles.loadingIndicatorContainer}>
            <ActivityIndicator animating={true} size="large" />
            <Text style={styles.loadingText}>Loading Banner Data...</Text>
          </View>
        }
        <View style={styles.mapArea}>
          <Map 
            region={{
              latitude: 44.083071,
              longitude: -79.154525,
              longitudeDelta: 0.15,
              latitudeDelta: 0.15
            }}
            width={Dimensions.get('screen').width}
            height={Dimensions.get('screen').height / MAP_PERCENTAGE_FACTOR}
            markers={this.state.filteredBanners.map(banner => {
              return { latitude: banner.lat, longitude: banner.long };
            })}
          />
        </View>

        <View style={styles.searchArea}>
          <TextInput
            mode="outlined"
            label="Search"
            value={this.state.searchText}
            onChangeText={text => this.handleSearchTextChange(text)}
          />
          {
            this.state.searchText !== "" &&
            <FAB
              style={styles.clearTextboxFab}
              small
              icon="close"
              onPress={this.handleClearTextboxTap}
            />
          }
        </View>
        
        <View style={styles.tableArea}>
          <Card style={styles.tableAreaCard}>
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

              <TableData tableRef={this.tableRef} navigation={this.props.navigation} banners={this.state.filteredBanners} />


            </DataTable>
          </Card>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mapArea: {
    height: Dimensions.get('screen').height / MAP_PERCENTAGE_FACTOR
  },
  tableArea: {
    height: Dimensions.get('screen').height - SEARCH_AREA_HEIGHT - (Dimensions.get('screen').height / MAP_PERCENTAGE_FACTOR)
  },
  tableAreaCard: {
    minHeight: Dimensions.get('screen').height - SEARCH_AREA_HEIGHT - (Dimensions.get('screen').height / MAP_PERCENTAGE_FACTOR)
  },
  searchArea: {
    height: SEARCH_AREA_HEIGHT,
    padding: 5,
    backgroundColor: "white",
  },
  clearTextboxFab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  loadingIndicatorContainer: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    alignItems: "center",
    justifyContent: "center"
  },
  loadingText: {
    marginStart: 10
  }
});

// Export TableScreen componenet
export default HomeScreen;