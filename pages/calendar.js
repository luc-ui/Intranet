import styles from '../styles/pages/Calendar.module.css'

import { useEffect, useState } from 'react'
import router from 'next/router'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/fr'
const localizer = momentLocalizer(moment)
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { getReq } from '../services/services'
import { AddSport, GetSports, Horaires } from '../components/pages.components/calendar.components'

export default function Calendrier({ selectStrass }) {
	const [mounted, setMounted] =  useState(false)
	const [events, setEvents] = useState([])

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

	const authStrass = ["AE", "UAI"]

	if (authStrass.includes(selectStrass.cn) && router.query.action == 'new') {
		return <AddSport setMounted={setMounted}/>
	} else {
		return (
			<div className={styles.global}>
				<h1>Calendrier</h1>
				<Calendar
					localizer={localizer}
					events={events}
					startAccessor="start"
					endAccessor="end"
					defaultView="day"
					min= {new Date(1972, 0, 1, 7, 0, 0)}
				/>
				<GetSports selectStrass={selectStrass} authStrass={authStrass} mounted={mounted} setMounted={setMounted} />
			</div>
		)
	}
}