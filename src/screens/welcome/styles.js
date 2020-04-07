import { StyleSheet } from 'react-native'
import { colors } from '~/styles'

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
  },
  flag: {
    height: 40,
    width: 40
  },
  imageMarkerContainer: {
    maxHeight: 50
  },
  callout: {
    width: 260,
    height: 'auto'
  },
  markName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  markDescription: {
    color: colors.secondary,
    marginTop: 5
  },
  requestPermissionContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fs15: {
    fontSize: 15
  }
})
