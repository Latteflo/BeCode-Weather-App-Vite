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

export default createTemperatureChart
