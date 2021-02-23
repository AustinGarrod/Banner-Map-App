import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import Banner from '../typescript/banner';

type Props = {
  route: { params: Banner };
}

class DetailsScreen extends Component<Props> {
  render(){
    console.log(this.props.route.params);
    return (
      <ScrollView>
        <Text> Details Screen </Text>
      </ScrollView>
    )
  }
}

export default DetailsScreen;