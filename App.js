import React, { useEffect } from 'react'
import { View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import Router from './src/screens'
import { AuthProvider } from '~/contexts'
import AsyncStorage from '@react-native-community/async-storage'
import FlashMessage from 'react-native-flash-message'
import { useAuth } from '~/hooks'
import 'react-native-gesture-handler'

console.disableYellowBox = true

function CheckUserIsLogged() {
  const { userInfo, login } = useAuth()

  useEffect(() => {
    const checkUserIsLogged = async () => {
      let value = await AsyncStorage.getItem('userData')
      value = JSON.parse(value)
      try {
        if (value !== null && userInfo.isUserLoggedIn === false) {
          login(value.user)
        }
        SplashScreen.hide()
      } catch (e) {
        SplashScreen.hide()
      }
    }
    checkUserIsLogged()
  }, [login])

  return <View />
}

const App = () => (
  <AuthProvider>
    <CheckUserIsLogged />
    <Router />
    <FlashMessage />
  </AuthProvider>
)

export default App
