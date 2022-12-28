import { useState, useEffect } from 'react'
import router from 'next/router'

import { AddEvent, GetEvents } from '../components/pages.components/events.components'
import { allReq } from '../services/services'

export default function Events({ selectStrass }) {
	const [mounted, setMounted] = useState(false)
	const [alertOn, setAlert] = useState(false)

	useEffect(() => {
		if(alertOn) {
			setTimeout(() => {
				alert('Evènement supprimé !')
	      		setAlert(false)
	    }, 100)
	  }
	}, [alertOn])

	const authStrass = ["AE"]

	switch (router.query.action) {
		case 'new':
			if (authStrass.includes(selectStrass.cn)) {
				return <AddEvent setMounted={setMounted}/>
			}
		case 'delete':
			if (authStrass.includes(selectStrass.cn) && router.query.id) {
				const useName = router.query.id

				allReq("/events", "DELETE", {useName})
				.then((status) => {
					if (status == 200) {
						router.push('/events')
						setAlert(true)
						setMounted(false)
					}
				})
			}
		default:
			return <GetEvents selectStrass={selectStrass} authStrass={authStrass} mounted={mounted} setMounted={setMounted}/>
	}
}