export function getReq(route) {
  return fetch('http://localhost:5050/api'+route, {
    method: 'GET',
    headers: {
      'x-xsrf-token': JSON.parse(localStorage.getItem('token')),
      'Access-Control-Allow-Origin': '*',   
      'Access-Control-Allow-Credentials': 'true'
    },
    credentials: 'include'
  })
  .then(res => {
    if (res.status == 200) {
      return res.json()
    } else {
      //~ localStorage.removeItem('token')
      //~ window.location.reload()
    }
  })
}

export function allReq(route, method, credentials) {
  return fetch('http://localhost:5050/api'+route, {
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
    if (res.status == 200) {
      return res.status
    } else {
      //~ localStorage.removeItem('token')
      //~ window.location.reload()
    }
  })
}
