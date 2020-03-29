import React, { createContext, useCallback, useState, useContext } from 'react'

const AuthContext = createContext()

function AuthProvider ({ children }) {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null
  })

  function login (isUserLoggedIn, user) {
    setUserInfo({
      isUserLoggedIn,
      user
    })
  }

  function logout () {
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