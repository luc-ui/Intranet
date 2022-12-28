import { useEffect, useState } from "react"
import { allReq, getReq } from "../services/services"

import styles from "../styles/pages/pret.module.css"
import router from 'next/router'

export default function Pret() {
    const [content, setContent] = useState('')
    const [id, setId] = useState()
    const [alertOn, setAlert] = useState(false)

    useEffect(() => {
        getReq('/messages')
        .then(data => {
            setContent(data[0].content)
            setId(data[0].id)
        })
    }, [])

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
        allReq('/messages', 'POST', {
            content,
            id
        })
  		.then((status) => {
			if (status == 200) {
				router.push('/')
				setAlert("Mise au jour faite !")
			} else {
                setAlert("Erreur lors de la mise au jour")
            }
  		})
    }
    
    return (
        <div className={styles.globals}>
            <h1>Edition de la page Puntos</h1>
            <form onSubmit={handleSubmit}>
                <textarea onChange={(e) => setContent(e.target.value)} value={content} className={styles.area}/>
                <button className="submit" type="submit">Modifier le message</button>
            </form>
        </div>
    )
}