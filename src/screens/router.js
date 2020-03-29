import React from 'react'
import Login from './login'
import Welcome from './welcome'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useAuth } from '~/hooks'

const Stack = createStackNavigator()

const Drawer = createDrawerNavigator()

function HomeStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerTransparent: true,
        title: '',
        headerLeft: () => (
          <Button
            type="clear"
            icon={<Icon name="bars" size={30} color="black" />}
            onPress={() => navigation.toggleDrawer()}
          />
        )
      }}>
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  )
}

export default function Router() {
  const { userInfo } = useAuth()
  console.log('entrou aqui')
  if (userInfo.isUserLoggedIn) {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="HomeStack" drawerIcon>
          <Drawer.Screen name="HomeStack" component={HomeStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
