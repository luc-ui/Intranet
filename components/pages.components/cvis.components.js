import { useEffect, useState } from 'react'
import Link from 'next/link'
import router from 'next/router'

import styles from '../../styles/pages/Cvis.module.css'
import { allReq, getReq } from '../../services/services'

export function GetCvis({ authStrass, selectStrass, mounted, setMounted }) {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        if (!mounted) {
            getReq("/cvis")
            .then(data => {
                setArticles(data)
                setMounted(true)
            })
        }
    }, [mounted])

    return (
        <div className={styles.global}>
            <h1>Catalogue C-Vis</h1>
            {
				authStrass.includes(selectStrass.cn) ?
				    <Link href={"/cvis?action=new"} passHref><h4 className="boutonAjout">Ajouter un Article</h4></Link>
                :undefined
			}
            <div className={styles.grid}>
                {
                    articles?.map(item =>
                        <div className={styles.card} key={item.title}>
                            <h4 className={styles.title}>{item.title}</h4>
                            <p className={styles.prix}>{item.prix}</p>
                            <p className={styles.quantite}>{item.quantite}</p>
                            <img src={'http://localhost:5050/apis/images/'+item.img} className={styles.image} alt="logo"/>
                            {
                                authStrass.includes(selectStrass.cn) ?
                                <div className={styles.sectionEdit}>
                                    <Link href={"/cvis?action=modify&id="+item.id} passHref><h4 className="boutonEdit">Modifier</h4></Link>
                                    <Link href={"/cvis?action=delete&id="+item.id} passHref><h4 className="boutonEdit">Supprimer</h4></Link>
                                </div> : undefined
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export function AddCvis({ setMounted }) {
    const [title, setTitle] = useState()
	const [prix, setPrix] = useState()
    const [quantite, setQuantite] = useState()
    const [file, setFile] = useState()

	const [alertOn, setAlert] = useState(false)

 	useEffect(() => {
		if(alertOn) {
			setTimeout(() => {
				alert('Article Ajouté !')
	      		setAlert(false)
		    }, 100)
		}
	}, [alertOn])

	const handleSubmit = (e) => {
		e.preventDefault()
        const formData = new FormData()
        
        formData.append("title", title)
        formData.append("prix", prix)
        formData.append("quantite", quantite)
        formData.append("file", file)
        
		fetch(process.env.NEXT_PUBLIC_API_URL+"/cvis", {
            method: "POST",
            headers: {
                'x-xsrf-token': JSON.parse(localStorage.getItem('token')),
                'Access-Control-Allow-Origin': '*',   
                'Access-Control-Allow-Credentials': 'true'
            },
            body: formData,
            credentials: 'include'
        })
        .then(res => {
            if (res.status == 200) {
                router.push('/cvis')
                setAlert(true)
				setMounted(false)
            } else {
                localStorage.removeItem('token')
                window.location.reload()
            }
        })
  	}

	return (
		<div className={styles.global}>
			<h3>Ajouter un Article</h3>
			<form onSubmit={handleSubmit}>
				<label>
					<p className="texte">Description de l&apos;article</p>
					<input type="text" onChange={e => setTitle(e.target.value)} className="field" placeholder="Bache AM trad'ss" required/>
				</label>
				<label>
					<p className="texte">Prix de l&apos;article</p>
					<input type="text" onChange={e => setPrix(e.target.value)} className="field" placeholder="200€" required/>
				</label>
                <label>
					<p className="texte">Quantités / Tailles disponibles</p>
					<input type="text" onChange={e => setQuantite(e.target.value)} className="field" placeholder="20 / M/L/XL / ..." required/>
				</label>
                <label>
					<p className="texte">Image de l&apos;article</p>
					<input type="file" onChange={e => setFile(e.target.files[0])} accept="image/png, image/jpeg" className="field" required/>
				</label>
				<div>
					<button type="submit" className="submit">Ajouter un Article</button>
				</div>
			</form>
		</div>
	)
}

export function ModifyCvis({ setMounted }) {
    const [title, setTitle] = useState()
	const [prix, setPrix] = useState()
    const [quantite, setQuantite] = useState()

    const [alertOn, setAlert] = useState(false)

    useEffect(() => {
        if (router.query.id) {
			getReq("/cvis/"+id)
			.then(data => {
				setTitle(data[0].title)
				setPrix(data[0].prix)
                setQuantite(data[0].quantite)
			})
		}
    }, [])

 	useEffect(() => {
		if(alertOn) {
			setTimeout(() => {
				alert('Article Modifié !')
	      		setAlert(false)
		    }, 100)
		}
	}, [alertOn])

    const id = router.query.id

    const handleSubmit = (e) => {
		e.preventDefault()
        allReq('/cvis', "PUT", {id, title, prix, quantite})
        .then((status) => {
			if (status == 200) {
				router.push('/cvis')
				setAlert(true)
				setMounted(false)
			}
		})
  	}

    return (
		<div className={styles.global}>
			<h3>Modifier un Article</h3>
			<form onSubmit={handleSubmit}>
				<label>
					<p className="texte">Description de l&apos;article</p>
					<input type="text" onChange={e => setTitle(e.target.value)} className="field" placeholder="Bache AM trad'ss" value={title} required/>
				</label>
				<label>
					<p className="texte">Prix de l&apos;article</p>
					<input type="text" onChange={e => setPrix(e.target.value)} className="field" placeholder="200€" value={prix} required/>
				</label>
                <label>
					<p className="texte">Quantités / Tailles disponibles</p>
					<input type="text" onChange={e => setQuantite(e.target.value)} className="field" placeholder="20 / M/L/XL / ..." value={quantite} required/>
				</label>
				<div>
					<button type="submit" className="submit">Modifier un Article</button>
				</div>
			</form>
		</div>
	)
}
