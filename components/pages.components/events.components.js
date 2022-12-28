import { useEffect, useState } from "react"
import Link from 'next/link'
import router from 'next/router'

import styles from '../../styles/pages/Events.module.css'
import { getReq, allReq } from '../../services/services'

export function GetEvents({ selectStrass, authStrass, mounted, setMounted }) {
	const [eventList, setEventList] = useState([])

    useEffect(() => {
		if (!mounted) {
			getReq("/events")
			.then(data => {
				setEventList(data)
				setMounted(true)
			})
		}
	}, [mounted])

    return (
        <div className={styles.global}>
            <h1>Evènements</h1>
            {
                authStrass.includes(selectStrass.cn) ?
                    <Link href="/events?action=new" passHref><h4 className="boutonAjout">Ajouter un événement</h4></Link>
                :undefined
            }
            <div className={styles.grid}>
                {
                    eventList?.map((item) =>
                        <Link href={"/events/"+item.useName} key={item.useName} passHref>
                            <div className={styles.card}>
                                <h4>{item.title}</h4>
                                {
                                    authStrass.includes(selectStrass.cn) ?
                                        <Link href={"/events?action=delete&id="+item.useName} passHref><h4 className="boutonEdit">Supprimer</h4></Link>
                                    :undefined
                                }
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}

export function AddEvent({ setMounted }) {
    const [title, setTitle] = useState()
	const [useName, setUseName] = useState()
	const [strass, setStrass] = useState()

    const [strassList, setStrassList] = useState([])

    const [alertOn, setAlert] = useState(false)

    useEffect(() => {
        if(alertOn) {
            setTimeout(() => {
                alert('Evènement Ajouté !')
                    setAlert(false)
            }, 100)
        }
    }, [alertOn])
    
    useEffect(() => {
        getReq("/strass")
        .then(data => setStrassList(data))
    }, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		allReq("/events", "POST", {title, useName, strass})
		.then((status) => {
			if (status == 200) {
				router.push('/events')
				setAlert(true)
				setMounted(false)
			}
		})
  	}

    return (
        <div className={styles.global}>
            <h3>Ajouter un nouvel évènement</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <p className="texte">Titre de l&apos;événement</p>
                    <input type="text" onChange={e => setTitle(e.target.value)} className="field" placeholder="Délivrance" required/>
                </label>
                <label>
                    <p className="texte">Nom d&apos;usage</p>
                    <input type="text" onChange={e => setUseName(e.target.value)} className="field" placeholder="delivrance" required/>
                </label>
                <label>
                    <p className="texte">Strass autorisée à éditer</p>
                    <select className={styles.selection} onChange={e => setStrass(e.target.value)}>
                        {
                            strassList?.map((item) => 
                                <option value={item.cn} key={item.cn}>
                                    {item.description}
                                </option>
                            )
                        }
					</select>
                </label>
                <div>
                    <button type="submit" className="submit">Créer</button>
                </div>
            </form>
        </div>
    )
}