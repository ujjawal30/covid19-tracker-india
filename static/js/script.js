var stateName, totalConfirmed, state, confirmed, activeMap, chartView;
var stateMapDOM,
  confirmedDOM,
  activeDOM,
  recoveredDOM,
  deceasedDOM,
  mapStateNameDOM,
  mapStateNumberDOM,
  mapStateMapDOM;
var legendColorDOM, legendNumberDOM;

stateName = document.querySelectorAll(".state-name");
totalConfirmed = document.querySelectorAll(".confirmed");
totalActive = document.querySelectorAll(".active");
totalRecovered = document.querySelectorAll(".recovered");
totalDeceased = document.querySelectorAll(".deceased");

confirmedDOM = document.querySelector(".confirmed-card");
activeDOM = document.querySelector(".active-card");
recoveredDOM = document.querySelector(".recovered-card");
deceasedDOM = document.querySelector(".deceased-card");

mapStateNameDOM = document.querySelector(".map-state-name");
mapStateNumberDOM = document.querySelector(".map-state-number");
mapStateMapDOM = document.querySelector(".map-state-map");

legendDataDOM = document.getElementsByClassName("legend-data");

localStorage.setItem("chartView", 0);

viewConfirmed();

function viewConfirmed() {
  for (i = 0; i < stateName.length; i++) {
    state = stateName[i].innerHTML.replace(/ /g, "").toLowerCase();
    confirmed = removeCommas(totalConfirmed[i].textContent);
    stateMapDOM = document.getElementById(state);
    document.getElementById("borders").style.stroke = "#bc6e0d";
    stateMapDOM.style.stroke = "#bc6e0d";
    if (confirmed > 5000000) {
      stateMapDOM.style.fill = "#bc6e0d"; /*color:#FA8607*/
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

  activeDOM.classList.remove("shadow");
  activeDOM.classList.add("shadow-sm");
  recoveredDOM.classList.remove("shadow");
  recoveredDOM.classList.add("shadow-sm");
  deceasedDOM.classList.remove("shadow");
  deceasedDOM.classList.add("shadow-sm");
  confirmedDOM.classList.remove("shadow-sm");
  confirmedDOM.classList.add("shadow");

  mapStateNameDOM.classList.remove("new-active");
  mapStateNameDOM.classList.remove("new-recovered");
  mapStateNameDOM.classList.remove("new-deceased");
  mapStateNameDOM.classList.add("new-confirmed");
  mapStateNameDOM.innerHTML = "India";

  mapStateNumberDOM.innerHTML = document.getElementById(
    "india-confirmed"
  ).textContent;
  mapStateNumberDOM.style.color = "#bc6e0d";

  mapStateMapDOM.innerHTML = "Confirmed  <i class='far fa-sync'></i>";
  mapStateMapDOM.style.color = "#bc6e0d";
  mapStateMapDOM.style.border = "#bc6e0d dashed 2px";

  legendDataDOM[0].style.backgroundColor = "#bc6e0d";
  legendDataDOM[1].style.backgroundColor = "#eca145";
  legendDataDOM[2].style.backgroundColor = "#f1bc7a";
  legendDataDOM[3].style.backgroundColor = "#f7d7af";
  legendDataDOM[4].style.backgroundColor = "#fcf1e4";

  legendDataDOM[0].textContent = "Above 50L";
  legendDataDOM[1].textContent = "50L - 10L";
  legendDataDOM[2].textContent = "10L - 5L";
  legendDataDOM[3].textContent = "5L - 1L";
  legendDataDOM[4].textContent = "Below 1L";

  document.getElementById("chart-daily").style.backgroundColor = "#fcf1e4";
  document.getElementById("chart-total").style.backgroundColor = "#fcf1e4";

  activeMap = "C";

  localStorage.setItem("i", 1);
  chartView = Number(localStorage.getItem("chartView"));
  viewCharts(activeMap, chartView);
}

function viewActive() {
  for (i = 0; i < stateName.length; i++) {
    state = stateName[i].innerHTML.replace(/ /g, "").toLowerCase();
    active = removeCommas(totalActive[i].textContent);
    stateMapDOM = document.getElementById(state);
    document.getElementById("borders").style.stroke = "#084298";
    stateMapDOM.style.stroke = "#084298";
    if (active > 500000) {
      stateMapDOM.style.fill = "#0a4fb6"; //"#004dc0"; /*color:#FA8607*/
    } else if (active <= 500000 && active > 100000) {
      stateMapDOM.style.fill = "#498ff5"; //"#7596c5";
    } else if (active <= 100000 && active > 50000) {
      stateMapDOM.style.fill = "#9ac1fa"; //"#b2c4de";
    } else if (active <= 50000 && active > 10000) {
      stateMapDOM.style.fill = "#c2dafc"; //"#e0e7f2";
    } else {
      stateMapDOM.style.fill = "#ebf3fe"; //"#f4f6fc";
    }
  }

  confirmedDOM.classList.remove("shadow");
  confirmedDOM.classList.add("shadow-sm");
  recoveredDOM.classList.remove("shadow");
  recoveredDOM.classList.add("shadow-sm");
  deceasedDOM.classList.remove("shadow");
  deceasedDOM.classList.add("shadow-sm");
  activeDOM.classList.remove("shadow-sm");
  activeDOM.classList.add("shadow");

  mapStateNameDOM.classList.remove("new-confirmed");
  mapStateNameDOM.classList.remove("new-recovered");
  mapStateNameDOM.classList.remove("new-deceased");
  mapStateNameDOM.classList.add("new-active");
  mapStateNameDOM.innerHTML = "India";

  mapStateNumberDOM.innerHTML = document.getElementById(
    "india-active"
  ).textContent;
  mapStateNumberDOM.style.color = "#084298";

  mapStateMapDOM.innerHTML = "Active <i class='far fa-sync'></i>";
  mapStateMapDOM.style.color = "#084298";
  mapStateMapDOM.style.border = "#084298 dashed 2px";

  legendDataDOM[0].style.backgroundColor = "#0a4fb6";
  legendDataDOM[1].style.backgroundColor = "#498ff5";
  legendDataDOM[2].style.backgroundColor = "#9ac1fa";
  legendDataDOM[3].style.backgroundColor = "#c2dafc";
  legendDataDOM[4].style.backgroundColor = "#ebf3fe";

  legendDataDOM[0].textContent = "Above 5L";
  legendDataDOM[1].textContent = "5L - 1L";
  legendDataDOM[2].textContent = "1L - 50K";
  legendDataDOM[3].textContent = "50K - 10K";
  legendDataDOM[4].textContent = "Below 10K";

  document.getElementById("chart-daily").style.backgroundColor = "#ebf3fe";
  document.getElementById("chart-total").style.backgroundColor = "#ebf3fe";
  activeMap = "A";

  localStorage.setItem("i", 2);
  chartView = Number(localStorage.getItem("chartView"));
  viewCharts(activeMap, chartView);
}

function viewRecovered() {
  for (i = 0; i < stateName.length; i++) {
    state = stateName[i].innerHTML.replace(/ /g, "").toLowerCase();
    recovered = removeCommas(totalRecovered[i].textContent);
    stateMapDOM = document.getElementById(state);
    document.getElementById("borders").style.stroke = "#006d21";
    stateMapDOM.style.stroke = "#006d21";
    if (recovered > 5000000) {
      stateMapDOM.style.fill = "#006d21"; /*color:#FA8607*/
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

  confirmedDOM.classList.add("shadow-sm");
  confirmedDOM.classList.remove("shadow");
  activeDOM.classList.add("shadow-sm");
  activeDOM.classList.remove("shadow");
  deceasedDOM.classList.remove("shadow");
  deceasedDOM.classList.add("shadow-sm");
  recoveredDOM.classList.remove("shadow-sm");
  recoveredDOM.classList.add("shadow");

  mapStateNameDOM.classList.remove("new-confirmed");
  mapStateNameDOM.classList.remove("new-active");
  mapStateNameDOM.classList.remove("new-deceased");
  mapStateNameDOM.classList.add("new-recovered");
  mapStateNameDOM.innerHTML = "India";

  mapStateMapDOM.innerHTML = "Recovered <i class='far fa-sync'></i>";
  mapStateMapDOM.style.color = "#006d21";
  mapStateMapDOM.style.border = "#006d21 dashed 2px";

  mapStateNumberDOM.innerHTML = document.getElementById(
    "india-recovered"
  ).textContent;
  mapStateNumberDOM.style.color = "#006d21";

  legendDataDOM[0].style.backgroundColor = "#006d21";
  legendDataDOM[1].style.backgroundColor = "#45a161";
  legendDataDOM[2].style.backgroundColor = "#85be97";
  legendDataDOM[3].style.backgroundColor = "#b6d8c0";
  legendDataDOM[4].style.backgroundColor = "#e6f2ea";

  legendDataDOM[0].textContent = "Above 50L";
  legendDataDOM[1].textContent = "50L - 10L";
  legendDataDOM[2].textContent = "10L - 5L";
  legendDataDOM[3].textContent = "5L - 1L";
  legendDataDOM[4].textContent = "Below 1L";

  document.getElementById("chart-daily").style.backgroundColor = "#e6f2ea";
  document.getElementById("chart-total").style.backgroundColor = "#e6f2ea";

  activeMap = "R";

  localStorage.setItem("i", 3);
  chartView = Number(localStorage.getItem("chartView"));
  viewCharts(activeMap, chartView);
}

function viewDeceased() {
  for (i = 0; i < stateName.length; i++) {
    state = stateName[i].innerHTML.replace(/ /g, "").toLowerCase();
    deceased = removeCommas(totalDeceased[i].textContent);
    stateMapDOM = document.getElementById(state);
    document.getElementById("borders").style.stroke = "#9c000d";
    stateMapDOM.style.stroke = "#9c000d";
    if (deceased > 50000) {
      stateMapDOM.style.fill = "#9c000d"; /*color:#FA8607*/
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
  confirmedDOM.classList.remove("shadow");
  confirmedDOM.classList.add("shadow-sm");
  activeDOM.classList.remove("shadow");
  activeDOM.classList.add("shadow-sm");
  recoveredDOM.classList.remove("shadow");
  recoveredDOM.classList.add("shadow-sm");
  deceasedDOM.classList.remove("shadow-sm");
  deceasedDOM.classList.add("shadow");

  mapStateNameDOM.classList.remove("new-confirmed");
  mapStateNameDOM.classList.remove("new-active");
  mapStateNameDOM.classList.remove("new-recovered");
  mapStateNameDOM.classList.add("new-deceased");
  mapStateNameDOM.innerHTML = "India";

  mapStateNumberDOM.innerHTML = document.getElementById(
    "india-deceased"
  ).textContent;
  mapStateNumberDOM.style.color = "#9c000d";

  mapStateMapDOM.innerHTML = "Deceased <i class='far fa-sync'></i>";
  mapStateMapDOM.style.color = "#9c000d";
  mapStateMapDOM.style.border = "#9c000d dashed 2px";

  legendDataDOM[0].style.backgroundColor = "#9c000d";
  legendDataDOM[1].style.backgroundColor = "#d33845";
  legendDataDOM[2].style.backgroundColor = "#df717a";
  legendDataDOM[3].style.backgroundColor = "#ecaaaf";
  legendDataDOM[4].style.backgroundColor = "#f8e2e4";

  legendDataDOM[0].textContent = "Above 50K";
  legendDataDOM[1].textContent = "50K - 10K";
  legendDataDOM[2].textContent = "10K - 5K";
  legendDataDOM[3].textContent = "5K - 1K";
  legendDataDOM[4].textContent = "Below 1K";

  document.getElementById("chart-daily").style.backgroundColor = "#f8e2e4";
  document.getElementById("chart-total").style.backgroundColor = "#f8e2e4";
  activeMap = "D";

  localStorage.setItem("i", 0);
  chartView = Number(localStorage.getItem("chartView"));
  viewCharts(activeMap, chartView);
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
    icon,
    switchcount = 0;
  table = document.getElementById("state-table");
  icon = document.getElementsByClassName("sort-icon");
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
  if (dir == "desc") {
    icon[0].classList.remove("fa-sort-alt");
    icon[0].classList.remove("fa-sort-alpha-down");
    icon[0].classList.add("fa-sort-alpha-down-alt");
  } else if (dir == "asc") {
    icon[0].classList.remove("fa-sort-alt");
    icon[0].classList.remove("fa-sort-alpha-down-alt");
    icon[0].classList.add("fa-sort-alpha-down");
  }
  icon[0].style.color = "blue";
  icon[1].classList.remove("fa-sort-amount-down-alt");
  icon[1].classList.remove("fa-sort-amount-down");
  icon[1].classList.add("fa-sort-alt");
  icon[1].style.color = "";
  icon[2].classList.remove("fa-sort-amount-down-alt");
  icon[2].classList.remove("fa-sort-amount-down");
  icon[2].classList.add("fa-sort-alt");
  icon[2].style.color = "";
  icon[3].classList.remove("fa-sort-amount-down-alt");
  icon[3].classList.remove("fa-sort-amount-down");
  icon[3].classList.add("fa-sort-alt");
  icon[3].style.color = "";
  icon[4].classList.remove("fa-sort-amount-down-alt");
  icon[4].classList.remove("fa-sort-amount-down");
  icon[4].classList.add("fa-sort-alt");
  icon[4].style.color = "";

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
    icon,
    switchcount = 0;
  table = document.getElementById("state-table");
  icon = document.getElementsByClassName("sort-icon");
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
  if (n == 2) {
    if (dir == "desc") {
      icon[1].classList.remove("fa-sort-amount-down-alt");
      icon[1].classList.add("fa-sort-amount-down");
    } else if (dir == "asc") {
      icon[1].classList.remove("fa-sort-amount-down");
      icon[1].classList.add("fa-sort-amount-down-alt");
    }
    icon[1].style.color = "#bc6e0d";
    icon[0].classList.remove("fa-sort-alpha-down-alt");
    icon[0].classList.remove("fa-sort-alpha-down");
    icon[0].classList.add("fa-sort-alt");
    icon[0].style.color = "";
    icon[2].classList.remove("fa-sort-amount-down-alt");
    icon[2].classList.remove("fa-sort-amount-down");
    icon[2].classList.add("fa-sort-alt");
    icon[2].style.color = "";
    icon[3].classList.remove("fa-sort-amount-down-alt");
    icon[3].classList.remove("fa-sort-amount-down");
    icon[3].classList.add("fa-sort-alt");
    icon[3].style.color = "";
    icon[4].classList.remove("fa-sort-amount-down-alt");
    icon[4].classList.remove("fa-sort-amount-down");
    icon[4].classList.add("fa-sort-alt");
    icon[4].style.color = "";
  }
  if (n == 4) {
    if (dir == "desc") {
      icon[2].classList.remove("fa-sort-amount-down-alt");
      icon[2].classList.add("fa-sort-amount-down");
    } else if (dir == "asc") {
      icon[2].classList.remove("fa-sort-amount-down");
      icon[2].classList.add("fa-sort-amount-down-alt");
    }
    icon[2].style.color = "#084298";
    icon[0].classList.remove("fa-sort-alpha-down-alt");
    icon[0].classList.remove("fa-sort-alpha-down");
    icon[0].classList.add("fa-sort-alt");
    icon[0].style.color = "";
    icon[1].classList.remove("fa-sort-amount-down-alt");
    icon[1].classList.remove("fa-sort-amount-down");
    icon[1].classList.add("fa-sort-alt");
    icon[1].style.color = "";
    icon[3].classList.remove("fa-sort-amount-down-alt");
    icon[3].classList.remove("fa-sort-amount-down");
    icon[3].classList.add("fa-sort-alt");
    icon[3].style.color = "";
    icon[4].classList.remove("fa-sort-amount-down-alt");
    icon[4].classList.remove("fa-sort-amount-down");
    icon[4].classList.add("fa-sort-alt");
    icon[4].style.color = "";
  }
  if (n == 5) {
    if (dir == "desc") {
      icon[3].classList.remove("fa-sort-amount-down-alt");
      icon[3].classList.add("fa-sort-amount-down");
    } else if (dir == "asc") {
      icon[3].classList.remove("fa-sort-amount-down");
      icon[3].classList.add("fa-sort-amount-down-alt");
    }
    icon[3].style.color = "#258b44";
    icon[0].classList.remove("fa-sort-alpha-down-alt");
    icon[0].classList.remove("fa-sort-alpha-down");
    icon[0].classList.add("fa-sort-alt");
    icon[0].style.color = "";
    icon[1].classList.remove("fa-sort-amount-down-alt");
    icon[1].classList.remove("fa-sort-amount-down");
    icon[1].classList.add("fa-sort-alt");
    icon[1].style.color = "";
    icon[2].classList.remove("fa-sort-amount-down-alt");
    icon[2].classList.remove("fa-sort-amount-down");
    icon[2].classList.add("fa-sort-alt");
    icon[2].style.color = "";
    icon[4].classList.remove("fa-sort-amount-down-alt");
    icon[4].classList.remove("fa-sort-amount-down");
    icon[4].classList.add("fa-sort-alt");
    icon[4].style.color = "";
  }
  if (n == 7) {
    if (dir == "desc") {
      icon[4].classList.remove("fa-sort-amount-down-alt");
      icon[4].classList.add("fa-sort-amount-down");
    } else if (dir == "asc") {
      icon[4].classList.remove("fa-sort-amount-down");
      icon[4].classList.add("fa-sort-amount-down-alt");
    }
    icon[4].style.color = "#c70011";
    icon[0].classList.remove("fa-sort-alpha-down-alt");
    icon[0].classList.remove("fa-sort-alpha-down");
    icon[0].classList.add("fa-sort-alt");
    icon[0].style.color = "";
    icon[1].classList.remove("fa-sort-amount-down-alt");
    icon[1].classList.remove("fa-sort-amount-down");
    icon[1].classList.add("fa-sort-alt");
    icon[1].style.color = "";
    icon[2].classList.remove("fa-sort-amount-down-alt");
    icon[2].classList.remove("fa-sort-amount-down");
    icon[2].classList.add("fa-sort-alt");
    icon[2].style.color = "";
    icon[3].classList.remove("fa-sort-amount-down-alt");
    icon[3].classList.remove("fa-sort-amount-down");
    icon[3].classList.add("fa-sort-alt");
    icon[3].style.color = "";
  }
  sortSerial();
}

function hoverState(state) {
  var statename;
  stateName = document.querySelectorAll(".state-name");
  totalConfirmed = document.querySelectorAll(".confirmed");
  totalActive = document.querySelectorAll(".active");
  totalRecovered = document.querySelectorAll(".recovered");
  totalDeceased = document.querySelectorAll(".deceased");

  for (i = 0; i < stateName.length; i++) {
    statename = stateName[i].innerHTML.replace(/ /g, "").toLowerCase();
    if (state == statename) {
      sname = stateName[i].textContent;
      confirmed = totalConfirmed[i].textContent;
      active = totalActive[i].textContent;
      recovered = totalRecovered[i].textContent;
      deceased = totalDeceased[i].textContent;
      break;
    }
  }

  stateMapDOM = document.getElementById(state);

  if (activeMap == "C") {
    stateMapDOM.onmousemove = function () {
      mapStateNameDOM.innerHTML = sname;
      mapStateNumberDOM.innerHTML = confirmed;
    };
    stateMapDOM.onmouseout = function () {
      mapStateNameDOM.innerHTML = "India";
      document.querySelector(
        ".map-state-number"
      ).innerHTML = document.getElementById("india-confirmed").textContent;
    };
  }

  if (activeMap == "A") {
    stateMapDOM.onmousemove = function () {
      mapStateNameDOM.innerHTML = sname;
      mapStateNumberDOM.innerHTML = active;
    };
    stateMapDOM.onmouseout = function () {
      mapStateNameDOM.innerHTML = "India";
      mapStateNumberDOM.innerHTML = document.getElementById(
        "india-active"
      ).textContent;
    };
  }

  if (activeMap == "R") {
    stateMapDOM.onmousemove = function () {
      mapStateNameDOM.innerHTML = sname;
      mapStateNumberDOM.innerHTML = recovered;
    };
    stateMapDOM.onmouseout = function () {
      mapStateNameDOM.innerHTML = "India";
      mapStateNumberDOM.innerHTML = document.getElementById(
        "india-recovered"
      ).textContent;
    };
  }

  if (activeMap == "D") {
    stateMapDOM.onmousemove = function () {
      mapStateNameDOM.innerHTML = sname;
      mapStateNumberDOM.innerHTML = deceased;
    };
    stateMapDOM.onmouseout = function () {
      mapStateNameDOM.innerHTML = "India";
      mapStateNumberDOM.innerHTML = document.getElementById(
        "india-deceased"
      ).textContent;
    };
  }
}

function changeChart(c) {
  localStorage.setItem("chartView", c);
  document.getElementById("chart-180").style.backgroundColor = "";
  document.getElementById("chart-90").style.backgroundColor = "";
  document.getElementById("chart-30").style.backgroundColor = "";
  document.getElementById("chart-0").style.backgroundColor = "";
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
