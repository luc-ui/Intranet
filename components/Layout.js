import styles from '../styles/components/Layout.module.css'

import Link from 'next/link'
import Head from 'next/head'
import PropTypes from 'prop-types'

import router from 'next/router'
import { useEffect, useState } from 'react'
import { getReq } from '../services/services'

export default function Layout({children, setStrass}) {
	const [showMenu, toggleMenu] = useState(true)
	const [search, setSearch] = useState('')
	const [searchData, setSearchData] = useState([])
	const [strassList, setStrassList] = useState([])
		
	var menusList = [
		{link:'/',des:"Accueil",img:'home'},
		{link:'/actus', des :"Actualités",img:"actus"},
		{link:'/calendar', des :"Calendrier",img:"calendar"},
		{link:'/cvis', des :"Catalogue C-Vis",img:"cvis"},
		{link:'/strass', des :"Strass",img:"strass"},
		{link:'/liens', des :"Liens utiles",img:"liens"},
		{link:'/pret', des :"Prêt Matériel",img:"pret"},
	]

	useEffect(() => {
		if (search.length >= 3) {
			getReq("/search/"+search)
			.then(data => setSearchData(data))
		}
	}, [search])

	useEffect(() => {
		getReq("/auth")
		.then(data => {
			setStrassList([{'cn':'AE','description':'AE'},{'cn':'cvis','description':'cvis'}])
			setStrass([{'cn':'AE','description':'AE'},{'cn':'cvis','description':'cvis'}][0]) // utilisateur 
		})
	}, [])
	
	useEffect(() => {
		setSearch('')	
	}, [router.pathname])

	const handleChange = (e) => {
		for (let i = 0; i < strassList.length; i++) {
			if (strassList[i].cn == e.target.value) {
				setStrass(strassList[i])
			}
		}
  	}

	const handleTheme = (e) => {
		localStorage.setItem('theme', JSON.stringify(e.target.value))
		setTheme(e.target.value)
	}
	
	return (
		<div className={styles.container}>
			<Head>
				<meta name="description" content="Created by Strass Infal Boquette" />
				<link rel="icon" href="/favicon.svg" />
				<title>A&M Boquette -  {menusList.filter(item => item.link === router.pathname).map(e=>e.des)}</title>
			</Head>
			<header className={styles.Header}>
				<Link href="/" passHref>
					<div className={styles.HeaderLinkImg}></div>
				</Link>
				
				<div className={styles.HeaderRechercher}>
					<input className={styles.HeaderRechercherInput} type="text" placeholder="Chercher dans l'intranet ..." value={search} onChange={e => setSearch(e.target.value)}/>
					<span className={styles.HeaderRechercherSpan}><p className={styles.HeaderRechercherSpanP}>⌕</p></span>
				</div>
				<div className={styles.HeaderRechercherMobile}>
					<input className={`${styles["Headercheckbox"]} ${styles["HeadercheckboxSearch"]}`} type="checkbox" name="" id="" />
					<div className={`${styles["Headerhamburgerlines"]} ${styles["HeaderhamburgerlinesSearch"]}`}>
						<span className={styles.HeaderRechercherSpan}><p className={styles.HeaderRechercherSpanP}>⌕</p></span>
					</div>
					<div className={`${styles["Headermenuitems"]} ${styles["HeadermenuitemsMenuSearch"]}`}>
						<nav>
							<input className={styles.HeaderRechercherInput} type="text" placeholder="Chercher dans l'intranet ..." value={search} onChange={e => setSearch(e.target.value)}/>
						</nav>
					</div>
				</div>
				<div className={styles.HeaderListeOptionLoginDiv}>
					<select className={styles.HeaderListeOptionLogin} onChange={handleChange}>
						{
							strassList?.map((item) => 
								<option value={item.cn} key={item.cn}>
									{item.description}
								</option>
							)
						}
					</select>
				</div>
				<div className={styles.HeaderProfile}>
					<input className={styles.HeadercheckboxProfile} type="checkbox" name="" id=""/>
					<span className={styles.HeaderProfileSpan}>⏻</span>
					<div className={styles.HeadermenuitemsMenuProfile}>
						<ul className={styles.HeadermenuulProfile}>
							<li className={styles.HeadermenuliProfile}> ✎ <a className={styles.HeadermenuaProfile} href="#">Profile</a></li>
							<li className={styles.HeadermenuliProfile}> ⛭ <a className={styles.HeadermenuaProfile} href="#">Paramètres</a></li>
							<li className={styles.HeadermenuliProfile}> ⏻ <a className={styles.HeadermenuaProfile} href="#">Déconnexion</a></li>
						</ul>
					</div>
				</div>
			</header>
			<div className={styles.Headernavcontainer}>
				<input className={styles.Headercheckbox} type="checkbox" name="" id="" />
				<div className={styles.Headerhamburgerlines}>
					<span className={`${styles["Headerline"]} ${styles["Headerline1"]}`}></span>
					<span className={`${styles["Headerline"]} ${styles["Headerline2"]}`}></span>
					<span className={`${styles["Headerline"]} ${styles["Headerline3"]}`}></span>
				</div>  
				<div className={`${styles["Headermenuitems"]} ${styles["HeadermenuitemsMenuburger"]}`}>
					<nav className={styles.Headermenu}>
						<ul>
							{
								menusList.map((item) =>
									<li key={item.link} className={styles.HeaderMenuLi}><a href={item.link} className={styles.HeaderMenuLink}>{item.des}</a></li>
								)
							}
						</ul>
					</nav>
				</div>
			</div>
			<div className={styles.HeaderStrass}>
				<input className={styles.HeadercheckboxStrass} type="checkbox" name="" id=""/>
				<span className={styles.HeaderSpanStrass}>⏻</span>
				<div className={styles.HeaderhamburgerlinesStrass}>
					<span className={styles.Headerline1Strass}></span>
					<span className={styles.Headerline2Strass}></span>
					<span className={styles.Headerline3Strass}></span>
				</div> 
				<div className={styles.HeadermenuitemsMenuStrass}>
					<ul className={styles.HeadermenuulStrass}>
						<li className={styles.HeadermenuliStrass}><a className={styles.HeadermenuaStrass} href="#">Profile</a></li>
						<li className={styles.HeadermenuliStrass}><a className={styles.HeadermenuaStrass} href="#">Paramètres</a></li>
						<li className={styles.HeadermenuliStrass}><a className={styles.HeadermenuaStrass} href="#">Déconnexion</a></li>
					</ul>
				</div>
			</div>
			<div className={styles.ContentDiv}>
				<main className={styles.main}>
					{
						search.length >= 3 ?
						<div className={styles.searchContent}>
							{
								searchData?.map((item) =>
									<section className={styles.searchSection} key={item.id}>
										<div className={styles.searchHeader}>
											<h4 className={styles.searchTitle}>{item.title}</h4>
											<p className={styles.searchStrass}>{item.strassName}</p>
										</div>
										<div dangerouslySetInnerHTML={{__html: item.content}} className={styles.searchContent}/>
									</section>
								)
							}
						</div>
						:
						children
					}
				</main>
				<footer className={styles.LayoutfooterMenuMobile}>
						<ul className={styles.LayoutfooterMenuMobileUl}>
							{
								menusList.map((item) =>
									<li key={item.link} className={styles.HeaderMenuLi}><a href={item.link}><img className={styles.LayoutFooterMenuLinkImg} src={"/img/"+item.img+".svg"}/></a></li>
								)
							}
						</ul>
				</footer>
				<footer className={styles.FooterMain}>
					<hr className={styles.FooterMainHr} ></hr>
					<p><h1>® 2021</h1></p>
				</footer>
			</div>
		</div>
	)
}

Layout.propTypes = {
	setStrass: PropTypes.func.isRequired
}
