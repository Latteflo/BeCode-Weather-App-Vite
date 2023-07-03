document.addEventListener("DOMContentLoaded", () => {
  // Function to handle setting the height of the .head element
  function setHeadHeight() {
    let headElement = document.querySelector(".head")
    let weatherDisplay = document.getElementById("weather-display")
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory"))

    if (weatherDisplay.childElementCount === 0 && !searchHistory) {
      headElement.style.height = "100vh"
    } else {
      headElement.style.height = ""
    }
  }
  // Get references to DOM elements
  let cityInput = document.getElementById("city-input")
  let submitButton = document.getElementById("submit-button")
  let clearButton = document.getElementById("clear-button")
  let weatherDisplay = document.getElementById("weather-display")

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

  // Weather icons
  function getWeatherIcon(weatherCode) {
    const weatherIcons = {
      "01d": "https://res.cloudinary.com/dceofngdq/image/upload/v1688411194/01d_uetvld.svg",
      "01n": "https://res.cloudinary.com/dceofngdq/image/upload/v1688411708/01n_jckp8n.svg",
      "02d": "https://res.cloudinary.com/dceofngdq/image/upload/v1688411707/02d_sk0wn7.svg",
      "02n": "https://res.cloudinary.com/dceofngdq/image/upload/v1688411707/02n_zxzj4o.svg",
      "03d": "https://res.cloudinary.com/dceofngdq/image/upload/v1688411708/03d_vaduqw.svg",
      "03n": "https://res.cloudinary.com/dceofngdq/image/upload/v1688411708/03n_xu5if6.svg",
      "04d": "https://res.cloudinary.com/dceofngdq/image/upload/v1688411709/04d_fdi5ln.svg",
      "04n": "https://res.cloudinary.com/dceofngdq/image/upload/v1688411709/04n_j7j3wy.svg",
      "09d": "https://res.cloudinary.com/dceofngdq/image/upload/v1688411708/09d_myrx08.svg",
      "09n": "https://res.cloudinary.com/dceofngdq/image/upload/v1688411709/09n_p2acrp.svg",
      "10d": "https://res.cloudinary.com/dceofngdq/image/upload/v1688411709/10d_fk5rlr.svg",
      "10n": "https://res.cloudinary.com/dceofngdq/image/upload/v1688411709/10n_bqsacv.svg",
      "11d": "https://res.cloudinary.com/dceofngdq/image/upload/v1688411710/11d_yocnaa.svg",
      "11n": "https://res.cloudinary.com/dceofngdq/image/upload/v1688411710/11n_if1who.svg",
      "13d": "https://res.cloudinary.com/dceofngdq/image/upload/v1688411711/13d_h8gxwx.svg",
      "13n": "https://res.cloudinary.com/dceofngdq/image/upload/v1688411711/13n_biqcet.svg",
      "50d": "https://res.cloudinary.com/dceofngdq/image/upload/v1688411711/50d_sv8ypp.svg",
      "50n": "https://res.cloudinary.com/dceofngdq/image/upload/v1688411711/50n_mpubgu.svg",
      200: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411696/thunderstorms-day-rain_nmyyw4.svg",
      201: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411696/thunderstorms-day-rain_nmyyw4.svg",
      202: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411696/thunderstorms-day-rain_nmyyw4.svg",
      210: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411696/thunderstorms-day_a7mqun.svg",
      211: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411696/thunderstorms-day_a7mqun.svg",
      212: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411696/thunderstorms-day_a7mqun.svg",
      221: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411696/thunderstorms-day_a7mqun.svg",
      230: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411696/thunderstorms-day-rain_nmyyw4.svg",
      231: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411696/thunderstorms-day-rain_nmyyw4.svg",
      232: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411696/thunderstorms-day-rain_nmyyw4.svg",
      300: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411714/drizzle_isql7k.svg",
      301: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411714/drizzle_isql7k.svg",
      302: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411714/drizzle_isql7k.svg",
      310: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411714/drizzle_isql7k.svg",
      311: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411714/drizzle_isql7k.svg",
      312: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411714/drizzle_isql7k.svg",
      313: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411714/drizzle_isql7k.svg",
      314: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411714/drizzle_isql7k.svg",
      321: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411714/drizzle_isql7k.svg",
      500: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411690/rain_plriga.svg",
      501: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411690/rain_plriga.svg",
      502: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411690/rain_plriga.svg",
      503: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411690/rain_plriga.svg",
      504: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411690/rain_plriga.svg",
      511: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411690/sleet_zhhif8.svg",
      520: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411714/drizzle_isql7k.svg",
      521: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411714/drizzle_isql7k.svg",
      522: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411714/drizzle_isql7k.svg",
      531: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411714/drizzle_isql7k.svg",
      600: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411691/snow_pk9eta.svg",
      601: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411691/snow_pk9eta.svg",
      602: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411691/snow_pk9eta.svg",
      611: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411690/sleet_zhhif8.svg",
      612: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411690/sleet_zhhif8.svg",
      613: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411690/sleet_zhhif8.svg",
      615: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411691/snow_pk9eta.svg",
      616: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411691/snow_pk9eta.svg",
      620: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411691/snow_pk9eta.svg",
      621: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411691/snow_pk9eta.svg",
      622: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411691/snow_pk9eta.svg",
      701: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411680/mist_bae3c7.svg",
      711: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411691/smoke_wqumnt.svg",
      721: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411678/haze-day_xim9hq.svg",
      722: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411680/haze-night_s92kl8.svg",
      731: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411677/dust-wind_sdmsvj.svg",
      741: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411678/fog-day_ryovix.svg",
      751: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411713/dust_salsa8.svg",
      761: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411713/dust_salsa8.svg",
      762: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411713/dust_salsa8.svg",
      771: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411702/wind_ipbhb3.svg",
      781: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411698/tornado_zwb6ly.svg",
      800: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411713/clear-day_qlusp5.svg",
      801: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411684/partly-cloudy-day_q0umup.svg",
      802: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411684/partly-cloudy-day_q0umup.svg",
      803: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411683/overcast-day_xtigus.svg",
      804: "https://res.cloudinary.com/dceofngdq/image/upload/v1688411683/overcast-day_xtigus.svg",
    }
    return weatherIcons[weatherCode] || "not-available.svg"
  }

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
      const openCageKey = import.meta.env.VITE_OPEN_CAGE_KEY;
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

  // Update the chart
  function createTemperatureChart(chartId, dates, temperatures) {
    setTimeout(() => {
      let ctx = document.getElementById(chartId)
      if (ctx === null) {
        console.error(`Element with id ${chartId} does not exist`)
        return
      }
      ctx = ctx.getContext("2d")

      new Chart(ctx, {
        type: "line",
        data: {
          labels: dates.map((date) =>
            date.toLocaleTimeString([], { hour: "2-digit" })
          ),
          datasets: [
            {
              label: "Temperature",
              data: temperatures,
              fill: true,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgb(75, 192, 192)",
              pointBackgroundColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: {
          radius: 0,
          hitRadius: 5,
          hoverRadius: 5,
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      })
    }, 0)
  }

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