import '../styles/globals.css'

import Layout from '../components/Layout'
import Login from '../components/Login'
import Point from '../components/Point'
import Reset from '../components/Reset'
import useToken from '../components/useToken'

import {registerServiceWorker, subscribeUserToPush} from '../services/webpush'

import { useState, useEffect } from 'react'
import Router from 'next/router'
import ErrorPage from 'next/error'

export default function App({ Component, pageProps }) {
	const [showing, setShowing] = useState(false)
	const [selectStrass, setStrass] = useState({
		description: "Utilisateur",
		cn: "user"
	})
	const { token, setToken } = useToken()
	const [point, setPoint] = useState(true)

	useEffect(() => {
		setShowing(true)
		setPoint(localStorage.getItem('point'))
	}, [])

	if (!showing || typeof window === 'undefined') {
		return null
	}

	const router = Router.useRouter();
	
	if (!token){
		if (router.asPath == '/reset') {
			return <Reset {...pageProps} />
		}
		else {
			return <Login {...pageProps} setToken={setToken} setPoint={setPoint} />
		}
	}
	if (point) {
		return <Point {...pageProps} />
	}

	// Gestion des service-workers -> pour les notifications

	if ('serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window && Notification.permission !== 'granted') {
		subscribeUserToPush(registerServiceWorker())
	}

	return (
		<Layout setStrass={setStrass} selectStrass={selectStrass} >
			<Component {...pageProps} selectStrass={selectStrass}/>
		</Layout>
	)
}
