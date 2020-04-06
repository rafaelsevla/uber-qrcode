import React, { useState, useEffect } from 'react'
import t from 'prop-types'
import { Text, View, Image, Alert, StatusBar } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Geolocation from '@react-native-community/geolocation'
import MapView, { Marker, Callout } from 'react-native-maps'

import { useAuth } from '~/hooks'
import client from '~/client'
import { API } from '~/routes'
import { translate } from '~/locales'
import Flag from '~/assets/icons/marker_flag.png'
import styles from './styles'

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
            title={translate('flagLocation')}
            coordinate={{
              latitude: currentRegion.latitude,
              longitude: currentRegion.longitude
            }}
          >
            <Image source={Flag} style={styles.flag} />
          </Marker>
          {markers.map(marker => {
            return (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude
                }}
              >
                <Callout>
                  <View style={styles.callout}>
                    <Text style={styles.markName}>{marker.name}</Text>
                    <Text style={styles.markDescription}>
                      {marker.description}
                    </Text>
                  </View>
                </Callout>
              </Marker>
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
