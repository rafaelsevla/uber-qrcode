import { StyleSheet } from 'react-native'
import { colors } from '~/styles'

export default StyleSheet.create({
  formContainer: {
    paddingTop: 0,
    paddingHorizontal: 10,
    paddingBottom: 20,
    margin: 10,
    borderRadius: 10
  },
  inputContainer: {
    marginVertical: 20,
    backgroundColor: colors.light,
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderRadius: 5
  },
  inputBlock: {
    marginBottom: 20
  },
  error: {
    color: colors.danger
  }
})
