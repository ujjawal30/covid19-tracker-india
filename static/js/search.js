var states = [];

var statesDOM = document.getElementsByClassName("state-name");
for (i = 0; i < statesDOM.length; i++) {
  states.push(statesDOM[i].textContent);
}

String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

function checkField(value) {
  if (value.length <= 1)
    document.getElementById("clear").style.visibility = "hidden";
}

function clearSearch() {
  document.getElementById("search").value = "";
  document.getElementById("clear").style.visibility = "hidden";
  document.getElementById("search").focus();
}

function autocomplete(inp, states, districts, districtState) {
  var currentFocus;

  inp.addEventListener("input", function () {
    var search,
      b,
      i,
      count = 0,
      val = this.value;

    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;

    search = document.createElement("div");
    search.setAttribute("id", this.id + "autocomplete-list");
    search.setAttribute("class", "autocomplete-items");
    search.classList.add("shadow");
    search.style.maxHeight = "500px";
    search.style.overflowY = "auto";
    search.style.borderRadius = "10px";

    this.parentNode.appendChild(search);

    if (val) {
      document.getElementById("clear").style.visibility = "visible";
    }

    for (i = 0; i < states.length; i++) {
      if (states[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("div");

        b.innerHTML =
          "<i class='fas fa-university pe-2'></i><strong>" +
          states[i].substr(0, val.length) +
          "</strong>";
        b.innerHTML += states[i].substr(val.length);

        b.classList.add("shadow");

        b.innerHTML += "<input type='hidden' value='" + states[i] + "'>";
        b.addEventListener("click", function () {
          inp.value = this.getElementsByTagName("input")[0].value;
          document.querySelector("form").submit();
          closeAllLists();
        });
        search.appendChild(b);
        count++;
      }
    }
    for (i = 0; i < districts.length; i++) {
      if (
        districts[i].substr(0, val.length).toUpperCase() == val.toUpperCase()
      ) {
        b = document.createElement("div");

        b.innerHTML =
          "<i class='fas fa-building pe-2'></i><strong>" +
          districts[i].substr(0, val.length) +
          "</strong>";
        b.innerHTML += districts[i].substr(val.length);

        b.classList.add("shadow");

        b.innerHTML +=
          "<input type='hidden' value='" +
          districts[i] +
          "'> <small class='search-district'>" +
          districtState[i] +
          "</small>";
        b.addEventListener("click", function () {
          inp.value = this.getElementsByTagName("input")[0].value;
          document.querySelector("form").submit();
          closeAllLists();
        });
        search.appendChild(b);
        count++;
      }
    }
    if (count == 0) {
      b = document.createElement("div");
      b.classList.add("shadow");
      b.innerHTML =
        "<i class='fas fa-exclamation-triangle pe-1'></i> <strong>" +
        val.toTitleCase() +
        "</strong><small class='search-district'>No State or District</small>";
      search.appendChild(b);
    }
    console.log(val.length);
    checkField(val);
  });

  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

var input = document.getElementById("search");
autocomplete(input, states, districts, districtState);

document.getElementById("search").addEventListener("keyup", function (event) {
  var key, correct;

  if (event.code === "Enter") {
    key = input.value.toTitleCase();
    console.log(key);
    correct = states.includes(key) || districts.includes(key);
    console.log(correct);
    if (correct) {
      event.preventDefault();
      document.querySelector("form").submit();
    }
  }
});
