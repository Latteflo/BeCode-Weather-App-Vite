// Convert temperature to Fahrenheit
function displayFahrenheitTemperature(event) {
  event.preventDefault()
  let fahrenheitLink = document.querySelector(
    `#fahrenheit-link-${event.target.id.split("-")[2]}`
  )
  let celsiusLink = document.querySelector(
    `#celsius-link-${event.target.id.split("-")[2]}`
  )
  celsiusLink.classList.remove("active")
  fahrenheitLink.classList.add("active")
  let temperatureElement = document.querySelector(
    `.units-${event.target.id.split("-")[2]}`
  )
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature) + "°"
}

export default displayFahrenheitTemperature
