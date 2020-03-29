import 'react-native-gesture-handler'
import React from 'react'
import Router from './src/screens'
import { View, Text } from 'react-native'
import { AuthProvider } from '~/contexts'

const App = () => (
  <AuthProvider>
    <Router />
  </AuthProvider>
)

export default App
