import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { MusicPlayerContext } from './musicPlayerContext'

export const MusicPlayerProvider = ({ children }) => {
  const audioRef = useRef(null)
  const [queue, setQueue] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.75)
  const [error, setError] = useState('')

  const currentSong = queue[currentIndex] ?? null

  const playSong = useCallback((song, songs = [song]) => {
    const nextQueue = songs.length > 0 ? songs : [song]
    const nextIndex = nextQueue.findIndex((item) => item.id === song.id)

    setQueue(nextQueue)
    setCurrentIndex(nextIndex >= 0 ? nextIndex : 0)
    setIsPlaying(true)
    setError('')
  }, [])

  const togglePlay = useCallback(() => {
    if (currentSong) setIsPlaying((playing) => !playing)
  }, [currentSong])

  const nextTrack = useCallback(() => {
    if (queue.length === 0) return

    setCurrentIndex((index) => (index + 1) % queue.length)
    setIsPlaying(true)
    setError('')
  }, [queue.length])

  const previousTrack = useCallback(() => {
    const audio = audioRef.current

    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
      return
    }

    if (queue.length === 0) return

    setCurrentIndex((index) => (index - 1 + queue.length) % queue.length)
    setIsPlaying(true)
  }, [queue.length])

  const seek = useCallback((value) => {
    const nextTime = Number(value)

    if (audioRef.current) audioRef.current.currentTime = nextTime
    setCurrentTime(nextTime)
  }, [])

  const changeVolume = useCallback((value) => {
    const nextVolume = Number(value)

    setVolume(nextVolume)
    if (audioRef.current) audioRef.current.volume = nextVolume
  }, [])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current

    if (!audio || !currentSong) return

    setCurrentTime(0)
    setDuration(0)

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false)
        setError('No se pudo reproducir esta canción')
      })
    } else {
      audio.pause()
    }
  }, [currentSong, isPlaying])

  const value = useMemo(() => ({
    audioRef,
    changeVolume,
    currentSong,
    currentTime,
    duration,
    error,
    isPlaying,
    nextTrack,
    playSong,
    previousTrack,
    seek,
    setCurrentTime,
    setDuration,
    togglePlay,
    volume,
  }), [
    changeVolume,
    currentSong,
    currentTime,
    duration,
    error,
    isPlaying,
    nextTrack,
    playSong,
    previousTrack,
    seek,
    togglePlay,
    volume,
  ])

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  )
}
