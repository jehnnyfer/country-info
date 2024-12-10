import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CountryInfo from './pages/CountryInfo'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/country-info/:countryCode' element={<CountryInfo />} />
      </Routes>
    </Router>
  )
}

export default App
