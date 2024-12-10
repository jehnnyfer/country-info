import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

type Country = {
  countryCode: string
  name: string
}

function Home() {
  const [countryList, setCountryList] = useState<Country[]>([]) // Explicitly define type
  const navigate = useNavigate()

  async function getCountryList() {
    try {
      const response = await fetch('http://localhost:8080/')
      const data = await response.json()
      setCountryList(data) // Set country list with proper type
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    getCountryList()
  }, [])

  const handleCountryClick = (countryCode: string, countryName: string) => {
    navigate(`/country-info/${countryCode}`, { state: { countryName } })
  }

  return (
    <div id='container' className='container'>
      <div className='header'>
        <h1>Country Info App</h1>
        <p>Select a country from the list to see detailed information.</p>
      </div>

      <div className='list'>
        {countryList.length > 0 ? (
          countryList.map((country) => (
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
              key={country.countryCode}
            >
              <button
                onClick={() =>
                  handleCountryClick(country.countryCode, country.name)
                }
              >
                {country.countryCode} - {country.name}
              </button>
            </div>
          ))
        ) : (
          <p>Loading countries...</p>
        )}
      </div>
    </div>
  )
}

export default Home
