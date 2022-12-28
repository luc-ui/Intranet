import styles from '../styles/components/Publis.module.css'
import Formulaire from '../components/Formulaire'

import { getReq, allReq } from '../services/services'

import Link from 'next/link'
import router from 'next/router'
import { useState, useEffect } from 'react'

import 'suneditor/dist/css/suneditor.min.css'

export default function Publis({ type, name, authStrass, selectStrass }) {
	const [alertOn, setAlert] = useState(false)
	const [publis, setPublis] = useState([])

 	useEffect(() => {
		if(alertOn) {
			setTimeout(() => {
				alert('Contenu supprimé')
	      		setAlert(false)
		    }, 100)
		}
	}, [alertOn])

	useEffect(() => {
		getReq("/publis/type/"+type)
		.then(data => setPublis(data))
	}, [router.query.id, router.query.action])

	switch(router.query.action) {
		case 'add':
			if (authStrass.includes(selectStrass.cn)) {
				return <div className={styles.global}><Formulaire strass={selectStrass} type={type} name={name}/></div>
			}
		case 'modify':
			if (router.query.id && authStrass.includes(selectStrass.cn)) {
				return <div className={styles.global}><Formulaire id={router.query.id} type={type} name={name}/></div>
			}
		case 'delete':
			if (router.query.id && authStrass.includes(selectStrass.cn)) {
				const id = router.query.id

				allReq("/publis", "DELETE", {id})
				.then((status) => {
					if (status == 200) {
						router.push(router.asPath.split('?')[0])
						setAlert(true)
					}
				})
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
							<section className={styles.section} key={item.id}>
								<div className={styles.header}>
									<h4 className={styles.title}>{item.title}</h4>
									<p className={styles.strass}>{item.strassName}</p>
								</div>
								<div dangerouslySetInnerHTML={{__html: item.content}} className={styles.content}/>
								{
									(item.strass==selectStrass.cn || selectStrass.cn == "AE") ?
									<div className={styles.sectionEdit}>
										<Link href={router.asPath.split('?')[0]+"?action=modify&id="+item.id} passHref><h4 className="boutonEdit">Modifier</h4></Link>
										<Link href={router.asPath.split('?')[0]+"?action=delete&id="+item.id} passHref><h4 className="boutonEdit">Supprimer</h4></Link>
									</div> : undefined
								}
							</section>
						)
					}
				</div>
			)
	}
}