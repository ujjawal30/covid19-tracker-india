var stateName, map;

stateName = document.querySelector(".state-page-name").textContent.replace(/ /g, "").toLowerCase();
console.log(stateName)

map = document.getElementById(stateName + "-chart");
map.style.display = "block";