var state, confirmed, activeMap, chartView;

const stateName = document.querySelectorAll(".state-name");
const totalConfirmed = document.querySelectorAll(".confirmed");
const totalActive = document.querySelectorAll(".active");
const totalRecovered = document.querySelectorAll(".recovered");
const totalDeceased = document.querySelectorAll(".deceased");

const mapStateNameDOM = document.querySelector(".map-state-name");
const mapStateNumberDOM = document.querySelector(".map-state-number");
const mapStateMapDOM = document.querySelector(".map-state-map");

const syncIcon = "<i class='fas fa-sync fa-sm'></i>";

changeChart(90);
viewConfirmed();

function viewConfirmed() {
  for (i = 0; i < stateName.length; i++) {
    const state = stateName[i].innerHTML.replace(/ /g, "").toLowerCase();
    const confirmed = removeCommas(totalConfirmed[i].textContent);
    const stateMapDOM = document.getElementById(state);

    document.getElementById("borders").style.stroke = "#bc6e0d";
    stateMapDOM.style.stroke = "#bc6e0d";
    if (confirmed > 5000000) {
      stateMapDOM.style.fill = "#bc6e0d";
    } else if (confirmed <= 5000000 && confirmed > 1000000) {
      stateMapDOM.style.fill = "#eca145";
    } else if (confirmed <= 1000000 && confirmed > 500000) {
      stateMapDOM.style.fill = "#f1bc7a";
    } else if (confirmed <= 500000 && confirmed > 100000) {
      stateMapDOM.style.fill = "#f7d7af";
    } else {
      stateMapDOM.style.fill = "#fcf1e4";
    }
  }

  mapStateNameDOM.classList.remove("new-active");
  mapStateNameDOM.classList.remove("new-recovered");
  mapStateNameDOM.classList.remove("new-deceased");
  mapStateNameDOM.classList.add("new-confirmed");
  mapStateNameDOM.innerHTML = "India";

  mapStateNumberDOM.innerHTML =
    document.getElementById("india-confirmed").textContent;
  mapStateNumberDOM.style.color = "#bc6e0d";

  mapStateMapDOM.innerHTML = "Confirmed " + syncIcon;
  mapStateMapDOM.style.color = "#bc6e0d";
  mapStateMapDOM.style.border = "#bc6e0d dashed 2px";

  const legendColor = ["#bc6e0d", "#eca145", "#f1bc7a", "#f7d7af", "#fcf1e4"];
  const legendText = ["Above 50L", "50L - 10L", "10L - 5L", "5L - 1L", "Below 1L"];
  changeLegend(legendColor, legendText);

  document.getElementById("chart-daily").style.backgroundColor = "#fcf1e4";
  document.getElementById("chart-total").style.backgroundColor = "#fcf1e4";

  activeMap = "C";

  localStorage.setItem("i", 1);
  chartView = Number(localStorage.getItem("chartView"));
  viewCharts(activeMap, chartView);
}

function viewActive() {
  for (i = 0; i < stateName.length; i++) {
    const state = stateName[i].innerHTML.replace(/ /g, "").toLowerCase();
    const active = removeCommas(totalActive[i].textContent);
    const stateMapDOM = document.getElementById(state);

    document.getElementById("borders").style.stroke = "#084298";
    stateMapDOM.style.stroke = "#084298";
    if (active > 100000) {
      stateMapDOM.style.fill = "#0d69f2";
    } else if (active <= 100000 && active > 50000) {
      stateMapDOM.style.fill = "#3d87f5";
    } else if (active <= 50000 && active > 10000) {
      stateMapDOM.style.fill = "#6ea5f7";
    } else if (active <= 10000 && active > 5000) {
      stateMapDOM.style.fill = "#9ec3fa";
    } else {
      stateMapDOM.style.fill = "#cfe1fc";
    }
  }

  mapStateNameDOM.classList.remove("new-confirmed");
  mapStateNameDOM.classList.remove("new-recovered");
  mapStateNameDOM.classList.remove("new-deceased");
  mapStateNameDOM.classList.add("new-active");
  mapStateNameDOM.innerHTML = "India";

  mapStateNumberDOM.innerHTML =
    document.getElementById("india-active").textContent;
  mapStateNumberDOM.style.color = "#084298";

  mapStateMapDOM.innerHTML = "Active " + syncIcon;
  mapStateMapDOM.style.color = "#084298";
  mapStateMapDOM.style.border = "#084298 dashed 2px";

  const legendColor = ["#0d69f2", "#3d87f5", "#6ea5f7", "#9ec3fa", "#cfe1fc"];
  const legendText = ["Above 1L", "1L - 50K", "50K - 10K", "10K - 5K", "Below 5K"];
  changeLegend(legendColor, legendText);

  document.getElementById("chart-daily").style.backgroundColor = "#ebf3fe";
  document.getElementById("chart-total").style.backgroundColor = "#ebf3fe";
  activeMap = "A";

  localStorage.setItem("i", 2);
  chartView = Number(localStorage.getItem("chartView"));
  viewCharts(activeMap, chartView);
}

