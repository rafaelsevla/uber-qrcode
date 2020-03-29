import React, { useEffect } from 'react'
import t from 'prop-types'
import { Text, View, Image, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import { translate } from '~/locales'
import MapView from 'react-native-maps'

async function requestMapPermission() {
  try {
    const granted = await AndroidPermissions.requestPermission(
      AndroidPermissions.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.'
      }
    )
    if (granted) {
      console.log('You can use the camera')
    } else {
      console.log('Camera permission denied')
    }
  } catch (err) {
    console.warn(err)
  }
}

function Welcome(props) {
  const {
    navigation: { navigate }
  } = props

  useEffect(() => {
    requestMapPermission()
  }, [])

  return (
    <View
      style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
      <MapView
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        loadingEnabled={true}
        initialRegion={{
          latitude: -21.7928248,
          longitude: -48.1697339,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        }}
      />
    </View>
  )
}

Welcome.propTypes = {
  navigation: t.object.isRequired
}

export default Welcome
