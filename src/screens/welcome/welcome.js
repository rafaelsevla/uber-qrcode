import React from 'react'
import t from 'prop-types'
import { Text, View, Image, Alert, StatusBar } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage'
import MapView from 'react-native-maps'
import { useAuth } from '~/hooks'

function Welcome(props) {
  const {
    navigation: { navigate }
  } = props

  return (
    <View style={styles.root}>
      <StatusBar hidden />
      <MapView
        style={styles.mapView}
        loadingEnabled={true}
        initialRegion={{
          latitude: -21.7928248,
          longitude: -48.1697339,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        }}
      />
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.containerStyle}
          icon={<Icon name="qrcode" size={40} color="white" />}
        />
      </View>
    </View>
  )
}

Welcome.propTypes = {
  navigation: t.object.isRequired
}

export default Welcome
