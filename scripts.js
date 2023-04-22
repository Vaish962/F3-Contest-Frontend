const fetchDta = document.getElementById("fetching-dta");
const mainmap = document.getElementById("main-map");
const weatherfun = document.getElementById("weather-data");
const API_KEY = '04a99bbcf1d951313cf4dac090fc55e4';
// function to get location
function getLocation()
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCurrentPosition);
      } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
}
//setting up location in local storage 
function getCurrentPosition(position)
{
   showPosition(position);

   // Now setting up longitude and latitude with local storage
   let lati = localStorage.getItem("lat");
   let longi = localStorage.getItem("long");
   mainmap.innerHTML = `
   <div class = "main-inner">
   <div class = "lm-sec">
   <div class = "Lat"><span>Lat: ${lati}</span></div>
   <div class = "Lat"><span>Long: ${longi}</span></div>
   </div>
   <div class="main-map-div">
    <iframe src="https://maps.google.com/maps?q=${lati},${longi}&hl=en&z=14&amp;output=embed" width="100%" height="400" frameborder="0" style="border:0" allowfullscreen></iframe>
    </div>
   </div>`
   weatherData(lati , longi)
}
// function for showing weather data
function weatherData(lati , longi)
{
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lati}&lon=${longi}&exclude=hourly,minutely&appid=${API_KEY}`)
    .then(resp => resp.json()).then((data) => {console.log(data)});
    // fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lati}&lon=${longi}&exclude=hourly&appid=${API_KEY}`)
    // .then(resp => resp.json()).then((data) => {console.log(data)})
}
function showPosition(position) {
    localStorage.setItem("long",position.coords.longitude);
    localStorage.setItem("lat",position.coords.latitude);
}
fetchDta.addEventListener("click" , () => {
getLocation()

})