import { useState, useEffect } from 'react'
import Link from 'next/link'
import router from 'next/router'

import styles from '../../styles/pages/Calendar.module.css'
import { getReq, allReq } from '../../services/services'

var jours = ['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE']

export function GetSports({ selectStrass, authStrass, mounted, setMounted }) {
    const [sports, setSports] = useState([])
	const [alertOn, setAlert] = useState(false)

	useEffect(() => {
		if(alertOn) {
			setTimeout(() => {
				alert('Horaire supprimée !')
	      		setAlert(false)
	    }, 100)
	  }
	}, [alertOn])

	useEffect(() => {
		if (!mounted) {
			getReq("/calendar/UAI")
			.then(data => {
				setSports(data)
				setMounted(true)
			})
		}
	}, [mounted])

	const handleDelete = (id) => {
		allReq("/calendar", "DELETE", {id})
		.then((status) => {
			if (status == 200) {
				setAlert(true)
				setMounted(false)
			}
		})
	}

	return (
		<div className={styles.global}>
			<h1>Calendrier de l&apos;UAI</h1>
			{
				authStrass.includes(selectStrass.cn) ?
				    <Link href={"/calendar?action=new"} passHref><h4 className="boutonAjout">Ajouter un Horaire</h4></Link>
                :undefined
			}
			<div className={styles.grid}>
				{
					jours.map(item =>
						<section className={styles.section} key={item}>
							<div className={styles.header}>
								<h4 className={styles.title}>{item}</h4>
							</div>
							{
								sports.map((sport, index) =>
									sport.jour == item ?
										<div className={styles.sport} key={index}>
											<h4 className={styles.texte}>{sport.title} - {sport.hours}</h4>
											<p className={styles.texte}>{sport.infos}</p>
											{
												authStrass.includes(selectStrass.cn) ?
													<button onClick={() => handleDelete(sport.id)}><h4 className="boutonEdit">Supprimer</h4></button>
												:undefined
											}
										</div>
									:undefined
								)
							}
						</section>
					)
				}
			</div>
		</div>
	)
}

export function AddSport({ setMounted }) {
	const [title, setTitle] = useState()
	const [jour, setJour] = useState('LUNDI')
    const [hours, setHours] = useState()
	const [infos, setInfos] = useState()

	const [alertOn, setAlert] = useState(false)

 	useEffect(() => {
		if(alertOn) {
			setTimeout(() => {
				alert('Horaire Ajoutée !')
	      		setAlert(false)
		    }, 100)
		}
	}, [alertOn])

	const handleSubmit = (e) => {
		e.preventDefault()
		allReq("/calendar", "POST", {title, jour, hours, infos})
		.then((status) => {
			if (status == 200) {
				router.push('/calendar')
				setAlert(true)
				setMounted(false)
			}
		})
  	}

	return (
		<div className={styles.global}>
			<h3>Ajouter un Horaire</h3>
			<form onSubmit={handleSubmit}>
				<label>
					<p className="texte">Sport</p>
					<input type="text" onChange={e => setTitle(e.target.value)} className="field" placeholder="Pitate" required/>
				</label>
                <label>
					<p className="texte">Sélection du jour</p>
                    <select className={styles.selection} onChange={e => setJour(e.target.value)}>
                        {
                            jours.map((item) => 
                                <option value={item} key={item}>
                                    {item}
                                </option>
                            )
                        }
                    </select>
                </label>
                <label>
					<p className="texte">Horaires</p>
					<input type="text" onChange={e => setHours(e.target.value)} className="field" placeholder="18h - 20h" required/>
				</label>
                <label>
					<p className="texte">Infos Supplémentaires</p>
					<input type="text" onChange={e => setInfos(e.target.value)} className="field" placeholder="Gymnase / Zident / ..."/>
				</label>
				<div>
					<button type="submit" className="submit">Ajouter</button>
				</div>
			</form>
		</div>
	)
}