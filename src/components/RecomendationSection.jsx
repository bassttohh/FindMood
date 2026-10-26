import MoodCard from './MoodCard.jsx'
import MusicRecommendationCard from './MusicRecommendationCard.jsx'

import './RecomendationSection.css'

const RecomendationSection = ({ activeMood, songs = [], loading = false }) => {
  const moodTitle = activeMood
    ? 'Estados relacionados con tu mood'
    : 'Tu estado de ánimo hoy'

  return (
    <div className='recomendation-container'>
      <span>{moodTitle}</span>

      <MoodCard activeMood={activeMood} />

      <div className='music-recomendations'>
        <h2>Canciones para ti</h2>
        {loading && <p>Buscando canciones para ti...</p>}
        {!loading && songs.length > 0 && (
          <div className='music-recomendations__grid'>
            {songs.slice(0, 3).map((song) => (
              <MusicRecommendationCard
                key={song.id}
                song={song}
                queue={songs}
              />
            ))}
          </div>
        )}

        {!loading && songs.length === 0 && (
          <p>recomendaciones aparecerán aquí.</p>
        )}
      </div>
    </div>
  )
}

export default RecomendationSection
