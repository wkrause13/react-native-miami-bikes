import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MapView from 'react-native-maps';
import { DOMParser } from 'xmldom';

import CalloutText from './CalloutText';

export default class BikeMap extends Component {
  constructor() {
    super();
    this.state = {
      initialLat: 25.7617,
      initialLong: -80.1918,
      locations: [],
      isError: false,
      errorMsg: '',
    }
    this.fetchLocations = this.fetchLocations.bind(this);
  }
	fetchLocations() {
		const url = 'http://citibikemiami.com/downtown-miami-locations2.xml';
		fetch(url, { method: 'GET',
							mode: 'cors',
							cache: 'default' })
			.then(response => response.text())
			.then((data) => {
				var doc = new DOMParser().parseFromString(data,'text/xml');
				let locations = doc.getElementsByTagName("location");
				let locationList = new Array;
				for (let i = 0; i < locations.length; ++i) {
					const long = parseFloat(locations[i].getElementsByTagName('Longitude')[0].textContent);
					const lat = parseFloat(locations[i].getElementsByTagName('Latitude')[0].textContent);
					const id = parseInt(locations[i].getElementsByTagName('Id')[0].textContent);
					const address = locations[i].getElementsByTagName('Address')[0].textContent;
					const bikes = parseInt(locations[i].getElementsByTagName('Bikes')[0].textContent);
					const dockings = parseInt(locations[i].getElementsByTagName('Dockings')[0].textContent);
          // Lazy way to check for bad data
					if (long){
						locationList.push({long,lat,id,address,bikes,dockings});						
					}
				};
        console.log(locationList);
				this.setState({locations: locationList});
			})
		.catch((e) =>{
			this.setState({isError: true, errorMsg: e.toString()})
		})
	}
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({initialLong: position.coords.longitude, initialLat: position.coords.latitude});
      },
      (error) => null,
      {enableHighAccuracy: true, timeout: 20000}
    );
    this.fetchLocations();
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
        >
          {this.state.locations.map(location => {
            console.log(location);
            return (
            <MapView.Marker
              key={location.id} 
              coordinate={{latitude:location.lat, longitude:location.long}}
              title={location.address}
            >
              <MapView.Callout>
						  	<CalloutText stationId={location.id} address={location.address} bikes={location.bikes} dockings={location.dockings} />
              </MapView.Callout>
            </MapView.Marker>
          )})}
        </MapView>
        <Text style={styles.errorText}>{this.state.errorMsg}</Text>
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
  errorText: {
    color: 'red',
    fontSize: 30,
  }
});