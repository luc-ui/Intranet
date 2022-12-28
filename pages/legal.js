import { useEffect, useState } from 'react'
import Publis from '../components/Publis'
import { getReq } from '../services/services'

// props.selectStrass.some((nombre) => authStrass.includes(nombre)) syntaxe à conserver => très utile

export default function HomePage({ selectStrass }) {
	const [authStrass, setAuthStrass] = useState([])
	return (
		<h1>Mentions Légales</h1>
	)
}
