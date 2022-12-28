import { useEffect, useState } from "react"
import Link from 'next/link'

import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/fr'
import 'react-big-calendar/lib/css/react-big-calendar.css'
const localizer = momentLocalizer(moment)

import { getReq, allReq } from '../../services/services'
import styles from '../../styles/pages/Home.module.css'

export function Publication() {
  const [publi, setPubli] = useState()

  // Récupération de la dernière publication
  useEffect(() => {
    getReq("/publis")
		.then(data => setPubli(data))
  }, [])

  return (
    <div className={styles.contenuHaut}>
      {
        publi ?
        <Link href={['actus', 'birse', 'amje'].includes(publi[0].type) ? "/"+publi[0].type : "/events/"+publi[0].type} passHref>
          <section className={styles.section} key={publi[0].id}>
            <div className={styles.header}>
              <h4 className={styles.title}>Dernière Actualité : {publi[0].title}</h4>
              <p className={styles.strass}>{publi[0].strassName}</p>
            </div>
            <div dangerouslySetInnerHTML={{__html: publi[0].content}} className={styles.content}/>
          </section>
        </Link>
        :undefined
      }
    </div>
  )
}

export function Horaires({ selectStrass }) {
  const [refresh, setRefresh] = useState(false)
  const [horaires, setHoraires] = useState([])

  // Récupération des horaires Ec'ss, TT, 4H
  useEffect(() => {
    getReq("/horaires")
    .then(data => {
      setHoraires(data)
      setRefresh(false)
    })
  }, [refresh])

  const handleSubmit = (e, id, row) => {
    e.preventDefault()

    var horaire = prompt("Indiquez la nouvelle horaire ici (pas de virgules SVP)")

    allReq("/horaires", "PUT", {id, row, horaire})
    .then(setRefresh(true))
  }

  var jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  var horairesListe = []
  for (let i=0; i<jours.length; i++) {
    horaires ?
    horairesListe.push(
      <tr key={jours[i]}>
        <td className={styles.cell} key={jours[i]}>{jours[i]}</td>
        {
          horaires.map((item) =>
            item.strass.split(',').includes(selectStrass.cn) ?
            <td className={styles.cell} key={item.jours+"edit"}><button onClick={(e) => handleSubmit(e, item.id, i)} className={styles.horairesButton}>{item.jours.split(',')[i]}</button></td>
            :
            <td className={styles.cell} key={item.jours}>{item.jours.split(',')[i]}</td>
          )
        }
      </tr>
    )
    :undefined
  }

  return (
    <div className={styles.horaires}>
      <table className={styles.horairesTable}>
        <thead>
          <tr>
            <th className={styles.horairesHeader} key="horaires">Horaires</th>
            <th className={styles.horairesHeader} key="ec'ss">Ec&apos;ss</th>
            <th className={styles.horairesHeader} key="4h">4H</th>
            <th className={styles.horairesHeader} key="tt">TTan&apos;ss</th>
          </tr>
        </thead>
        <tbody>
          {horairesListe}
        </tbody>
      </table>
    </div>
  )
}

export function Messages({ selectStrass }) {
  const [messages, setMessages] = useState([])
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

  const [mounted, setMounted] = useState(false)

  //~ useEffect(() => {
    //~ if (!mounted) {
      //~ getReq("/messages")
      //~ .then(data => {
        //~ setMessages(data)
        //~ setMounted(true)
      //~ })
	    //~ setMounted(true)
      //~ setTimeout(() => {
				//~ setMounted(false)
		  //~ }, 5000)
    //~ }
  //~ }, [mounted])

  useEffect(() => {
    if (selectStrass.cn == 'user') {
      setAuthor(selectStrass.givenName + ' ' + selectStrass.sn)
    }
  }, [selectStrass])

  const handleSubmit = (e) => {
    e.preventDefault()
    allReq("/messages", "POST", {author, content})
    .then((status) => {
			if (status == 200) {
        setMounted(false)
        setContent('')
			}
  	})
  }

  return (
    <div className={styles.messages}>
      {
        selectStrass.cn == 'user' ?
          <form onSubmit={handleSubmit} className={styles.formulaire}>
            <input type="text" onChange={(e) => setContent(e.target.value)} placeholder="Envoyer un message" className={styles.field} value={content}/>
          </form>
        :undefined
      }
      <div className={styles.messageList}>
        {
          messages.map((item, index) =>
            <div className={styles.message} key={index}>
              <p className={styles.author}>{item.author}</p>
              <span className={styles.msg}>{item.content}</span>
            </div>
          )
        }
      </div>
    </div>
  )
}

export function Calendrier() {
  const [events, setEvents] = useState([])

  //~ useEffect(() => {
    //~ getReq("/calendar")
    //~ .then(data => {
			//~ var events =[]
			//~ data.map((item, i) => {
				//~ events.push({
					//~ id: i,
					//~ title: item.summary,
					//~ start: new Date(item.start.dateTime),
					//~ end: new Date(item.end.dateTime)
				//~ })
			//~ })
			//~ setEvents(events)
		//~ })
  //~ }, [])

  return (
    <div className={styles.calendrier}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="day"
        views={["day"]}
        min={new Date(1972, 0, 1, 8, 0, 0)}
      />
    </div>
  )
}
