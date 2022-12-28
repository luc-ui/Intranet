import { useEffect, useState } from 'react'
import Publis from '../components/Publis'
import { getReq } from '../services/services'

// props.selectStrass.some((nombre) => authStrass.includes(nombre)) syntaxe à conserver => très utile

export default function HomePage({ selectStrass }) {
  const [authStrass, setAuthStrass] = useState([])

	useEffect(() => {
		getReq("/strass")
		.then(data => {
			var strass=[]
			for (let i = 0; i < data.length; i++) {
				strass.push(data[i].cn)
			}
			setAuthStrass(strass)
		})
	}, [])

  	return <Publis type="actus" name="Boquette d&apos;Angers" authStrass={authStrass} selectStrass={selectStrass}/>
}