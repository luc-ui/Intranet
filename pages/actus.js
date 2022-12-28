import { useEffect, useState } from 'react'
import Publis from '../components/Publis'
import { getReq } from '../services/services'
// props.selectStrass.some((nombre) => authStrass.includes(nombre)) syntaxe à conserver => très utile

export default function Actus({ selectStrass }) {
	const [authStrass, setAuthStrass] = useState(['AE','cvis'])

	//~ useEffect(() => {
		//~ getReq("/strass")
		//~ .then(data => {
			//~ var strass=[]
			//~ for (let i = 0; i < data.length; i++) {
				//~ strass.push(data[i].cn)
			//~ }
			//~ setAuthStrass(strass)
		//~ })
	//~ }, [])
	
	return <Publis type="actus" name="Actualités" authStrass={authStrass} selectStrass={selectStrass}/>
}
