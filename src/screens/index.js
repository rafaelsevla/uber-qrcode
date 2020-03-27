import Login from './login'
import Welcome from './welcome'
import { createStackNavigator } from 'react-navigation-stack'

export default createStackNavigator(
  {
    Welcome,
    Login: {
      screen: Login
    }
  },
  {
    initialRouteName: 'Welcome',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#7a297a'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
)