function viewRecovered() {
  for (i = 0; i < stateName.length; i++) {
    const state = stateName[i].innerHTML.replace(/ /g, "").toLowerCase();
    const recovered = removeCommas(totalRecovered[i].textContent);
    const stateMapDOM = document.getElementById(state);

    document.getElementById("borders").style.stroke = "#006d21";
    stateMapDOM.style.stroke = "#006d21";
    if (recovered > 5000000) {
      stateMapDOM.style.fill = "#006d21";
    } else if (recovered <= 5000000 && recovered > 1000000) {
      stateMapDOM.style.fill = "#45a161";
    } else if (recovered <= 1000000 && recovered > 500000) {
      stateMapDOM.style.fill = "#85be97";
    } else if (recovered <= 500000 && recovered > 100000) {
      stateMapDOM.style.fill = "#b6d8c0";
    } else {
      stateMapDOM.style.fill = "#e6f2ea";
    }
  }

  mapStateNameDOM.classList.remove("new-confirmed");
  mapStateNameDOM.classList.remove("new-active");
  mapStateNameDOM.classList.remove("new-deceased");
  mapStateNameDOM.classList.add("new-recovered");
  mapStateNameDOM.innerHTML = "India";

  mapStateMapDOM.innerHTML = "Recovered " + syncIcon;
  mapStateMapDOM.style.color = "#006d21";
  mapStateMapDOM.style.border = "#006d21 dashed 2px";

  mapStateNumberDOM.innerHTML =
    document.getElementById("india-recovered").textContent;
  mapStateNumberDOM.style.color = "#006d21";

  const legendColor = ["#006d21", "#45a161", "#85be97", "#b6d8c0", "#e6f2ea"];
  const legendText = ["Above 50L", "50L - 10L", "10L - 5L", "5L - 1L", "Below 1L"];
  changeLegend(legendColor, legendText);

  document.getElementById("chart-daily").style.backgroundColor = "#e6f2ea";
  document.getElementById("chart-total").style.backgroundColor = "#e6f2ea";

  activeMap = "R";

  localStorage.setItem("i", 3);
  chartView = Number(localStorage.getItem("chartView"));
  viewCharts(activeMap, chartView);
}

function viewDeceased() {
  for (i = 0; i < stateName.length; i++) {
    const state = stateName[i].innerHTML.replace(/ /g, "").toLowerCase();
    const deceased = removeCommas(totalDeceased[i].textContent);
    const stateMapDOM = document.getElementById(state);

    document.getElementById("borders").style.stroke = "#9c000d";
    stateMapDOM.style.stroke = "#9c000d";
    if (deceased > 50000) {
      stateMapDOM.style.fill = "#9c000d";
    } else if (deceased <= 50000 && deceased > 10000) {
      stateMapDOM.style.fill = "#d33845";
    } else if (deceased <= 10000 && deceased > 5000) {
      stateMapDOM.style.fill = "#df717a";
    } else if (deceased <= 5000 && deceased > 1000) {
      stateMapDOM.style.fill = "#ecaaaf";
    } else {
      stateMapDOM.style.fill = "#f8e2e4";
    }
  }

  mapStateNameDOM.classList.remove("new-confirmed");
  mapStateNameDOM.classList.remove("new-active");
  mapStateNameDOM.classList.remove("new-recovered");
  mapStateNameDOM.classList.add("new-deceased");
  mapStateNameDOM.innerHTML = "India";

  mapStateNumberDOM.innerHTML =
    document.getElementById("india-deceased").textContent;
  mapStateNumberDOM.style.color = "#9c000d";

  mapStateMapDOM.innerHTML = "Deceased " + syncIcon;
  mapStateMapDOM.style.color = "#9c000d";
  mapStateMapDOM.style.border = "#9c000d dashed 2px";

  const legendColor = ["#9c000d", "#d33845", "#df717a", "#ecaaaf", "#f8e2e4"];
  const legendText = ["Above 50K", "50K - 10K", "10K - 5K", "5K - 1K", "Below 1K"];
  changeLegend(legendColor, legendText);

  document.getElementById("chart-daily").style.backgroundColor = "#f8e2e4";
  document.getElementById("chart-total").style.backgroundColor = "#f8e2e4";
  activeMap = "D";

  localStorage.setItem("i", 0);
  chartView = Number(localStorage.getItem("chartView"));
  viewCharts(activeMap, chartView);
}

function changeLegend(colors, text) {
  const legendDataDOM = document.getElementsByClassName("legend-data");
  for (i = 0; i < 5; i++) {
    legendDataDOM[i].style.backgroundColor = colors[i];
    legendDataDOM[i].textContent = text[i];
  }
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
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[1];
      y = rows[i + 1].getElementsByTagName("td")[1];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
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
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
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
  document.getElementById("chart-" + c).style.backgroundColor = "#b9b9b9";
  viewCharts(activeMap, c);
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

function changeSortIcon(n, dir) {
  const icon = document.getElementsByClassName("sort-icon");
  const th = [1, 2, 4, 5, 7];
  var n = th.indexOf(n);
  for (i = 0; i < icon.length; i++) icon[i].className = "fas fa-sort sort-icon";
  if (dir == "desc") icon[n].className = "fas fa-caret-down sort-icon";
  else if (dir == "asc") icon[n].className = "fas fa-caret-up sort-icon";
}
