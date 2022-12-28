import styles from '../styles/components/Publis.module.css'
import Formulaire from './Formulaire'

import { getReq, allReq } from '../services/services'

import Link from 'next/link'
import router from 'next/router'
import { useState, useEffect } from 'react'

import 'suneditor/dist/css/suneditor.min.css'
import Afficher from './AffichagePubli'

export default function Publis({ type, name, authStrass, selectStrass }) {
	const [alertOn, setAlert] = useState(false)
	const [publis, setPublis] = useState([])
	const [mounted, setMounted] = useState(false)

 	useEffect(() => {
		if(alertOn) {
			setTimeout(() => {
				alert('Contenu supprimé')
	      		setAlert(false)
		    }, 100)
		}
	}, [alertOn])

	useEffect(() => {
		if (!mounted) {
			getReq("/publis/type/"+type)
			.then(data => {
				setPublis(data)
				setMounted(true)
			})
		}
	}, [mounted])

	const handleDelete = (id) => {
		allReq("/publis", "DELETE", {id})
		.then((status) => {
			if (status == 200) {
				setMounted(false)
				setAlert(true)
			}
		})
	}

	switch(router.query.action) {
		case 'add':
			if (authStrass.includes(selectStrass.cn)) {
				return <div className={styles.global}><Formulaire strass={selectStrass} type={type} name={name} setPublisMounted={setMounted} /></div>
			}
		case 'modify':
			if (router.query.id && authStrass.includes(selectStrass.cn)) {
				return <div className={styles.global}><Formulaire id={router.query.id} type={type} name={name} setPublisMounted={setMounted} /></div>
			}
		default:
			return (
				<div className={styles.global}>
					<h1>{name}</h1>
					{
						authStrass.includes(selectStrass.cn) ?
						<Link href={router.asPath.split('?')[0]+"?action=add"} passHref><h4 className="boutonAjout">Ajouter une publication</h4></Link> : undefined
					}
					{
						publis?.map((item) =>
							<Afficher publi={item} key={item.id}>
								{
									(item.strass==selectStrass.cn || selectStrass.cn == "AE") ?
									<div className={styles.sectionEdit}>
										<Link href={router.asPath.split('?')[0]+"?action=modify&id="+item.id} passHref><h4 className="boutonEdit">Modifier</h4></Link>
										<button onClick={() => handleDelete(item.id)}><h4 className="boutonEdit">Supprimer</h4></button>
									</div> : undefined
								}
							</Afficher>
						)
					}
				</div>
			)
	}
}