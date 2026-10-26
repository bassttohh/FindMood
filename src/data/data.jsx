import { Cloud, TreeDeciduous, Sparkles, Heart, Sun, Zap, Moon, Flame, CloudHail, Palette } from 'lucide-react'

export const moods = [
  { id: 'stress', label: 'Estrés', emoji: Cloud, color: 'var(--color-sad)' },
  { id: 'calm', label: 'Necesidad de calma', emoji: TreeDeciduous,  color: 'var(--color-chill)' },
  { id: 'positive', label: 'Enfoque positivo', emoji: Sparkles, color: 'var(--color-happy)' },
  { id: 'melancholy', label: 'Melancolía', emoji: Heart,  color: 'var(--color-sad)' },
  { id: 'happiness', label: 'Felicidad', emoji: Sun,  color: 'var(--color-happy)' },
  { id: 'motivation', label: 'Motivación', emoji: Zap,  color: 'var(--color-happy)' },
  { id: 'nostalgia', label: 'Nostalgia', emoji: Moon,  color: 'var(--color-sad)' },
  { id: 'energy', label: 'Energía', emoji: Flame,  color: 'var(--color-happy)' },
  { id: 'sadness', label: 'Tristeza', emoji: CloudHail,  color: 'var(--color-sad)' },
  { id: 'creativity', label: 'Creatividad', emoji: Palette,  color: 'var(--color-chill)' },
]
