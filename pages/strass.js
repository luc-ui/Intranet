import styles from '../styles/pages/Strass.module.css'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import router from 'next/router'

import { getReq } from '../services/services'

export default function Strass() {
	const [strass, setStrass] = useState([])
	const [bouls, setBouls] = useState([])
	const [publis, setPublis] = useState([])
	
	const [mounted, setMounted] = useState(0)
	
	useEffect(() => {
		if (router.query.id) {
			getReq("/strass/"+router.query.id)
			.then(data => setBouls(data))

			getReq("/publis/strass/"+router.query.id)
			.then(data => {
				setPublis(data)
				setMounted(1)
			})
		} else {
			getReq("/strass")
			.then(data => {
				setStrass(data)
				setMounted(0)
			})
		}
	}, [router.query.id])

	if (mounted == 1) {
		return (
			<div className={styles.global}>
				{
					strass?.map((item) => 
						item.cn == router.query.id ?
						<h1>{item.description}</h1>
						: undefined
					)
				}
				<ul className={styles.list}>
					{
						bouls?.map((item) =>
							<li key={item.cn} className={styles.membre}>
								{item.bouls+" : "+item.displayName+" dit "+item.givenName+" "+item.sn}
							</li>
						)
					}
				</ul>
				<h1>Publications de la strass</h1>
				{
					publis?.map((item) =>
						<section className={styles.section} key={item.id}>
							<div className={styles.header}>
								<h4 className={styles.title}>{item.title}</h4>
								<p className={styles.strass}>{item.strassName}</p>
							</div>
							<div dangerouslySetInnerHTML={{__html: item.content}} className={styles.content}/>
						</section>
					)
				}
			</div>
		)
	} else if (mounted == 0) {
		return (
			<div className={styles.global}>
				<h1>Strass de la Boquette</h1>
				<div className={styles.grid}>
					{
						strass?.map((item) =>
							<Link href={"/strass?id="+item.cn} key={item.cn} passHref>
								<div className={styles.card}>
									<h4>{item.description}</h4>
								</div>
							</Link>
						)
					}
				</div>
			</div>			
		)
	}
}