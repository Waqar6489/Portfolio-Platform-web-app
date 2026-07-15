import { Route, Routes } from 'react-router-dom'
import './index.css'
import { Home } from './pages/home'
import { Header } from './components/header'
import { Signup } from './pages/register'
function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={< Home />} />
        <Route path='/register' element={< Signup />} />
      </Routes>
    </div>
  )
}

export default App
