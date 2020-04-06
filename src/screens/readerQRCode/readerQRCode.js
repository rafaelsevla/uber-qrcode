import React, { useEffect } from 'react'
import { View } from 'react-native'
import t from 'prop-types'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { showMessage } from 'react-native-flash-message'

import client from '~/client'
import { API } from '~/routes'
import { colors } from '~/styles'
import styles from './styles'

function ReaderQRCode({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: null,
      headerLeft: () => (
        <Button
          type="clear"
          icon={<Icon name="arrow-left" size={30} color="white" />}
          onPress={() => navigation.goBack()}
        />
      )
    })
  }, [navigation])

  const onSuccess = ({ data }) => {
    client
      .post(API.QRCODE_DATA, { text: data })
      .then(() => {
        showMessage({
          message: 'Texto enviado!',
          type: 'default',
          backgroundColor: colors.success
        })
        navigation.goBack()
      })
      .catch(e => {
        alert(e.message)
      })
  }

  return (
    <View style={styles.root}>
      <QRCodeScanner
        onRead={onSuccess}
        showMarker
        checkAndroid6Permissions={true}
      />
    </View>
  )
}

ReaderQRCode.propTypes = {
  navigation: t.object.isRequired
}

export default ReaderQRCode
