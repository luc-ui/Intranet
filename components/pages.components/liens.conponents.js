import { useState, useEffect } from 'react'
import Link from 'next/link'
import router from 'next/router'

import styles from '../../styles/pages/Liens.module.css'
import { getReq, allReq } from '../../services/services'

export function GetLiens({ selectStrass, authStrass, mounted, setMounted }) {
    const [liens, setLiens] = useState([])

	useEffect(() => {
		if (!mounted) {
			getReq("/liens")
			.then(data => {
				setLiens(data)
				setMounted(true)
			})
		}
	}, [mounted])

	return (
		<div className={styles.global}>
			<h3>Liens Utiles</h3>
			{
				authStrass.includes(selectStrass.cn) ?
				    <Link href={"/liens?action=new"} passHref><h4 className="boutonAjout">Ajouter un lien</h4></Link>
                :undefined
			}
			{
				liens.map((item) =>
					<section className={styles.section} key={item.title}>
						<div>
							<div className={styles.header}>
								<h4 className={styles.title}>{item.title}</h4>
							</div>
							<div className={styles.content}>
								<a href={item.link} rel="noopener">{item.link}</a>
							</div>
						</div>
						{
							authStrass.includes(selectStrass.cn) ?
                                <div className={styles.sectionEdit}>
                                    <Link href={"/liens?action=delete&id="+item.id} passHref><h4 className="boutonEdit">Supprimer</h4></Link>
                                </div>
                            :undefined
						}
					</section>
				)
			}
		</div>
	)
}

export function AddLien({ setMounted }) {
	const [title, setTitle] = useState()
	const [url, setUrl] = useState()

	const [alertOn, setAlert] = useState(false)

 	useEffect(() => {
		if(alertOn) {
			setTimeout(() => {
				alert('Lien Ajouté !')
	      		setAlert(false)
		    }, 100)
		}
	}, [alertOn])

	const handleSubmit = (e) => {
		e.preventDefault()
		allReq("/liens", "POST", {title, url})
		.then((status) => {
			if (status == 200) {
				router.push('/liens')
				setAlert(true)
				setMounted(false)
			}
		})
  	}

	return (
		<div className={styles.global}>
			<h3>Ajouter un lien</h3>
			<form onSubmit={handleSubmit}>
				<label>
					<p className="texte">Nom du lien</p>
					<input type="text" onChange={e => setTitle(e.target.value)} className="field" placeholder="Drive de birse" required/>
				</label>
				<label>
					<p className="texte">URL</p>
					<input type="text" onChange={e => setUrl(e.target.value)} className="field" placeholder="http://..." required/>
				</label>
				<div>
					<button type="submit" className="submit">Ajouter</button>
				</div>
			</form>
		</div>
	)
}