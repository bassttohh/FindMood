import Sidebar from "./Sidebar"
import Musicplayer from "./Musicplayer"
import './AppLayout.css'

const AppLayout = ({children}) => {
  return (
    <div className="app-layout">
      <Sidebar />

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
