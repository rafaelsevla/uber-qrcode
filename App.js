import 'react-native-gesture-handler'
import * as React from 'react'
import Router from './src/screens'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/store'
import { View, Text } from 'react-native'
import { Provider } from 'react-redux'

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider>
)

export default App
