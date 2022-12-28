import router from 'next/router'
import { useEffect, useState } from 'react'

import Publis from '../../components/Publis.js'
import { getReq } from '../../services/services.js'

export default function Event({ selectStrass }) {
	const useName = router.asPath.substring(8).split('?')[0]
	const [authStrass, setAuthStrass] = useState(['AE','cvis'])
	const [event, setEvent] = useState([])

	useEffect(() => {
		if (useName != '[event]') {
			getReq('/events/'+useName)
			.then((data) => {
				setEvent(data)
				setAuthStrass(["AE", data.strass])
			})
		}
	}, [useName])

	return <Publis type={useName} name={event.title} authStrass={authStrass} selectStrass={selectStrass}/>
}
