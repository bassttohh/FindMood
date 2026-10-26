import './Sidebar.css'
import { Heart, History, Home, Music2, Menu } from 'lucide-react'

const Sidebar = ({ isOpen, onToggle }) => {
  return (

    <aside className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}>

      <div className='logo-content'>
        <a className='sidebar__brand' href='/'>
          <span className='sidebar__logo'>
            <Music2 size={20} strokeWidth={2.4} />
          </span>
          <span className='sidebar__logo__text'>MoodSound</span>
        </a>

        <button
          className='sidebar-menu__button'
          type='button'
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          onClick={onToggle}
        >
          <Menu className='sidebar-menu__icon' size={21} strokeWidth={2} />
        </button>
      </div>

      <nav className='navbar__main'>
        <a className='navbar__link navbar__link--active' href='/' aria-current='page'>
          <Home size={18} />
          <span>Inicio</span>
        </a>
        <a className='navbar__link' href='#historial'>
          <History size={18} />
          <span>Historial</span>
        </a>
        <a className='navbar__link' href='#favoritos'>
          <Heart size={18} />
          <span>Favoritos</span>
        </a>
      </nav>

    </aside>
  )
}
export default Sidebar
