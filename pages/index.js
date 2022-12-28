import styles from '../styles/pages/Home.module.css'

import { Calendrier, Horaires, Messages, Publication } from '../components/pages.components/index.conponents'

export default function HomePage({ selectStrass }) {
  return (
		//~ true
		<div className={styles.global}>
      <h1>Bienvenue à la BOQUETTE D&apos;ANGERS</h1>
      <Publication />
      <div className={styles.contenuBas}>
        <Horaires selectStrass={selectStrass} />
        <Messages selectStrass={selectStrass} />
        <Calendrier />
      </div>
    </div>	
  )
}

	    
