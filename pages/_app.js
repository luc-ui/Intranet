import '../styles/globals.css'

import Layout from '../components/Layout'
import Login from '../components/Login'
import useToken from '../components/useToken'

import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const [showing, setShowing] = useState(false)
  const [selectStrass, setStrass] = useState({
    description: "Utilisate",
    cn: "user"
  })
  const { token, setToken } = useToken()

  useEffect(() => {
    setShowing(true)
  }, [])

  if (!showing || typeof window === 'undefined') {
    return null
  }

  if (token) {
    return <Login {...pageProps} setToken={setToken}/>
  }

  return (
    <Layout setStrass={setStrass}>
      <Component {...pageProps} selectStrass={selectStrass}/>
    </Layout>
  )
}




