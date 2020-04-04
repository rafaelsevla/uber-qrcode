import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import Router from './src/screens'
import { View } from 'react-native'
import { AuthProvider } from '~/contexts'
import AsyncStorage from '@react-native-community/async-storage'
import { useAuth } from '~/hooks'

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
  </AuthProvider>
)

export default App
