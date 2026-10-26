
import { Pause, Play } from 'lucide-react'
import './MusicRecommendationCard.css'
import { useMusicPlayer } from '../context/useMusicPlayer'

const MusicRecommendationCard = ({ song, queue }) => {
  const { currentSong, error, isPlaying, playSong, togglePlay } = useMusicPlayer()
  const isCurrentSong = currentSong?.id === song.id
  const isCurrentSongPlaying = isCurrentSong && isPlaying

  return (
    <article className="music-recommendation-card">
      <img
        className="music-recommendation-card__cover"
        src={song.image}
        alt={`Portada de ${song.name}`}
        onError={(event) => {
          event.currentTarget.style.visibility = 'hidden'
        }}
      />

      <div className="music-recommendation-card__info">
        <h3>{song.name}</h3>
        <p>{song.artist_name}</p>

        <button
          className="music-recommendation-card__play"
          type="button"
          onClick={() => {
            if (isCurrentSong) {
              togglePlay()
            } else {
              playSong(song, queue)
            }
          }}
        >
          {isCurrentSongPlaying ? (
            <Pause size={16} fill="currentColor" />
          ) : (
            <Play size={16} fill="currentColor" />
          )}
          <span>{isCurrentSongPlaying ? 'Pausar' : 'Reproducir'}</span>
        </button>

        {isCurrentSong && error && (
          <p className="music-recommendation-card__status" role="status">
            {error}
          </p>
        )}
      </div>
    </article>
  )
}

export default MusicRecommendationCard
