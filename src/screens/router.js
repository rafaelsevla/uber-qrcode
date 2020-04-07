import React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Button } from 'react-native-elements'
import { StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { useAuth } from '~/hooks'
import { colors } from '~/styles'
import { translate } from '~/locales'

import Login from './login'
import Welcome from './welcome'
import ReaderQRCode from './readerQRCode'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

function HomeStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="QRCodeReader" component={ReaderQRCode} />
    </Stack.Navigator>
  )
}

const Logout = () => {
  const { logout } = useAuth()
  React.useEffect(() => {
    logout()
  }, [logout])
  return <View />
}

function Router() {
  const { userInfo } = useAuth()

  if (userInfo.isUserLoggedIn) {
    return (
      <NavigationContainer>
        <StatusBar
          backgroundColor={colors.primary}
          translucent
          barStyle="light-content"
        />
        <Drawer.Navigator initialRouteName="HomeStack" drawerIcon>
          <Stack.Screen
            name={translate('initialScreenName')}
            component={HomeStack}
          />
          <Drawer.Screen name="Logout" component={Logout} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={colors.primary}
        translucent
        barStyle="light-content"
      />
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login',
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerTintColor: colors.light
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router
