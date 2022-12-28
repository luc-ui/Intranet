import styles from '../styles/components/Layout.module.css'

import Link from 'next/link'
import Head from 'next/head'
import PropTypes from 'prop-types'

import router from 'next/router'
import { useEffect, useState } from 'react'
import { getReq } from '../services/services'
import Afficher from './AffichagePubli'


export default function Layout({ children, setStrass, selectStrass}) {
	const [showSearch, setShowSearch] = useState(false)
	const [search, setSearch] = useState('')
	const [searchData, setSearchData] = useState([])
	const [strassList, setStrassList] = useState([])


	var menus = [
		['/', "Accueil", "home"],
		['/calendar', "Calendrier", "calendar"],
		['/strass', "Strass", "strass"],
		['/liens', "Liens utiles", "liens"],
		['/pret', "Prêt Matériel", "pret"]
	]

	if (selectStrass.cn == 'FU' || selectStrass.cn == 'AE') {
		menus.push(['/pret', "Page Puntos", "pret"])
	}

	if (selectStrass.cn != 'user') {
		menus.push(['/publis', "Publications", "publis"])
	}


	useEffect(() => {
		if (search.length >= 3) {
			getReq("/search/"+search)
			.then(data => setSearchData(data))
		}
	}, [search])

	useEffect(() => {
		getReq("/profile")
		.then(data => {
			setStrassList(data)
			setStrass(data[0])
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

	const handleSearch = () => {
		if (showSearch) {
			setShowSearch(false)
			setSearch('')
		} else {
			setShowSearch(true)
		}
	}
	const handleMenuGE = () => {
		document.getElementById("checkboxMenuGrandEcran").checked = false;
	}
	const handleMenuPEO = () => {
		document.getElementById("checkboxPetitMenu").checked = false;
	}
	const handleMenuGEO = () => {
		document.getElementById("checkboxGrandEcranOption").checked = false;
	}
		return (
		<div className={styles.container}>
			<Head>
				<meta name="description" content="Created by Strass Infal Boquette" />
				<link rel="icon" href="/favicon.svg" />
				<title>A&M Boquette -  {menus.filter((item) =>  item[0] === router.pathname).map(e=>e[1])}</title>
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
					<input className={styles.HeadercheckboxProfile} type="checkbox" name="" id="checkboxGrandEcranOption"/>
					<span className={styles.HeaderProfileSpan}>⏻</span>
					<div className={styles.HeadermenuitemsMenuProfile}>
						<ul className={styles.HeadermenuulProfile}>
							<li className={styles.HeadermenuliProfile} onClick={handleMenuGEO}> ✎ <Link href="/profile"><span className={styles.HeadermenuaProfile}>Profile</span></Link></li>
							<li className={styles.HeadermenuliProfile} onClick={handleMenuGEO}> ⛭ <Link href="#"><span className={styles.HeadermenuaProfile} >Paramètres</span></Link></li>
							<li className={styles.HeadermenuliProfile} onClick={()=>{localStorage.removeItem('token');window.location.reload()}}> ⏻ <Link href="#"><span className={styles.HeadermenuaProfile}>Déconnexion</span></Link></li>
						</ul>
					</div>
				</div>
			</header>
			<div className={styles.Headernavcontainer}>
				<input className={styles.Headercheckbox} type="checkbox" name="" id="checkboxMenuGrandEcran" />
				<div className={styles.Headerhamburgerlines}>
					<span className={`${styles["Headerline"]} ${styles["Headerline1"]}`}></span>
					<span className={`${styles["Headerline"]} ${styles["Headerline2"]}`}></span>
					<span className={`${styles["Headerline"]} ${styles["Headerline3"]}`}></span>
				</div>  
				<div className={`${styles["Headermenuitems"]} ${styles["HeadermenuitemsMenuburger"]}`}>
					<nav className={styles.Headermenu}>
						<ul>
							{
								menus.map(item => 
									<li key={item[2]} className={styles.HeaderMenuLi} onClick={handleMenuGE}>
										<Link href={item[0]} ><span className={styles.HeaderMenuLink} title={item[1]}>{item[1]}</span></Link>
									</li>
								)
							}
						</ul>
					</nav>
				</div>
			</div>
			<div className={styles.HeaderStrass}>
				<input className={styles.HeadercheckboxStrass} type="checkbox" name="" id="checkboxPetitMenu"/>
				<span className={styles.HeaderSpanStrass}>⏻</span>
				<div className={styles.HeaderhamburgerlinesStrass}>
					<span className={styles.Headerline1Strass}></span>
					<span className={styles.Headerline2Strass}></span>
					<span className={styles.Headerline3Strass}></span>
				</div> 
				<div className={styles.HeadermenuitemsMenuStrass}>
					<ul className={styles.HeadermenuulStrass}>
						<li className={styles.HeadermenuliStrass} onClick={handleMenuPEO}><Link href="/profile"><span className={styles.HeadermenuaStrass}>Profile</span></Link></li>
						<li className={styles.HeadermenuliStrass} onClick={handleMenuPEO}><Link href="#"><span className={styles.HeadermenuaStrass}>Paramètres</span></Link></li>
						<li className={styles.HeadermenuliStrass} onClick={()=>{localStorage.removeItem('token');window.location.reload()}}><Link href="#"><span className={styles.HeadermenuaStrass}>Déconnexion</span></Link></li>
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
								menus.map(item => 
									<li key={item[2]} className={styles.HeaderMenuLi}>
										<Link href={item[0]} title={item[1]}>
											<img className={styles.LayoutFooterMenuLinkImg} src={"/img/"+item[2]+".svg"}  alt="logo"/>
										</Link>
									</li>
								)
							}
						</ul>
				</footer>
				<footer className={styles.FooterMain}>
					<hr className={styles.FooterMainHr} ></hr>
					<p><h1>® 2021</h1> - </p>
					<Link href="/legal"><span>Mentions Légales</span></Link>
				</footer>
			</div>
		</div>
	)
}

Layout.propTypes = {
	setStrass: PropTypes.func.isRequired
}
