import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BorderCountries from './components/BorderCountries'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import './CountryInfo.css'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'

type CountryInfoType = {
  commonName: string
  officialName: string
  flagUrl: string
  borderCountries: any[]
  populationData: { year: number; value: number }[]
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function CountryInfo() {
  const { countryCode } = useParams()
  const [countryInfo, setCountryInfo] = useState<CountryInfoType | null>(null)

  useEffect(() => {
    async function fetchCountryInfo() {
      try {
        const response = await fetch(
          `http://localhost:8080/country-info/${countryCode}`
        )
        const data = await response.json()
        setCountryInfo(data)
      } catch (error) {
        console.error('Error fetching country info:', error)
      }
    }

    if (countryCode) {
      fetchCountryInfo()
    }
  }, [countryCode])

  if (!countryInfo) {
    return <p>Loading country information...</p>
  }

  const chartData = {
    labels: countryInfo.populationData.map((item) => item.year),
    datasets: [
      {
        label: 'Population',
        data: countryInfo.populationData.map((item) => item.value),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.1,
      },
    ],
  }

  return (
    <div className='container'>
      <button className='back' onClick={() => window.history.back()}>
        <MdOutlineKeyboardBackspace /> <span>Back</span>
      </button>

      <div className='country-info-container'>
        <div className='country-header'>
          <h1>{countryInfo.officialName}</h1>
          {countryInfo.flagUrl.length === 0 && <p>No flag found</p>}
          {countryInfo.flagUrl && (
            <img
              src={countryInfo.flagUrl}
              alt={`${countryInfo.officialName} Flag`}
            />
          )}
        </div>

        <div className='country-details'>
          <div className='border-countries'>
            <BorderCountries borderCountries={countryInfo.borderCountries} />
          </div>

          <div className='chart-container'>
            {chartData.labels.length === 0 && <p>No population data found.</p>}
            {chartData.labels.length > 0 && <h2>Population Trend</h2>}
            <Line data={chartData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountryInfo
