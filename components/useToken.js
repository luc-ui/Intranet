import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    if(typeof window !== "undefined") {
      const tokenString = localStorage.getItem('token')
      if (tokenString !== "undefined") {
        const userToken = JSON.parse(tokenString)
        return userToken
      }
    }
    return undefined
  }

  const [token, setToken] = useState(getToken())

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken))
    setToken(userToken)
  }

  return {
    setToken: saveToken,
    token
  }
}