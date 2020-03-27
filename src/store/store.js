import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../screens/reducers'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

const persistConfig = {
  timeout: 10000,
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const logger = () =>
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : x => x

const enhancer = compose(applyMiddleware(thunk), logger())

export const store = createStore(persistedReducer, {}, enhancer)
export const persistor = persistStore(store)
