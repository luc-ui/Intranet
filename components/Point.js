import styles from '../styles/components/Login.module.css'

import Head from 'next/head'
import { getReq } from '../services/services'
import { useState, useEffect } from 'react'

export default function Point() {
    const [content, setContent] = useState('')


    useEffect(() => {
        getReq('/messages')
        .then(data => setContent(data[0].content))
    }, [])

	return (
		<div className={styles.loginWrapper}>
			<Head>
				<meta name="description" content="Boquette Intranet by Strass Infal" />
				<link rel="icon" href="/favicon.svg" />
				<title>Arts et Métiers - Boquette d&apos;Angers</title>
			</Head>
			<img src={"/img/logo_origine.png"} className={styles.AppLogo} alt="logo"/>
			<h1>Espace des Puntos</h1>
            <p>{content}</p>
		</div>
	)
}
