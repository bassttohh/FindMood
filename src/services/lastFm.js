// const URL_LASTFM = 'http://www.last.fm/api/auth/'
// const API_KEY = '9cb1240cfd02317e622740b5c6679abc'
//
// const getTracks = async () => {
//   const params = new URLSearchParams({
//     client_id: API_KEY,
//     format: 'json',
//     limit: 3
//   })
//   const response = await fetch(`${URL_LASTFM}?${params}`)
//   if (!response.ok) {
//     throw new Error('Error al cargar  la api de last.fm')
//   }
//   const data = await response.json()
//
//   return data.results
//
// }
// export default getTracks
