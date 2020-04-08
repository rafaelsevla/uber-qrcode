import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  Image,
  Alert,
  StatusBar,
  Platform,
  TouchableOpacity
} from 'react-native'
import { PERMISSIONS, request } from 'react-native-permissions'
import t from 'prop-types'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Geolocation from 'react-native-geolocation-service'
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

  const getCurrentPosition = () =>
    Geolocation.getCurrentPosition(
      position => {
        setCurrentRegion(position.coords)
      },
      error => {
        alert(error.message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )

  const requestLocationPermission = () => {
    try {
      request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        })
      )
        .then(result => {
          if (result === 'granted') {
            getCurrentPosition()
          }
        })
        .catch(e => {
          console.log(e)
        })
    } catch (err) {
      console.warn(err)
    }
  }

  const renderMessageToRequestPermissionOS = () => {
    if (Platform.OS === 'android')
      return (
        <TouchableOpacity onPress={requestLocationPermission}>
          <Text style={styles.fs15}>
            {translate(`allowMap_${Platform.OS}`)}
          </Text>
        </TouchableOpacity>
      )

    return (
      <Text style={styles.fs15}>{translate(`allowMap_${Platform.OS}`)}</Text>
    )
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission()
    } else {
      getCurrentPosition()
    }
  }, [])

  const onPressQRCodeButton = e => {
    navigation.navigate('QRCodeReader')
  }

  return (
    <View style={styles.root}>
      <StatusBar hidden />
      {currentRegion ? (
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
      ) : (
        <View style={styles.requestPermissionContainer}>
          <Text>{translate('mapDenied')}</Text>
          {renderMessageToRequestPermissionOS()}
        </View>
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
