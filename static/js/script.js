var colors, range, accent, background, legendText, activeMap, chartView;

const stateName = document.getElementsByClassName("state-name");

const mapStateNameDOM = document.querySelector(".map-state-name");
const mapStateNumberDOM = document.querySelector(".map-state-number");
const mapStateMapDOM = document.querySelector(".map-state-map");

const syncIcon = "<i class='fas fa-sync fa-sm'></i>";

convertDateTime();
viewConfirmed();
changeChart(90);

function viewMaps(title, colors, range, accent, background, legendText) {
  try {
    var state, data, stateMapDOM;
    const map = title.toLowerCase();
    const totalData = document.getElementsByClassName(map);
    const legendDataDOM = document.getElementsByClassName("legend-data");

    for (i = 0; i < stateName.length; i++) {
      state = stateName[i].innerHTML.replace(/ /g, "").toLowerCase();
      data = removeCommas(totalData[i].textContent);
      stateMapDOM = document.getElementById(state);

      document.getElementById("borders").style.stroke = accent;
      stateMapDOM.style.stroke = accent;

      if (data > range[0]) {
        stateMapDOM.style.fill = colors[0];
      } else if (data <= range[0] && data > range[1]) {
        stateMapDOM.style.fill = colors[1];
      } else if (data <= range[1] && data > range[2]) {
        stateMapDOM.style.fill = colors[2];
      } else if (data <= range[2] && data > range[3]) {
        stateMapDOM.style.fill = colors[3];
      } else {
        stateMapDOM.style.fill = colors[4];
      }
    }

    mapStateNameDOM.style.cssText =
      "color: " +
      accent +
      "; background-color: " +
      background +
      "; border-radius: 5px";

    mapStateNumberDOM.innerHTML = document.getElementById(
      "india-" + map
    ).textContent;
    mapStateNumberDOM.style.color = accent;

    mapStateMapDOM.innerHTML = title + " " + syncIcon;
    mapStateMapDOM.style.color = accent;
    mapStateMapDOM.style.border = accent + " dashed 2px";

    for (i = 0; i < legendDataDOM.length; i++) {
      legendDataDOM[i].style.backgroundColor = colors[i];
      legendDataDOM[i].textContent = legendText[i];
    }

    document.getElementById("chart-daily").style.backgroundColor = background;
    document.getElementById("chart-total").style.backgroundColor = background;

    chartView = Number(localStorage.getItem("chartView"));
    viewCharts(activeMap, chartView);
  } catch (error) {}
}

function enableCard(cardIndex) {
  const cards = document.getElementsByClassName("card");
  const current = document.getElementsByClassName("enabled");
  try {
    current[0].className = current[0].className.replace(" enabled", "");
    cards[cardIndex].className += " enabled";
  } catch (error) {}
}

function viewConfirmed() {
  colors = ["#d77d0f", "#f2a240", "#f5b970", "#f8d0a0", "#fce8cf"];
  range = [5000000, 1000000, 500000, 100000];
  legendText = ["Above 50L", "50L - 10L", "10L - 5L", "5L - 1L", "Below 1L"];
  accent = "#bc6e0d";
  background = "#faeabd";

  activeMap = "C";
  localStorage.setItem("i", 1);

  viewMaps("Confirmed", colors, range, accent, background, legendText);
  enableCard(0);
}

function viewActive() {
  colors = ["#0d69f2", "#3d87f5", "#6ea5f7", "#9ec3fa", "#cfe1fc"];
  range = [100000, 50000, 10000, 5000];
  legendText = ["Above 1L", "1L - 50K", "50K - 10K", "10K - 5K", "Below 5K"];
  accent = "#084298";
  background = "#cfe2ff";

  activeMap = "A";
  localStorage.setItem("i", 2);

  viewMaps("Active", colors, range, accent, background, legendText);
  enableCard(1);
}

function viewRecovered() {
  colors = ["#40903c", "#62bb5d", "#85ca81", "#a8d9a5", "#cbe8c9"];
  range = [5000000, 1000000, 500000, 100000];
  legendText = ["Above 50L", "50L - 10L", "10L - 5L", "5L - 1L", "Below 1L"];
  accent = "#006d21";
  background = "#d3f7e6";

  activeMap = "R";
  localStorage.setItem("i", 3);

  viewMaps("Recovered", colors, range, accent, background, legendText);
  enableCard(2);
}

function viewDeceased() {
  colors = ["#cc0011", "#ff3344", "#ff6673", "#ff99a2", "#ffccd0"];
  range = [50000, 10000, 5000, 1000];
  legendText = ["Above 50K", "50K - 10K", "10K - 5K", "5K - 1K", "Below 1K"];
  accent = "#9c000d";
  background = "#f8d7da";

  activeMap = "D";
  localStorage.setItem("i", 0);

  viewMaps("Deceased", colors, range, accent, background, legendText);
  enableCard(3);
}

