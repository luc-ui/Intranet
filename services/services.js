export function getReq(route) {
  return fetch(process.env.NEXT_PUBLIC_API_URL+route, {
    method: 'GET',
    headers: {
      'x-xsrf-token': JSON.parse(localStorage.getItem('token')),
      'Access-Control-Allow-Origin': '*',   
      'Access-Control-Allow-Credentials': 'true'
    },
    credentials: 'include'
  })
  .then(res => {
    if (res.status == 402) {
      localStorage.removeItem('token')
      window.location.reload()
    } else {
      return res.json()
    }
  })
}

export function allReq(route, method, credentials) {
  return fetch(process.env.NEXT_PUBLIC_API_URL+route, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'x-xsrf-token': JSON.parse(localStorage.getItem('token')),
      'Access-Control-Allow-Origin': '*',   
      'Access-Control-Allow-Credentials': 'true'
    },
    body: JSON.stringify(credentials),
    credentials: 'include'
  })
  .then(res => {
    if (res.status == 402) {
      localStorage.removeItem('token')
      window.location.reload()
    } else {
      return res.status
    }
  })
}
