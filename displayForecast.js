// Display the forecast data
const displayForecast = (data, uniqueId) => {
  let forecastElement = document.querySelector(`#weather-forecast-${uniqueId}`)
  // Group the forecast data by day
  let groupedByDay = data.list.reduce((grouped, item, index) => {
    const date = new Date(item.dt * 1000)
    const day = date.getUTCDate()
    const month = date.getUTCMonth()
    const year = date.getUTCFullYear()

    const key = `${day}-${month}-${year}`

    if (!grouped[key]) {
      grouped[key] = []
    }
    grouped[key].push(item)
    return grouped
  }, {})

  let forecastHTML = `<div class="daily-forecast-${uniqueId} daily-forecast">`

  // Iterate over each day and calculate min and max temperatures
  Object.values(groupedByDay).forEach((dayData, index) => {
    const date = new Date(dayData[0].dt * 1000)
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const dayOfWeek = dayNames[date.getDay()]

    const temperatures = dayData.map((item) => item.main.temp)
    const minTemp = Math.min(...temperatures)
    const maxTemp = Math.max(...temperatures)

    forecastHTML += `
          <div class="day-card-${uniqueId}-${index} day-card">
          <div class="weather-forecast-date">${dayOfWeek}</div>
          <img class="weather-forecast-icon" src="${getWeatherIcon(
            data.list[0].weather[0].id
          )}" alt="weather icon">

            <div class="temperatures-${uniqueId}-${index} temperatures">
              <span class="max units"> ${Math.round(maxTemp)}°  </span>
              <span class="min units"> ${Math.round(minTemp)}° </span>
            </div>
          </div>
      `
  })

  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML
}

export default displayForecast
