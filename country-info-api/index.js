require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
const PORT = 8080

// Use dotenv variables for API base URLs
const DATE_NAGER_API_URL = process.env.DATE_NAGER_BASE_API_URL
const COUNTRIES_NOW_API_URL = process.env.COUNTRIES_NOW_BASE_API_URL

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${DATE_NAGER_API_URL}/AvailableCountries`)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch available countries' })
  }
})

app.get('/country-info/:countryCode', async (req, res) => {
  const { countryCode } = req.params

  try {
    // Fetch country info from Date Nager API
    const countryInfoResponse = await axios.get(
      `${DATE_NAGER_API_URL}/CountryInfo/${countryCode}`
    )
    const commonName = countryInfoResponse.data.commonName
    const officialName = countryInfoResponse.data.officialName
    const borderCountries = countryInfoResponse.data.borders || []

    // Fetch population data from CountriesNow API
    let populationData = []
    try {
      const populationResponse = await axios.post(
        `${COUNTRIES_NOW_API_URL}/countries/population`,
        {
          country: commonName,
        }
      )
      populationData = populationResponse.data?.data?.populationCounts || []
    } catch (populationError) {
      console.error('Error fetching population data:', populationError.message)
    }

    // Fetch flag URL from CountriesNow API
    let flagUrl = ''
    try {
      const flagResponse = await axios.post(
        `${COUNTRIES_NOW_API_URL}/countries/flag/images`,
        {
          country: commonName,
        }
      )
      flagUrl = flagResponse.data?.data?.flag || ''
    } catch (flagError) {
      console.error('Error fetching flag data:', flagError.message)
    }

    res.status(200).json({
      commonName,
      officialName,
      borderCountries,
      populationData,
      flagUrl,
    })
  } catch (error) {
    console.error('Error fetching country info:', error.message)
    res.status(500).json({
      message: 'Failed to fetch country information',
      error: error.message,
    })
  }
})

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
)
