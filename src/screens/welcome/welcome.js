import React from 'react'
import t from 'prop-types'
import { Text, View, Image, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import { translate } from '~/locales'

function Welcome(props) {
  const {
    navigation: { navigate }
  } = props

  return (
    <View style={{ height: 200 }}>
      <View>
        <Button onPress={() => navigate('Login')} title={translate('hello')} />
      </View>
    </View>
  )
}

Welcome.propTypes = {
  navigation: t.object.isRequired
}

export default Welcome
