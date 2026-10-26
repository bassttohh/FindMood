import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react'
import { useMusicPlayer } from '../context/useMusicPlayer'
import './Musicplayer.css'

const formatTime = (value) => {
  if (!Number.isFinite(value)) return '0:00'

  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60).toString().padStart(2, '0')

  return `${minutes}:${seconds}`
}

const Musicplayer = () => {
  const {
    audioRef,
    changeVolume,
    currentSong,
    currentTime,
    duration,
    isPlaying,
    nextTrack,
    previousTrack,
    seek,
    setCurrentTime,
    setDuration,
    togglePlay,
    volume,
  } = useMusicPlayer()

  return (
    <footer className="music-player">
      <div className="music-player__track">
        {currentSong ? (
          <>
            <img
              className="music-player__cover"
              src={currentSong.image}
              alt={`Portada de ${currentSong.name}`}
            />

            <div className="music-player__info">
              <h3>{currentSong.name}</h3>
              <p>{currentSong.artist_name}</p>
            </div>
          </>
        ) : (
          <p className="music-player__empty">Selecciona una canción</p>
        )}
      </div>

      <div className="music-player__controls">
        <div className="music-player__buttons">
          <button
            type="button"
            aria-label="Canción anterior"
            onClick={previousTrack}
            disabled={!currentSong}
          >
            <SkipBack size={19} fill="currentColor" />
          </button>

          <button
            type="button"
            className="music-player__play"
            aria-label={isPlaying ? 'Pausar canción' : 'Reproducir canción'}
            onClick={togglePlay}
            disabled={!currentSong}
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" />
            )}
          </button>

          <button
            type="button"
            aria-label="Siguiente canción"
            onClick={nextTrack}
            disabled={!currentSong}
          >
            <SkipForward size={19} fill="currentColor" />
          </button>
        </div>

        <div className="music-player__progress">
          <span>{formatTime(currentTime)}</span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            step="1"
            value={Math.min(currentTime, duration || 0)}
            onChange={(event) => seek(event.target.value)}
            disabled={!currentSong || !duration}
            aria-label="Progreso de la canción"
          />

          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <label className="music-player__volume">
        <Volume2 size={19} />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => changeVolume(event.target.value)}
          aria-label="Volumen"
        />
      </label>

      <audio
        ref={audioRef}
        src={currentSong?.audio}
        preload="metadata"
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onEnded={nextTrack}
      />
    </footer>
  )
}

export default Musicplayer
