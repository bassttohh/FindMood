import { useState } from "react"
import Sidebar from "./Sidebar"
import Musicplayer from "./Musicplayer"
import './AppLayout.css'

const AppLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className={`app-layout ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>

      <Sidebar
        isOpen={isOpen}
        onToggle= {()=>setIsOpen((current)=> !current)}
      />

      <div className="app-layout__main">
        <main className="app-layout__content">
          <div className="app-container">
            {children}
          </div>
        </main>

        <Musicplayer />
      </div>

    </div>
  )
}
export default AppLayout
