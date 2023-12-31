import getWeatherIcon from "./weatherIcons"
import setHeadHeight from "./setHeightToHead"
import displayFahrenheitTemperature from "./fahrenheit"
import displayCelsiusTemperature from "./celsius"
import createTemperatureChart from "./chart.js"

// Get references to DOM elements
let cityInput = document.getElementById("city-input")
let submitButton = document.getElementById("submit-button")
let clearButton = document.getElementById("clear-button")
let weatherDisplay = document.getElementById("weather-display")

document.addEventListener("DOMContentLoaded", () => {
  // Event listener for the clear button
  clearButton.addEventListener("click", function () {
    let weatherDisplay = document.getElementById("weather-display")
    document.querySelectorAll(".city-card").forEach(function (card) {
      card.remove()
    })
    localStorage.clear()
    weatherDisplay.innerHTML = ""
    localStorage.removeItem("searchHistory")
    setHeadHeight()
  })

  // Event listener for the submit button
  submitButton.addEventListener("click", function (event) {
    event.preventDefault()
    if (cityInput.value.trim() === "") {
      alert("Please enter a city name.")
    } else {
      getWeatherData(cityInput.value)
      cityInput.value = ""
      setHeadHeight()
    }
    searchCity()
  })

  // Event listener for Enter key press
  cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault()
      searchCity()
      cityInput.value = ""
      setHeadHeight()
    }
  })

  // Get location by coordinates
  document.getElementById("location").addEventListener("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  })

  async function showPosition(position) {
    // Fetch location data based on latitude and longitude
    const lat = position.coords.latitude
    const lon = position.coords.longitude

    try {
      //const openCageKey = config.OPEN_CAGE_KEY
      const openCageKey = import.meta.env.VITE_OPEN_CAGE_KEY
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${openCageKey}`
      )
      if (!response.ok) {
        throw new Error("Failed to get location data")
      }
      const data = await response.json()
      let city = data.results[0].components.city
      let uniqueId = Date.now()
      setHeadHeight()
      getWeatherData(city, uniqueId)
      updateBackgroundImage(city, uniqueId)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  async function getWeatherData(city) {
    // Fetch weather data from the server
    //const apiKey = config.API_KEY
    const apiKey = import.meta.env.VITE_API_KEY
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    )
    let uniqueId = Date.now()
    if (!response.ok) {
      alert("No weather found.")
      return
    }

    let data = await response.json()
    const dates = data.list
      ? data.list.map((item) => new Date(item.dt * 1000))
      : []
    const temperatures = data.list
      ? data.list.map((item) => item.main.temp)
      : []

    // Pass the fetched data to both functions
    updateWeatherData(data, dates, temperatures, uniqueId)
    updateBackgroundImage(city, uniqueId)
    setHeadHeight()
  }

  // Fetch and display a background image for a given city
  const updateBackgroundImage = async (city, uniqueId) => {
    try {
      //const apiKeyUnsplash = config.API_KEY_UNSPLASH
      const apiKeyUnsplash = import.meta.env.VITE_API_KEY_UNSPLASH
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKeyUnsplash}`
      )
      if (!response.ok) {
        throw new Error("Failed to get city image from Unsplash")
      }
      const data = await response.json()

      let imageCarousel = document.querySelector(`#image-carousel-${uniqueId}`)
      if (imageCarousel) {
        imageCarousel.innerHTML = ""
        data.results.forEach((image) => {
          let img = document.createElement("img")
          img.src = image.urls.regular
          img.classList.add("carousel-image")
          imageCarousel.appendChild(img)
        })
        startCarousel(uniqueId)
      }
    } catch (error) {
      console.error(error)
    }
  }

  //Image Carousel
  function startCarousel(uniqueId) {
    let carouselImages = document.querySelectorAll(
      `#image-carousel-${uniqueId} .carousel-image`
    )
    let currentIndex = 0
    carouselImages[currentIndex].style.display = "block"

    setInterval(() => {
      carouselImages[currentIndex].style.display = "none"
      currentIndex = (currentIndex + 1) % carouselImages.length
      carouselImages[currentIndex].style.display = "block"
    }, 3000)
  }

  // Display weather data and create/update the temperature chart
  function updateWeatherData(data, dates, temperatures, uniqueId) {
    let maxTemp = Math.max(...data.list.map((wd) => wd.main.temp))
    let celsiusTemperature = Math.round(maxTemp)

    let existingCard = Array.from(
      document.querySelectorAll(".weather-card")
    ).find((card) => card.dataset.city === data.city.name)
    if (existingCard) {
      let errorMessage = document.createElement("p")
      errorMessage.classList.add("error-message")
      errorMessage.innerHTML = `The weather for ${data.city.name} is already being displayed.<br/> Please enter another city.`
      weatherDisplay.appendChild(errorMessage)

      setTimeout(() => {
        errorMessage.remove()
      }, 3000)

      return
    }

    let card = document.createElement("div")
    card.id = `card-${uniqueId}`
    card.classList.add("weather-card")
    card.dataset.city = data.city.name

    setTimeout(() => {
      card.innerHTML = `
      <div class="card-wrapper">
      <div class="card-header">
        <h2 class="main">${data.city.name}</h2>
      </div>
      <div class="card-body">
        <div class="left">
          <p id="date-display-${uniqueId}" class="date-display">
            ${new Date(data.list[0].dt * 1000).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <img src="${getWeatherIcon(
            data.list[0].weather[0].id
          )}" alt="weather icon">
          <p class="temperature-data">
            <span class="main units units-${uniqueId}">${Math.round(
        maxTemp
      )}°</span>
            <a href="#" id="celsius-link-${uniqueId}" class="active">C</a> |
            <a href="#" id="fahrenheit-link-${uniqueId}">F</a>
          </p>
        </div>
        <div class="right">
          <span class="element">
            <img src="https://res.cloudinary.com/dceofngdq/image/upload/v1688411678/humidity_qfsyz5.svg" class="icon-right">
            <p>
              <span class="static">Humidity:</span> ${
                data.list[0].main.humidity
              }%
            </p>
          </span>
    
          <span class="element">
            <img src="https://res.cloudinary.com/dceofngdq/image/upload/v1688411706/windsock_ezvyob.svg" class="icon-right">
            <p>
              <span class="static">Wind:</span> ${data.list[0].wind.speed} km/h
            </p>
          </span>
    
          <span class="element pressure">
          <img src="https://res.cloudinary.com/dceofngdq/image/upload/v1688411689/pressure-high_mtekva.svg" class="icon-right pressure-high">
          <img src="https://res.cloudinary.com/dceofngdq/image/upload/v1688411689/pressure-low_pj5ss5.svg" class="icon-right pressure-low none">
          <p>
            <span class="static">Pressure:</span> ${
              data.list[0].main.pressure
            } hPa
          </p>
        </span>

          <span class="element">
            <img src="https://res.cloudinary.com/dceofngdq/image/upload/v1688411698/umbrella_shmk5w.svg" class="icon-right">
            <p>
              <span class="static">Precipitation:</span> ${data.list[0].pop}%
            </p>
          </span>
        </div>
      </div>
      <div class="image-container">
        <div id="image-carousel-${uniqueId}" class="image-carousel"></div>
        <canvas id="temperature-chart-${uniqueId}" class="temperature-chart"></canvas>
      </div>
      <div id="weather-forecast-${uniqueId}" class="weather-forecast">
      </div>
      <div class="card-footer">
        <img src="https://res.cloudinary.com/dceofngdq/image/upload/v1688411692/sunrise_p6le4x.svg" alt="sunrise icon" class="sunrise">
        <p>
          Sunrise:
          ${new Date(data.city.sunrise * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          |
        </p>
        <img src="https://res.cloudinary.com/dceofngdq/image/upload/v1688411692/sunset_ja0dfu.svg" alt="sunset icon" class="sunset">
        <p>
          Sunset:
          ${new Date(data.city.sunset * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
    </div>
`
      setHeadHeight()

      // Check if the card already exists and replace it if it does
      let cards = document.querySelectorAll(".weather-card")
      if (cards.length >= 3) {
        cards[0].remove()
      }
      weatherDisplay.appendChild(card)

      displayForecast(data, uniqueId)

      // Convert temperature
      let fahrenheitLink = document.querySelector(
        `#fahrenheit-link-${uniqueId}`
      )
      if (fahrenheitLink) {
        fahrenheitLink.addEventListener("click", displayFahrenheitTemperature)
      } else {
        console.error(`Could not find #fahrenheit-link-${uniqueId}`)
      }

      let celsiusLink = document.querySelector(`#celsius-link-${uniqueId}`)
      if (celsiusLink) {
        celsiusLink.addEventListener("click", displayCelsiusTemperature)
      } else {
        console.error(`Could not find #celsius-link-${uniqueId}`)
      }
    }, 0)

    updateBackgroundImage(data.city.name)
    createTemperatureChart(`temperature-chart-${uniqueId}`, dates, temperatures)

    return uniqueId
  }
  // Display the forecast data

  function displayForecast(data, uniqueId) {
    let forecastElement = document.querySelector(
      `#weather-forecast-${uniqueId}`
    )
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
  handlePressureIcons()

  // Pressure icon toggle
  function handlePressureIcons() {
    const pressureElement = document.querySelector(".element")
    const pressureHighIcon = pressureElement.querySelector(".pressure-high")
    const pressureLowIcon = pressureElement.querySelector(".pressure-low")

    if (data.list[0].main.pressure > 1000) {
      pressureHighIcon.classList.remove("none")
      pressureLowIcon.classList.add("none")
    } else {
      pressureHighIcon.classList.add("none")
      pressureLowIcon.classList.remove("none")
    }
  }

  // Function to search for a city
  function searchCity() {
    let city = cityInput.value
    let uniqueId = Date.now()
    getWeatherData(city, uniqueId++)
    updateBackgroundImage(city, uniqueId++)
    setHeadHeight()

    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
    searchHistory.unshift(city)
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
  }

  // Load the last searched cities from localStorage
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory"))
  if (searchHistory) {
    cityInput.value = searchHistory[0]
    searchHistory.forEach(function (city) {
      let uniqueId = Date.now()
      getWeatherData(city, uniqueId)
      updateBackgroundImage(city, uniqueId)
      setHeadHeight()
    })
  }
})
