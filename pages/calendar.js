import styles from '../styles/pages/Calendar.module.css'

import { useEffect, useState } from 'react'
import router from 'next/router'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/fr'
const localizer = momentLocalizer(moment)
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { allReq, getReq } from '../services/services'
import { AddSport, GetSports } from '../components/pages.components/calendar.components'

export default function Calendrier({ selectStrass }) {
	const [mounted, setMounted] =  useState(false)
	const [toggleCalendar, setToggleCalendar] = useState(false)
	const [events, setEvents] = useState([])
	const [alertOn, setAlert] = useState(false)

	useEffect(() => {
		getReq('/calendar')
		.then(data => {
			var events =[]
			data.map((item, i) => {
				events.push({
					id: i,
					title: item.summary,
					start: new Date(item.start.dateTime),
					end: new Date(item.end.dateTime)
				})
			})
			setEvents(events)
		})
	}, [])

	useEffect(() => {
		if(alertOn) {
			setTimeout(() => {
				alert('Horaire supprimée !')
	      		setAlert(false)
	    }, 100)
	  }
	}, [alertOn])

	const authStrass = ["AE", "UAI"]
	
	if (toggleCalendar) {
		switch (router.query.action) {
			case 'new':
				if (authStrass.includes(selectStrass.cn)) {
					return <AddSport setMounted={setMounted}/>
				}
			case 'delete':
				if (authStrass.includes(selectStrass.cn) && router.query.id) {
					const id = router.query.id
	
					allReq("/calendar", "DELETE", {id})
					.then((status) => {
						if (status == 200) {
							router.push('/calendar')
							setAlert(true)
							setMounted(false)
						}
					})
				}
			default:
				return <GetSports selectStrass={selectStrass} authStrass={authStrass} mounted={mounted} setMounted={setMounted} toggleCalendar={toggleCalendar} setToggleCalendar={setToggleCalendar}/>
		}
	} else {
		return (
			<div className={styles.global}>
				<h1>Calendrier</h1>
				<button onClick={() => setToggleCalendar(!toggleCalendar)}><h4 className="boutonAjout">Voir le Calendrier de l&apos;UAI</h4></button>
				<Calendar
					localizer={localizer}
					events={events}
					startAccessor="start"
					endAccessor="end"
					defaultView="week"
					min= {new Date(1972, 0, 1, 7, 0, 0)}
				/>
			</div>
		)
	}
}