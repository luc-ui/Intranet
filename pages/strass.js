import styles from '../styles/pages/Strass.module.css'

import Link from 'next/link'
import router from 'next/router'
import { useState, useEffect } from 'react'

import { getReq } from '../services/services'
import Afficher from '../components/AffichagePubli'

export default function Strass() {
	const [strass, setStrass] = useState([])
	const [bouls, setBouls] = useState([])
	const [publis, setPublis] = useState([])
	
	useEffect(() => {
		if (router.query.id) {
			getReq("/strass/"+router.query.id)
			.then(data => setBouls(data))

			getReq("/publis/strass/"+router.query.id)
			.then(data => setPublis(data))
		} else {
			getReq("/strass")
			.then(data => setStrass(data))
		}
	}, [router.query.id])

	if (router.query.id) {
		return (
			<div className={styles.global}>
				{
					strass?.map((item) => 
						item.cn == router.query.id ?
							<h1 key={item.cn}>{item.description}</h1>
						: undefined
					)
				}
				{
					bouls?.map((item) =>
						<div key={item.cn} className={styles.membre}>
							{item.bouls+" : "+item.displayName+" ("+item.givenName+" "+item.sn+")"}
						</div>
					)
				}
				<h1>Publications de la strass</h1>
				{
					publis?.map((item) => <Afficher publi={item} key={item.id} /> )
				}
			</div>
		)
	} else {
		return (
			<div className={styles.global}>
				<h1>Strass de la Boquette</h1>
				<div className={styles.grid}>
					{
						strass?.map((item) =>
							<Link href={"/strass?id="+item.cn} key={item.cn} passHref>
								<div className={styles.card}>
									<h4 className={styles.title}>{item.description}</h4>
								</div>
							</Link>
						)
					}
				</div>
			</div>			
		)
	}
}