import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MapView from 'react-native-maps';

export default class BikeMap extends Component {
  constructor() {
    super();
    this.state = {
      initialLat: 25.7617,
      initialLong: -80.1918,
    }
  }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({initialLong: position.coords.longitude, initialLat: position.coords.latitude});
      },
      (error) => null,
      {enableHighAccuracy: true, timeout: 20000}
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.initialLat,
            longitude: this.state.initialLong,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0221,
          }}
          showsUserLocation
          followsUserLocation
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});