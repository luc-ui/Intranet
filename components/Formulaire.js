import styles from '../styles/components/Formulaire.module.css'

import { getReq, allReq } from '../services/services'

import { useState, useEffect } from 'react'
import router from 'next/router'
import dynamic from 'next/dynamic'

import 'suneditor/dist/css/suneditor.min.css'

//Ouverture des éditeurs côté client
const SunEditor = dynamic(() => import("suneditor-react"), {ssr: false,})

export default function Formulaire({ id, name, strass, setPublisMounted }) {
	const [title, setTitle] = useState()
	const [content, setContent] = useState()
 	// const [date, setDate] = useState()

	const [mounted, setMounted] = useState(false)

	const [alertOn, setAlert] = useState(false)

	useEffect(() => {
		if (router.query.id) {
			getReq("/publis/id/"+id)
			.then(data => {
				setTitle(data[0].title)
				setContent(data[0].content)
				setMounted(true)
			})
		} else {
			setMounted(true)
		}
	}, [router.query.id])

 	useEffect(() => {
		if(alertOn) {
			setTimeout(() => {
				alert(alertOn)
				setAlert(false)
			}, 100)
	  	}
	}, [alertOn])

 	const handleSubmit = (e) => {
	 	e.preventDefault()
		let method = "POST"
		var date = getDate()

		if (router.query.id) {
			method = "PUT"
		}
		allReq("/publis", method, {title, content, date, strass, id})
  		.then((status) => {
			if (status == 200) {
				router.push(router.asPath.split('?')[0])
				setAlert("Publication ajoutée !")
				setPublisMounted(false)
			} else {
				setAlert("Erreur lors de l'Ajout")
			}
  		})
	}

 	return (
 		<>
	 		<h3>{"Ajouter un nouveau contenu - " + name}</h3>
			<form onSubmit={handleSubmit} className={styles.formulaire}>
				<label>
					<p className="texte">Ajouter un titre</p>
					<input type="text" onChange={e => setTitle(e.target.value)} className="field" placeholder="Titre ..." value={title} required/>
	    		</label>
				<div className={styles.editor}>
		 			<p className="texte">Contenu</p>
					{
						mounted ?
						<SunEditor
							setContents={content}
							onChange={value => setContent(value)}
							height='200px'
							placeholder='Contenu ...'
							setOptions={{
									buttonList: [
										['font', 'fontSize', 'fontColor', 'hiliteColor'],
										['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
										['image', 'video', 'audio', 'link']
									]
							}}
						/>
						:undefined
					}
				</div>
				<div>
	      			<button type="submit" className="submit">Publier</button>
	    		</div>
			</form>
		</>
	)
}

function toLocaleUTCDateString(date, locales, options) {
    const tempsDiff = date.getTimezoneOffset() * 60000
    const ajustementDate = new Date(date.valueOf() + tempsDiff)

    return ajustementDate.toLocaleDateString(locales, options)
}

function getDate() {
	var cejour = new Date()
    var options = {weekday: "short", year: "numeric", month: "numeric", day: "2-digit"}
    var date = toLocaleUTCDateString(cejour, "fr-FR", options)
    var heure = ("0" + cejour.getHours()).slice(-2) + " h " + ("0" + cejour.getMinutes()).slice(-2)
    var dateheure = date + " à " + heure
    return dateheure.replace(/(^\w{1})|(\s+\w{1})/g, lettre => lettre.toUpperCase())
}
    