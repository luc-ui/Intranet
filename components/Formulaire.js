import styles from '../styles/components/Formulaire.module.css'

import { getReq, allReq } from '../services/services'

import { useState, useEffect } from 'react'
import router from 'next/router'
import dynamic from 'next/dynamic'

import 'suneditor/dist/css/suneditor.min.css'

//Ouverture des éditeurs côté client
const SunEditor = dynamic(() => import("suneditor-react"), {ssr: false,})
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false })

export default function Formulaire({ id, type, name, strass }) {
	const [title, setTitle] = useState()
	const [content, setContent] = useState()
 	const [date, setDate] = useState()

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
	}, [])

 	useEffect(() => {
		if(alertOn) {
			setTimeout(() => {
				alert('Nouveau contenu ajouté !')
				setAlert(false);
			}, 100)
	  	}
	}, [alertOn])

 	const onEmojiClick = (e, emojiObject) => {
    	setContent(content+emojiObject.emoji)
	};

	const handleChange = (value) => {
		setContent(value)
	}

 	const handleSubmit = (e) => {
	 	e.preventDefault()
		let method = "POST"
		if (router.query.id) {
			method = "PUT"
		}
		allReq("/publis", method, {title, content, date, strass, type, id})
  		.then((status) => {
			if (status == 200) {
				router.push(router.asPath.split('?')[0])
				setAlert(true)
			}
  		})
	}

 	return (
 		<>
	 		<h3>{"Ajouter un nouveau contenu - " + name}</h3>
			<form onSubmit={handleSubmit} className={styles.formulaire}>
				<label>
					<p className="texte">Ajouter un titre</p>
					<input type="text" onChange={e => setTitle(e.target.value)} className="field" placeholder="Je suis un titre !" value={title} required/>
	    		</label>
				<div className={styles.editor}>
		 			<p className="texte">Contenu</p>
					{
						mounted ?
						<SunEditor
							setContents={content}
							onChange={handleChange}
							height='200px'
							setOptions={{
									buttonList: [
										['undo', 'redo'],
										['font', 'fontSize', 'formatBlock'],
										['paragraphStyle', 'blockquote'],
										['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
										['fontColor', 'hiliteColor', 'textStyle'],
										['removeFormat'],
										['outdent', 'indent'],
										['align', 'horizontalRule', 'list', 'lineHeight'],
										['fullScreen']
									]
							}}
						/>
						:undefined
					}
					<Picker onEmojiClick={onEmojiClick} pickerStyle={{width: '100%'}}/>
				</div>
				<div>
	      			<button type="submit" className="submit">Publier</button>
	    		</div>
			</form>
		</>
	)
}