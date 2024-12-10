type Props = {
  borderCountries: any[]
}

function BorderCountries({ borderCountries }: Props) {
  return (
    <div>
      <h2>Border Countries</h2>
      <ul>
        {borderCountries.length === 0 && <p>No border countries found.</p>}
        {borderCountries?.map((country) => (
          <li key={country.countryCode}>
            {country.commonName} ({country.officialName}) - {country.region}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BorderCountries
