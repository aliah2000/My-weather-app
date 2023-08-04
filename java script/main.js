// function GetData(query){

//     let req =new XMLHttpRequest();

// req.open('GET',`http://api.weatherapi.com/v1/current.json?key=19909a54b30040ed997181012232302&q=${query}`);

// req.send();

// req.addEventListener('loadend',function(){

//     if(req.status==200){

//         allWeatherData=JSON.parse(req.response);
//        displayForcast();

//     }
// })

// }

async function search(a) {
  let Data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=3`
  );
  if (Data.ok && 400 != Data.status) {
    let a = await Data.json();
    displayCurrent(a.location, a.current);
    displayAnother(a.forecast.forecastday);
  }
}

document.getElementById("search-bar").addEventListener("keyup", (a) => {
  search(a.target.value);
});

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
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

function displayCurrent(a, Data) {
  if (null != Data) {
    var e = new Date(Data.last_updated.replace(" ", "T"));
    let n = `<div class="today forecast">
      <div class="forecast-header" id="today">
        <div class="day">${days[e.getDay()]}</div>
        <div class="date">${e.getDate() + `<div class="date px-1">${monthNames[e.getMonth()]}</div>`}</div>
      </div>
      <div class="forecast-content" id="current">
        <div class="location">${a.name}</div>
        <div class="degree">
          <div class="num">${Data.temp_c}<sup>o</sup>C</div>
          <div class="forecast-icon">
            <img src="https:${Data.condition.icon}" alt="" width=90>
          </div>
        </div>
        <div class="custom">${Data.condition.text}</div>
        <span><img src="images/icon-umberella.png" alt="">20%</span>
        <span><img src="images/icon-wind.png" alt="">18km/h</span>
        <span><img src="images/icon-compass.png" alt="">East</span>
      </div>
    </div>`;
    document.getElementById("forecast").innerHTML = n;
  }
}

function displayAnother(a) {
  let t = "";
  for (let e = 1; e < a.length; e++) {
    t += `\t<div class="forecast">
        <div class="forecast-header">
          <div class="day">${
            days[new Date(a[e].date.replace(" ", "T")).getDay()]
          }</div>
        </div>
        <div class="forecast-content">
          <div class="forecast-icon">
            <img src="https:${a[e].day.condition.icon}" alt="" width=48>
          </div>
          <div class="degree">${a[e].day.maxtemp_c}<sup>o</sup>C</div>
          <small>${a[e].day.mintemp_c}<sup>o</sup></small>
          <div class="custom">${a[e].day.condition.text}</div>
        </div>
      </div>`;
  }
  document.getElementById("forecast").innerHTML += t;
}

search("cairo");

// displayTodayWeather();

// console.log(Days[date.getDay()]);
