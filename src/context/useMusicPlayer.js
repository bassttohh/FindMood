import { useContext } from 'react'
import { MusicPlayerContext } from './musicPlayerContext'

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext)

  if (!context) {
    throw new Error('useMusicPlayer debe usarse dentro de MusicPlayerProvider')
  }

  return context
}
