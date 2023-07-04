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

export default setHeadHeight
