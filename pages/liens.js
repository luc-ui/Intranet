import router from 'next/router'
import { useState, useEffect } from 'react'

import { allReq } from '../services/services'
import { AddLien, GetLiens } from '../components/pages.components/liens.conponents'

export default function Liens({ selectStrass }) {
	const [mounted, setMounted] = useState(false)
	const [alertOn, setAlert] = useState(false)

	useEffect(() => {
		if(alertOn) {
			setTimeout(() => {
				alert('Lien Supprimé !')
	      		setAlert(false)
				setMounted(false)
		    }, 100)
		}
	}, [alertOn])

	const authStrass = ["AE"]

	switch(router.query.action) {
		case 'new':
			if (authStrass.includes(selectStrass.cn)) {
				return <AddLien setMounted={setMounted}/>
			}
		case 'delete':
			if (authStrass.includes(selectStrass.cn) && router.query.id) {
				const id = router.query.id

				allReq("/liens", "DELETE", {id})
				.then((status) => {
					if (status == 200) {
						router.push('/liens')
						setAlert(true)
						setMounted(false)
					}
				})
			}
		default:
			return <GetLiens selectStrass={selectStrass} authStrass={authStrass} mounted={mounted} setMounted={setMounted}/>
	}
}