// Weather icons
function getWeatherIcon(weatherCode) {
  const weatherIcons = {
    "01d":
      "https://res.cloudinary.com/dceofngdq/image/upload/v1688411194/01d_uetvld.svg",
    "01n":
      "https://res.cloudinary.com/dceofngdq/image/upload/v1688411708/01n_jckp8n.svg",
    "02d":
      "https://res.cloudinary.com/dceofngdq/image/upload/v1688411707/02d_sk0wn7.svg",
    "02n":
      "https://res.cloudinary.com/dceofngdq/image/upload/v1688411707/02n_zxzj4o.svg",
    "03d":
      "https://res.cloudinary.com/dceofngdq/image/upload/v1688411708/03d_vaduqw.svg",
    "03n":
      "https://res.cloudinary.com/dceofngdq/image/upload/v1688411708/03n_xu5if6.svg",
    "04d":
      "https://res.cloudinary.com/dceofngdq/image/upload/v1688411709/04d_fdi5ln.svg",
    "04n":
      "https://res.cloudinary.com/dceofngdq/image/upload/v1688411709/04n_j7j3wy.svg",
    "09d":
      "https://res.cloudinary.com/dceofngdq/image/upload/v1688411708/09d_myrx08.svg",
    "09n":
      "https://res.cloudinary.com/dceofngdq/image/upload/v1688411709/09n_p2acrp.svg",
    "10d":
      "https://res.cloudinary.com/dceofngdq/image/upload/v1688411709/10d_fk5rlr.svg",
    "10n":
      "https://res.cloudinary.com/dceofngdq/image/upload/v1688411709/10n_bqsacv.svg",
    "11d":
      "https://res.cloudinary.com/dceofngdq/image/upload/v1688411710/11d_yocnaa.svg",
    "11n":
      "https://res.cloudinary.com/dceofngdq/image/upload/v1688411710/11n_if1who.svg",
    "13d":
      "https://res.cloudinary.com/dceofngdq/image/upload/v1688411711/13d_h8gxwx.svg",
    "13n":
      "https://res.cloudinary.com/dceofngdq/image/upload/v1688411711/13n_biqcet.svg",
    "50d":
      "https://res.cloudinary.com/dceofngdq/image/upload/v1688411711/50d_sv8ypp.svg",
    "50n":
      "https://res.cloudinary.com/dceofngdq/image/upload/v1688411711/50n_mpubgu.svg",
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

export default getWeatherIcon
