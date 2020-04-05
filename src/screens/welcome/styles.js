import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  buttonStyle: {
    borderRadius: 50,
    width: 70,
    height: 70
  },
  containerStyle: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})
