import './MoodCard.css'
import { moods } from '../data/data'

const moodGroups = {
  ambient: {
    active: 'calm',
    ids: ['calm', 'stress', 'nostalgia'],
  },
  sad: {
    active: 'sadness',
    ids: ['sadness', 'melancholy', 'nostalgia'],
  },
  happy: {
    active: 'happiness',
    ids: ['happiness', 'positive', 'energy'],
  },
  romantic: {
    active: 'positive',
    ids: ['positive', 'happiness', 'melancholy'],
  },
  nostalgic: {
    active: 'nostalgia',
    ids: ['nostalgia', 'melancholy', 'calm'],
  },
}

const MoodCard = ({ activeMood }) => {
  const group = moodGroups[activeMood] ?? {
    active: null,
    ids: ['stress', 'calm', 'positive'],
  }

  const visibleMoods = group.ids
    .map((id) => moods.find((mood) => mood.id === id))
    .filter(Boolean)

  return (
    <div className='mood-card-grid'>
      {visibleMoods.map((mood) => {
        const Icon = mood.emoji

        return (
          <div
            className={`mood-card mood-card-${mood.id} ${
              mood.id === group.active ? 'mood-card--active' : ''
            }`}
            key={mood.id}
          >
            <Icon size={28} strokeWidth={2} />
            <span className='mood-label'>{mood.label}</span>
          </div>
        )
      })}
    </div>
  )
}
export default MoodCard
