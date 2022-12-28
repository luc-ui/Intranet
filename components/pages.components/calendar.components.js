import { useState, useEffect } from 'react'
import Link from 'next/link'
import router from 'next/router'

import styles from '../../styles/pages/Calendar.module.css'
import { getReq, allReq } from '../../services/services'

var jours = ['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE']

export function GetSports({ selectStrass, authStrass, mounted, setMounted, toggleCalendar, setToggleCalendar}) {
    const [sports, setSports] = useState([])

	useEffect(() => {
		if (!mounted) {
			getReq("/calendar/UAI")
			.then(data => {
				setSports(data)
				setMounted(true)
			})
		}
	}, [mounted])

	return (
		<div className={styles.global}>
			<h1>Calendrier de l&apos;UAI</h1>
            <button onClick={() => setToggleCalendar(!toggleCalendar)}><h4 className="boutonAjout">Voir le Calendrier Boquette</h4></button>
			{
				authStrass.includes(selectStrass.cn) ?
				    <Link href={"/calendar?action=new"} passHref><h4 className="boutonAjout">Ajouter un Horaire</h4></Link>
                :undefined
			}
			<table className={styles.calendarUAI}>
				<thead>
					<tr className={styles.semaineHeader}>
						<th className={styles.header}>Lundi</th>
						<th className={styles.header}>Mardi</th>
						<th className={styles.header}>Mercredi</th>
						<th className={styles.header}>Jeudi</th>
						<th className={styles.header}>Vendredi</th>
						<th className={styles.header}>Samedi</th>
						<th className={styles.header}>Dimanche</th>
					</tr>
				</thead>
				<tbody>
					<tr className={styles.semaineBody}>
						{
							jours.map(item =>
								<td className={styles.jour} key={item}>
									{
										sports.map(sport =>
											sport.jour == item ?
												<div className={styles.sport}>
													<h4 className={styles.texte}>{sport.title}</h4>
													<p className={styles.texte}>{sport.hours}</p>
													<p className={styles.texte}>{sport.infos}</p>
													{
														authStrass.includes(selectStrass.cn) ?
															<Link href={"/calendar?action=delete&id="+sport.id} passHref><h4 className="boutonEdit">Supprimer</h4></Link>
														:undefined
													}
												</div>
											:undefined
										)
									}
								</td>
							)
						}
					</tr>
				</tbody>
			</table>
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