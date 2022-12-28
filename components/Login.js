import styles from '../styles/components/Login.module.css'

import { useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

export default function Login({setToken, setPoint}) {
	const [username, setUserName] = useState();
 	const [password, setPassword] = useState();
	const [erreur, setErreur] = useState(false);

 	const handleSubmit = async e => {
	    e.preventDefault()
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
			if (data.xsrfToken) {
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
				<meta name="description" content="Boquette.fr, et la Boquette prend vie" />
				<link rel="icon" href="/favicon.svg" />
				<title>A&M Boquette - Connexion</title>
			</Head>
			<img src={"/img/a&m.svg"} className={styles.AppLogo} alt="logo"/>

			<div className={styles.AppInscrip}>
				{
					erreur ?
					<div className={styles.AppInscripErreur}>Hum ? Vos identifiants ne semblent pas fonctionner...</div>
					:
					undefined
				}
				<form onSubmit={handleSubmit}>
					<div className={styles.AppInscripdivinput}>
						<input name="uder" className={styles.AppInscripinput} type="text" onChange={e => setUserName(e.target.value)} required/>
						<label for="user" className={styles.AppInscriplabel}>Nom d&apos;utilisateur</label>
					</div>
					<div className={styles.AppInscripdivinput}>
						<input name="mdp" className={styles.AppInscripinput} type="password" onChange={e => setPassword(e.target.value)} required/>
						<label for="mdp" className={styles.AppInscriplabel}>Mot de passe</label>
					</div>
					<div className={styles.AppInscripdivbutton}>
						<button type="submit" className={styles.AppInscripbutton}>Connexion</button>
						<a className={styles.AppInscrippwdforget} href="#">Mot de passe oublié ?</a>
					</div>
			   </form>
			   
		   </div>
		   <a className={styles.AppInscripdivlinklink} href="https://cloud.boquette.fr">GadzCloud</a>  
		</div>
		
	);
}

Login.propTypes = {
	setToken: PropTypes.func.isRequired
}
