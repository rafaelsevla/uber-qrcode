import React, { useState, useEffect } from 'react'
import t from 'prop-types'
import { Text, View, Image, Alert, StatusBar } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import Geolocation from '@react-native-community/geolocation'
import MapView, { Marker } from 'react-native-maps'
import { useAuth } from '~/hooks'
import Flag from '~/assets/icons/marker_flag.png'

import client from '~/client'
import { API } from '~/routes'

function Welcome({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null)
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: null,
      headerLeft: () => (
        <Button
          type="clear"
          icon={<Icon name="bars" size={30} color="black" />}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }, [navigation])

  useEffect(() => {
    client
      .get(API.MARKERS)
      .then(response => setMarkers(response.data))
      .catch(e => alert(e.message))
  }, [markers])

  useEffect(() => {
    Geolocation.getCurrentPosition(coords => {
      setCurrentRegion(coords.coords)
    })
  }, [])

  const onPressQRCodeButton = e => {
    navigation.navigate('QRCodeReader')
  }

  return (
    <View style={styles.root}>
      <StatusBar hidden />
      {currentRegion && (
        <MapView
          style={styles.mapView}
          loadingEnabled
          initialRegion={{
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
          }}
        >
          <Marker
            coordinate={{
              latitude: currentRegion.latitude,
              longitude: currentRegion.longitude
            }}
          >
            <Image source={Flag} style={{ height: 40, width: 40 }} />
          </Marker>
          {markers.map(marker => {
            return (
              <Marker
                key={marker.id}
                title={marker.id}
                description={'aqui um detalhamento teste so pra testar'}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude
                }}
              />
            )
          })}
        </MapView>
      )}
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.containerStyle}
          icon={<Icon name="qrcode" size={40} color="white" />}
          onPress={onPressQRCodeButton}
        />
      </View>
    </View>
  )
}

Welcome.propTypes = {
  navigation: t.object.isRequired
}

export default Welcome
