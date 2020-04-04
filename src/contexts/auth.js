import React, { createContext, useCallback, useState, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null
  })

  async function login(isUserLoggedIn, user) {
    const data = { isUserLoggedIn, user }
    setUserInfo(data)
    await AsyncStorage.setItem('userData', JSON.stringfy({ data }))
  }

  function logout() {
    setUserInfo({
      isUserLoggedIn: false,
      user: null
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
