import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'

const CalloutText = (props) => {
	return (
		<View>
      <Text>Station: {props.stationId}</Text>
      <Text>Address: {props.address}</Text>
      <Text>Bikes: {props.bikes}</Text>
      <Text>Dockings: {props.dockings}</Text>
		</View>
	)
}

CalloutText.propTypes = {
	stationId: PropTypes.number.isRequired,
	address: PropTypes.string.isRequired,
  bikes: PropTypes.number.isRequired,
	dockings: PropTypes.number.isRequired,
};

export default CalloutText;