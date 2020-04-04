import React, { createContext, useCallback, useState, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null
  })

  const login = async user => {
    const data = {
      isUserLoggedIn: true,
      user: user
    }
    setUserInfo(data)
    await AsyncStorage.setItem('userData', JSON.stringify(data))
  }

  const logout = () => {
    AsyncStorage.removeItem('userData').then(() => {
      setUserInfo({
        isUserLoggedIn: false,
        user: null
      })
    })
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        userInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
