import './MoodInput.css'
import { LoaderCircle, Pencil, Send } from 'lucide-react'
import { useState } from 'react'

const MoodInput = ({ onRecommend, loading = false }) => {
  const [description, setDescription] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!description.trim() || loading) return

    onRecommend(description.trim())
  }

  return (
    <div className='mood-input__content'>

      <div className='mood-input__saludo'>
        <h1>Describe cómo fue tu día</h1>
        <p>
          Escribe libremente lo que sientes, lo que pasó hoy o cómo está tu ánimo.
          <br />
          Te recomendaremos 3 canciones que encajen contigo el dia de hoy.
        </p>
      </div>

      <form className='mood-input__description-form' onSubmit={handleSubmit}>
        <Pencil className='mood-input__pencil' size={25} strokeWidth={1.8} />

        <textarea
          id='mood-description'
          name='mood-description'
          value={description}
          maxLength={280}
          onChange={(event) => setDescription(event.target.value)}
          aria-label='Describe cómo fue tu día'
          autoComplete='off'
          placeholder='Describe cómo fue tu día...'
          rows={2}
        />

        <span className='mood-input__counter'>
          {description.length}/280
        </span>

        <button
          className='mood-input__submit'
          aria-label='Enviar descripción'
          type='submit'
          disabled={!description.trim() || loading}
        >
          {loading ? (
            <LoaderCircle className='mood-input__loader' size={22} />
          ) : (
            <Send size={22} strokeWidth={2} />
          )}
        </button>
      </form>
    </div>
  )
}
export default MoodInput
