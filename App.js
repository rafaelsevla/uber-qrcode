import * as React from 'react'
import { createAppContainer } from 'react-navigation'
import Router from './src/screens'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/store'
import { Provider } from 'react-redux'

const App = createAppContainer(Router)

const AppWithStore = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)

export default AppWithStore
