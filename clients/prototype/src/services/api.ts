const API_URL = 'http://localhost:8000'

const post = ( url: string, body: object ) => fetch( url, {
  method: 'POST',
  body: JSON.stringify( body ),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
}).then(
  res => res.json()
)

export const introduce = ( name: string ) => post(
  `${API_URL}/introduction`,
  { name }
)

export const mindset = ( name: string, mindset: string ) => post(
  `${API_URL}/mindset`,
  { name, mindset }
)

