import styles from '../styles/components/Login.module.css'

import { useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

export default function Reset() {
	const [username, setUserName] = useState()
	const [erreur, setErreur] = useState(false)
    const [envoi, setEnvoi] = useState(false)

 	const handleSubmit = async e => {
	    e.preventDefault()
        setEnvoi(true)
		fetch(process.env.NEXT_PUBLIC_API_URL+'/auth', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			  'Access-Control-Allow-Origin': '*',   
			  'Access-Control-Allow-Credentials': 'true'
			},
			body: JSON.stringify({username, password}),
			credentials: 'include'
		})
		.then(res => {
			if (res.status == 200) {
				return res.json()
			} else {
				setErreur(true)
			}
		})
		.then(data => {
			if (data?.xsrfToken) {
				setErreur(false)
				setToken(data.xsrfToken)
			} else {
				setErreur(true)
			}

			if (data?.point) {
				localStorage.setItem('point', data.point)
				setPoint(data.point)
			}
		})
 	}

	return (
		<div className={styles.loginWrapper}>
			<Head>
				<meta name="description" content="Boquette Intranet by Strass Infal" />
				<link rel="icon" href="/favicon.svg" />
				<title>Arts et Métiers - Boquette d&apos;Angers</title>
			</Head>
			{
				erreur ?
				<p className="field">Hum ? Vos identifiants ne semblent pas fonctionner...</p>
				:
				undefined
			}
            {
            !envoi ?
                <form onSubmit={handleSubmit}>
                    <label>
                        <p className="texte">Nom d&apos;utilisateur</p>
                        <input type="text" onChange={e => setUserName(e.target.value)} className="field" required/>
                    </label>
                    <div>
                        <button type="submit" className="submit">Réinitialiser</button>
                    </div>
                </form>
            :
                <h1>Vous avez reçu une demande par mail ...</h1>
            }
		</div>
	)
}
