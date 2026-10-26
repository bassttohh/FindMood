import { useRef, useState } from 'react'

import { detectMusicTag } from '../utils/recommendSongs'
import getTracks from '../services/jameando'
import { shuffleSongs } from '../utils/shuffleSongs'

import MoodInput from '../components/MoodInput'
import RecomendationSection from '../components/RecomendationSection'

import './HomePage.css'

const HomePage = () => {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeMood, setActiveMood] = useState(null)
  const seenSongsRef = useRef(new Set())

  const handleRecommend = async (description = '') => {
    const cleanDescription = description.trim()

    setError('')
    setSongs([])

    if (!cleanDescription) {
      setLoading(false)
      setActiveMood(null)
      setError('Cuéntanos un poco más sobre cómo te sientes.')
      return
    }

    const recommendation = detectMusicTag(cleanDescription)

    if (!recommendation) {
      setLoading(false)
      setActiveMood(null)
      setError('Cuéntanos un poco más sobre cómo te sientes.')
      return
    }

    setActiveMood(recommendation.mood)
    setLoading(true)
    setError('')

    try {
      let result = await getTracks(
        recommendation.tags,
        recommendation.params?.speed,
        [...seenSongsRef.current],
      )

      // Si el catálogo disponible para ese mood se agotó, empieza otra ronda.
      if (result.length < 3 && seenSongsRef.current.size > 0) {
        seenSongsRef.current.clear()
        result = await getTracks(
          recommendation.tags,
          recommendation.params?.speed,
          [],
        )
      }

      if (!Array.isArray(result) || result.length === 0) {
        throw new Error('No encontramos canciones para este estado de ánimo')
      }

      const variedResult = shuffleSongs(result)

      variedResult.forEach((song) => {
        seenSongsRef.current.add(String(song.id))
      })

      setSongs(variedResult)
    }

    catch (err) {
      console.error('Error al cargar canciones:', err)

      setError(
        `No pudimos cargar la canción: ${err.message}`
      )

      setSongs([])
    }

    finally {
      setLoading(false)
    }
  }
  return (
    <section className='home-page'>

      <MoodInput onRecommend={handleRecommend} loading={loading} />
      {error && <p role='alert'>{error}</p>}
      {activeMood && (
        <RecomendationSection
          activeMood={activeMood}
          songs={songs}
          loading={loading}
        />
      )}

    </section>
  )
}
export default HomePage