function changeSortIcon(n, dir) {
  const icons = document.getElementsByClassName("sort-icon");
  const th = [1, 2, 4, 5, 7];
  n = th.indexOf(n);
  for (i = 0; i < icons.length; i++)
    icons[i].className = "fas fa-sort sort-icon";
  if (dir == "desc") icons[n].className = "fas fa-caret-down sort-icon";
  else if (dir == "asc") icons[n].className = "fas fa-caret-up sort-icon";
}

function sortSerial() {
  var n = document.querySelectorAll(".serial");
  for (i = 0; i < n.length; i++) {
    document.querySelectorAll(".serial")[i].innerHTML = i + 1;
  }
}

function sortState() {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("state-table");
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[1];
      y = rows[i + 1].getElementsByTagName("td")[1];
      if (dir == "desc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "asc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "desc") {
        dir = "asc";
        switching = true;
      }
    }
  }
  changeSortIcon(1, dir);
  sortSerial();
}

function removeCommas(n) {
  return Number(n.replace(/,/g, ""));
}

function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("state-table");
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      y = removeCommas(rows[i + 1].getElementsByTagName("td")[n].innerHTML);
      x = removeCommas(rows[i].getElementsByTagName("td")[n].innerHTML);
      if (dir == "desc") {
        if (x < y) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "asc") {
        if (x > y) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "desc") {
        dir = "asc";
        switching = true;
      }
    }
  }
  changeSortIcon(n, dir);
  sortSerial();
}

function hoverStateData(state, data, map) {
  stateId = state.replace(/ /g, "").toLowerCase();
  const stateMapDOM = document.getElementById(stateId);
  stateMapDOM.onmousemove = function () {
    mapStateNameDOM.innerHTML = state;
    mapStateNumberDOM.innerHTML = data;
  };
  stateMapDOM.onmouseout = function () {
    mapStateNameDOM.innerHTML = "India";
    document.querySelector(".map-state-number").innerHTML =
      document.getElementById("india-" + map).textContent;
  };
}

function hoverState(state) {
  const totalConfirmed = document.getElementsByClassName("confirmed");
  const totalActive = document.getElementsByClassName("active");
  const totalRecovered = document.getElementsByClassName("recovered");
  const totalDeceased = document.getElementsByClassName("deceased");

  for (i = 0; i < stateName.length; i++) {
    const statename = stateName[i].innerHTML.replace(/ /g, "").toLowerCase();
    if (state == statename) {
      sname = stateName[i].textContent;
      confirmed = totalConfirmed[i].textContent;
      active = totalActive[i].textContent;
      recovered = totalRecovered[i].textContent;
      deceased = totalDeceased[i].textContent;
      break;
    }
  }
  if (activeMap == "C") hoverStateData(sname, confirmed, "confirmed");
  if (activeMap == "A") hoverStateData(sname, active, "active");
  if (activeMap == "R") hoverStateData(sname, recovered, "recovered");
  if (activeMap == "D") hoverStateData(sname, deceased, "deceased");
}

function changeChart(c) {
  localStorage.setItem("chartView", c);
  const chartDays = document.getElementsByClassName("chart-item");
  for (const chartDay of chartDays) {
    chartDay.style.backgroundColor = "";
  }
  try {
    document.getElementById("chart-" + c).style.backgroundColor = "#b9b9b9";
    viewCharts(activeMap, c);
  } catch (error) {}
}

var maps = [viewConfirmed, viewActive, viewRecovered, viewDeceased];

var index;
localStorage.setItem("i", 1);
function cycleMap() {
  index = Number(localStorage.getItem("i"));
  maps[index]();
  localStorage.setItem("i", index + 1);
  if (index == 3) {
    localStorage.setItem("i", 0);
  }
}

var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

function convertDateTime() {
  const time = document.getElementsByClassName("update-time");
  const currentTime = new Date();
  var updateTime, delta, period;

  const options = {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  updateTime = new Date(time[0].textContent);
  time[0].innerHTML =
    "<b>" + updateTime.toLocaleTimeString("en-us", options) + "</b>";

  for (i = 1; i < time.length; i++) {
    updateTime = new Date(time[i].textContent);
    delta = Math.abs(updateTime - currentTime) / 1000;

    period = Math.floor(delta / 86400);
    if (period > 0) {
      time[i].textContent = period + " day ago";
      continue;
    }
    delta -= period * 86400;

    period = Math.floor(delta / 3600) % 24;
    if (period === 1) {
      time[i].textContent = period + " hour ago";
      continue;
    } else if (period > 1) {
      time[i].textContent = period + " hours ago";
      continue;
    }
    delta -= period * 3600;

    period = Math.floor(delta / 60) % 60;
    if (period === 1) {
      time[i].textContent = period + " minute ago";
      continue;
    } else if (period > 1) {
      time[i].textContent = period + " minutes ago";
      continue;
    }
  }
}
