import router from 'next/router'
import styles from '../styles/pages/Cvis.module.css'

import { AddCvis, GetCvis, ModifyCvis } from '../components/pages.components/cvis.components'

import { allReq } from '../services/services'
import { useEffect, useState } from 'react'

export default function Cvis({ selectStrass }) {
	const [mounted, setMounted] = useState(false)
	const [alertOn, setAlert] = useState(false)

	useEffect(() => {
		if(alertOn) {
			setTimeout(() => {
				alert('Article Supprimé !')
	      		setAlert(false)
				setMounted(false)
		    }, 100)
		}
	}, [alertOn])

	const authStrass = ['AE', 'cvis']

	if (authStrass.includes(selectStrass.cn) && router.query.action) {
		switch (router.query.action) {
			case 'new':
				return <AddCvis setMounted={setMounted}/>
			case 'modify':
				if (router.query.id) {
					return <ModifyCvis setMounted={setMounted}/>
				}
			case 'delete':
				if (router.query.id) {
					const id = router.query.id
	
					allReq("/cvis", "DELETE", {id})
					.then((status) => {
						if (status == 200) {
							router.push('/cvis')
							setAlert(true)
							setMounted(false)
						}
					})
				}
		}
	} else {
		return <GetCvis authStrass={authStrass} selectStrass={selectStrass} mounted={mounted} setMounted={setMounted}/>
	}
	
}