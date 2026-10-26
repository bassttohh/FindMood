
import { shuffleSongs } from '../utils/shuffleSongs'

const JAMENDO_URL = 'https://api.jamendo.com/v3.0/tracks/'
const CLIENT_ID = 'e11802f9'

const getTracks = async (tags = [], speed, excludedIds = []) => {
  const tagList = Array.isArray(tags)
    ? tags.filter(Boolean)
    : [String(tags).trim()]
  const tagQuery = tagList.join(' ')

  if (!tagQuery) {
    throw new Error('No se especificaron tags musicales')
  }

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    format: 'json',
    limit: '30',
    imagesize: '300',
    fuzzytags: tagQuery,
    audioformat: 'mp32',
    boost: 'popularity_total',
  })

  if (speed) {
    params.set('speed', speed)
  }

  const response = await fetch(`${JAMENDO_URL}?${params}`)

  if (!response.ok) {
    throw new Error('Error al obtener canciones de Jamendo')
  }

  const data = await response.json()

  console.log('Estado HTTP:', response.status)
  console.log('Estado Jamendo:', data.headers?.status)
  console.log('Mensaje Jamendo:', data.headers?.error_message)
  console.log('Resultados recibidos:', data.results?.length)
  console.log('Primera canción:', data.results?.[0])

  if (data.headers?.status !== 'success') {
    throw new Error(
      data.headers?.error_message || 'Respuesta inválida de Jamendo'
    )
  }

  const results = Array.isArray(data.results) ? data.results : []
  const excluded = new Set(excludedIds.map((id) => String(id)))

  // Conservar solo canciones con audio, portada e identificador.
  const tracks = results.filter(
    (song) => (
      song.id &&
      song.image &&
      song.audio &&
      !excluded.has(String(song.id))
    )
  )

  const recommendations = shuffleSongs(tracks).slice(0, 3)

  if (recommendations.length === 0) {
    throw new Error('Jamendo no devolvió canciones válidas')
  }

  return recommendations
}

export default getTracks
