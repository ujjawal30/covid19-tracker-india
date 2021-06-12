var dates = document.querySelectorAll(".dates");
var totalConfirmedSeries = document.querySelectorAll(".total-confirmed");
var dailyConfirmedSeries = document.querySelectorAll(".daily-confirmed");
var dailyRecoveredSeries = document.querySelectorAll(".daily-recovered");
var totalRecoveredSeries = document.querySelectorAll(".total-recovered");
var dailyDeceasedSeries = document.querySelectorAll(".daily-deceased");
var totalDeceasedSeries = document.querySelectorAll(".total-deceased");
var dailyActiveSeries, totalActiveSeries;
var chartDaily = null,
  chartTotal = null;

function viewCharts(activeMap, chartView) {
  document.getElementById("chart-total").innerHTML = "";
  document.getElementById("chart-daily").innerHTML = "";

  if (chartDaily != null || chartTotal != null) {
    chartDaily.destroy();
    chartTotal.destroy();
  }

  var dataTotal = [];
  var dataDaily = [];

  if (activeMap == "C") {
    for (i = 0; i < dates.length; i++) {
      dataTotal.push({
        x: dates[i].innerHTML,
        y: Number(totalConfirmedSeries[i].innerHTML),
      });
      dataDaily.push({
        x: dates[i].innerHTML,
        y: Number(dailyConfirmedSeries[i].innerHTML),
      });
    }
    var color = "#bc6e0d";
    var title = "Confirmed";
  }

  if (activeMap == "A") {
    for (i = 0; i < dates.length; i++) {
      totalActiveSeries =
        Number(totalConfirmedSeries[i].innerHTML) -
        Number(totalRecoveredSeries[i].innerHTML) -
        Number(totalDeceasedSeries[i].innerHTML);
      dailyActiveSeries =
        Number(dailyConfirmedSeries[i].innerHTML) -
        Number(dailyRecoveredSeries[i].innerHTML) -
        Number(dailyDeceasedSeries[i].innerHTML);
      dataTotal.push({
        x: dates[i].innerHTML,
        y: totalActiveSeries,
      });
      dataDaily.push({
        x: dates[i].innerHTML,
        y: dailyActiveSeries,
      });
    }
    var color = "#084298";
    var title = "Active";
  }

  if (activeMap == "R") {
    for (i = 0; i < dates.length; i++) {
      totalActiveSeries = dataTotal.push({
        x: dates[i].innerHTML,
        y: Number(totalRecoveredSeries[i].innerHTML),
      });
      dataDaily.push({
        x: dates[i].innerHTML,
        y: Number(dailyRecoveredSeries[i].innerHTML),
      });
    }
    var color = "#006d21";
    var title = "Recovered";
  }

  if (activeMap == "D") {
    for (i = 0; i < dates.length; i++) {
      dataTotal.push({
        x: dates[i].innerHTML,
        y: Number(totalDeceasedSeries[i].innerHTML),
      });
      dataDaily.push({
        x: dates[i].innerHTML,
        y: Number(dailyDeceasedSeries[i].innerHTML),
      });
    }
    var color = "#9c000d";
    var title = "Deceased";
  }

  if (chartView != 0) {
    dataTotal = dataTotal.slice(Math.max(dataTotal.length - chartView, 0));
    dataDaily = dataDaily.slice(Math.max(dataDaily.length - chartView, 0));
  }

  Chart.defaults.font.family = "Product Sans";
  Chart.defaults.font.weight = "bold";

  var daily = document.getElementById("chart-daily");
  chartDaily = new Chart(daily, {
    type: "bar",
    data: {
      datasets: [
        {
          label: "Daily",
          data: dataDaily,
          backgroundColor: [color],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      locale: "hi-IN",
      animation: true,
      layout: {
        padding: 20,
      },
      plugins: {
        title: {
          display: true,
          text: "Daily " + title,
          color: "#000",
          font: {
            size: 18,
          },
          padding: {
            top: 0,
            bottom: 10,
          },
        },
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "#e6e6e6",
          titleColor: "#000",
          bodyColor: "#000",
          borderColor: color,
          borderWidth: 1,
          titleFont: {
            size: 12,
          },
        },
      },
      scales: {
        x: {
          type: "time",
          time: {
            displayFormats: {
              month: "MMM yyyy",
              day: "dd MMM",
            },
            tooltipFormat: "MMMM dd, yyyy",
          },
          grid: {
            borderColor: color,
            borderWidth: 2,
            tickColor: color,
            tickWidth: 2,
            drawOnChartArea: false,
          },
          ticks: {
            color: "#000",
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            borderColor: color,
            borderWidth: 2,
            tickColor: color,
            tickWidth: 2,
          },
          ticks: {
            color: "#000",
            callback: function (value, index, values) {
              if (value >= 10000000) {
                return value / 10000000 + "Cr";
              } else if (value >= 100000 && value < 10000000) {
                return value / 100000 + "L";
              } else if (value >= 1000 && value < 100000) {
                return value / 1000 + "K";
              } else if (value > -1000 && value < 1000) {
                return value.toLocaleString("hi-IN");
              } else if (value > -100000 && value <= -1000) {
                return value / 1000 + "K";
              } else if (value <= -100000) {
                return value / 100000 + "L";
              }
            },
          },
        },
      },
    },
  });

  var total = document.getElementById("chart-total");
  chartTotal = new Chart(total, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Total",
          data: dataTotal,
          backgroundColor: [color],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      locale: "hi-IN",
      animation: true,
      layout: {
        padding: 20,
      },
      plugins: {
        title: {
          display: true,
          text: "Total " + title,
          color: "#000",
          font: {
            size: 18,
          },
          padding: {
            top: 0,
            bottom: 10,
          },
        },
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "#e6e6e6",
          titleColor: "#000",
          bodyColor: "#000",
          borderColor: color,
          borderWidth: 1,
          titleFont: {
            size: 12,
          },
        },
      },
      scales: {
        x: {
          type: "time",
          time: {
            displayFormats: {
              month: "MMM yyyy",
              day: "dd MMM",
            },
            tooltipFormat: "MMMM dd, yyyy",
          },
          grid: {
            borderColor: color,
            borderWidth: 2,
            tickColor: color,
            tickWidth: 2,
            drawOnChartArea: false,
          },
          ticks: {
            color: "#000",
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            borderColor: color,
            borderWidth: 2,
            tickColor: color,
            tickWidth: 2,
          },
          ticks: {
            color: "#000",
            callback: function (value, index, values) {
              if (value >= 10000000) {
                return value / 10000000 + "Cr";
              } else if (value >= 100000 && value < 10000000) {
                return value / 100000 + "L";
              } else if (value >= 1000 && value < 100000) {
                return value / 1000 + "K";
              } else if (value >= 0 && value < 1000) {
                return value.toLocaleString("hi-IN");
              } else if (value < 0) {
                value = Math.abs(value);
                return "-" + value / 1000 + "K";
              }
            },
          },
        },
      },
    },
  });
}
