import React from 'react'
import Login from './login'
import Welcome from './welcome'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Button } from 'react-native-elements'
import { StatusBar } from 'react-native'
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
        headerStyle: {
          backgroundColor: '#4388D6'
        },
        headerTintColor: '#fff',
        headerLeft: () => (
          <Button
            type="clear"
            icon={<Icon name="bars" size={30} color="black" />}
            onPress={() => navigation.toggleDrawer()}
          />
        )
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  )
}

const Logout = () => {
  const { logout } = useAuth()
  React.useEffect(() => {
    logout()
  }, [])
  return <View />
}

function Router() {
  const { userInfo } = useAuth()

  if (userInfo.isUserLoggedIn) {
    return (
      <NavigationContainer>
        <StatusBar
          backgroundColor="#4388D6"
          translucent
          barStyle="light-content"
        />
        <Drawer.Navigator initialRouteName="HomeStack" drawerIcon>
          <Drawer.Screen
            options={{ drawerLabel: () => null }}
            name="HomeStack"
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
        backgroundColor="#4388D6"
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
              backgroundColor: '#4388D6'
            },
            headerTintColor: '#fff'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router
