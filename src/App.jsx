import AppLayout from './layaout/AppLayout'
import HomePage from './pages/HomePage'
import { MusicPlayerProvider } from './context/MusicPlayerContext'

const App = () => {
  return (
    <MusicPlayerProvider>
      <AppLayout>
        <HomePage />
      </AppLayout>
    </MusicPlayerProvider>
  )
}
export default App
