import { useState, useEffect } from 'react'
import { getReq } from '../services/services'
export default function Profile() {
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
  
    return (
        <h1>Mes informations</h1>
    )
}
