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

export default updateBackgroundImage
