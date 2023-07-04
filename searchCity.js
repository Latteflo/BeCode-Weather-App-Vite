let cityInput = document.getElementById("city-input")

// Function to search for a city
function searchCity() {
  let city = cityInput.value
  let uniqueId = Date.now()

  handleCity(city, uniqueId)

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
    handleCity(city, uniqueId)
  })
}

export default searchCity
