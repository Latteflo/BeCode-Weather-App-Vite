
    // Convert temperature to Celsius
    function displayCelsiusTemperature(event) {
        event.preventDefault()
        let fahrenheitLink = document.querySelector(
          `#fahrenheit-link-${event.target.id.split("-")[2]}`
        )
        let celsiusLink = document.querySelector(
          `#celsius-link-${event.target.id.split("-")[2]}`
        )
        celsiusLink.classList.add("active")
        fahrenheitLink.classList.remove("active")
        let temperatureElement = document.querySelector(
          `.units-${event.target.id.split("-")[2]}`
        )
        temperatureElement.innerHTML = celsiusTemperature + "°"
      }

        export default displayCelsiusTemperature