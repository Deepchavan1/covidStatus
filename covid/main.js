const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", function () {
  let country = document.querySelector(".location .country");
  country.innerHTML = "Fetching Data";

  let date = document.querySelector(".location .date");
  date.innerHTML = "press enter";
  date.style.color = "red";
});
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(
    `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=${capitalize(
      query
    )}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "d17ecc43aemshde3367e3ebe7546p1fbf5djsn5847e546c243",
        "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then(displayResults)
    .catch((err) => {
      window.alert("Invalid Country Name");
    });
}

function displayResults(response) {
  if (response.message == "OK") {
    let country = document.querySelector(".location .country");
    country.innerHTML = `${searchbox.value}`;
    country.style.fontSize = "30px";

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerHTML = dateBuilder(now);
    date.style.color = "#58595d";

    let recovered = document.querySelector(".recovered-cases");
    recovered.innerHTML = `${response.data.recovered}`;

    let deceased = document.querySelector(".deceased-cases");
    deceased.innerHTML = `${response.data.deaths}`;

    let confirmed = document.querySelector(".confirmed-cases");
    confirmed.innerHTML = `${response.data.confirmed}`;

    let reported = document.querySelector(".report");
    reported.innerHTML = `${response.data.lastReported}`;

    let checked = document.querySelector(".check");
    checked.innerHTML = `${response.data.lastChecked}`;
  } else {
    let country = document.querySelector(".location .country");
    country.innerHTML = `Can't Fetch Data. Please Check Country Name`;
    country.style.color = "#f0431a";
    country.style.fontSize = "18px";

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerHTML = dateBuilder(now);
    date.style.color = "#58595d";

    let recovered = document.querySelector(".recovered-cases");
    recovered.innerHTML = `-`;

    let deceased = document.querySelector(".deceased-cases");
    deceased.innerHTML = `-`;

    let confirmed = document.querySelector(".confirmed-cases");
    confirmed.innerHTML = `-`;

    let reported = document.querySelector(".report");
    reported.innerHTML = `-`;

    let checked = document.querySelector(".check");
    checked.innerHTML = `-`;
  }
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function capitalize(input) {
  var CapitalizeWords = input[0].toUpperCase();
  for (var i = 1; i <= input.length - 1; i++) {
    let currentCharacter,
      previousCharacter = input[i - 1];
    if (previousCharacter && previousCharacter == " ") {
      currentCharacter = input[i].toUpperCase();
    } else {
      currentCharacter = input[i];
    }
    CapitalizeWords = CapitalizeWords + currentCharacter;
  }
  return CapitalizeWords;
}
