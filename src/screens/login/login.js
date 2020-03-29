import React from 'react'
import { StatusBar, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { useAuth } from '~/hooks'

export default function Login() {
  const { userInfo, login } = useAuth()
  console.log(userInfo)
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Button
        onPress={() => login(true, {name: 'rafael costa', email: 'rafaelsevla@gmail.com' })}
        title="logar"
      />
    </>
  )
}
