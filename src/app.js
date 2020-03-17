//select elements
let temp = document.querySelector(".temp");
let locate = document.querySelector(".location");
let conditions = document.querySelector(".conditions");
let wind = document.querySelector(".wind");
let descriptions = document.querySelector(".weather-description")

//my weather object
let weather = {};

weather.temperature = {
  unit: "celsius"
}

// constant values
let KELVIN = 273;
const KEY = '7fc700cd64f1805db7d3de134f811a59';

// geolocation 
if ('geolocation' in navigator) {
    console.log("available");
    navigator.geolocation.getCurrentPosition(myPos,displayError);

}else{
  console.log("not available")
}

function myPos (position){
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  getWeather(lat, long);
}

function displayError(error){
  locate.innerHTML = '<h5> Please allow the app to request your location </h5>'
}

//fetch the data from Open Weather
function getWeather(lat,long) {
  let url = 'http://api.openweathermap.org/data/2.5/weather?'
  +'lat='+lat+'&'+'lon=' +long+'&appid='+KEY;
  fetch(url)
  .then(function (response) {
    let data = response.json();
    return data;
})

.then(function (data) {
  console.log(data);
  weather.city = data.name;
  weather.country = data.sys.country;
  weather.temperature.value = Math.floor(data.main.temp - KELVIN);
  weather.conditions = data.weather[0].description;
  weather.wind = data.wind.speed;


}).then(function(){
  showWeather();
});

}

function showWeather (){
  
locate.innerHTML =  weather.city + "," + weather.country;
temp.innerHTML = weather.temperature.value + '&deg;' + weather.temperature.unit;
wind.innerHTML = "Wind Speed:" + " " + weather.wind + "" + "mph";
descriptions.innerHTML = weather.conditions;

//illustrate weather conditions 
if (weather.conditions == "clear sky"){
  $(".conditions").html(" &#9728").css("fontSize", 70);
}
else if (weather.conditions == "scattered clouds")
 {
  $(".conditions").html(" &#9729").css("fontSize", 70);
}
else if (weather.conditions == "few clouds")
 {
  $(".conditions").html(" &#9729").css("fontSize", 70);
}
else if (weather.conditions == "broken clouds")
 {
  $(".conditions").html(" &#9729").css("fontSize", 70);
}
else if (weather.conditions == "rain"){
  $(".conditions").html(" &#9730").css("fontSize", 70);
}
else if (weather.conditions == "shower rain"){
  $(".conditions").html(" &#9730").css("fontSize", 70);
}
else if (weather.conditions == "moderate rain"){
  $(".conditions").html(" &#9730").css("fontSize", 70);
}
else if (weather.conditions == "thunderstorm"){
  $(".conditions").html(" &#9730").css("fontSize", 70);
}
else if (weather.conditions == "snow"){
  $(".conditions").html(" &#9731").css("fontSize", 70);
}
else{
   $(".conditions").html(" &#9728").css("fontSize", 70);
}


}
function convertTemp (temperature){
  let result = ((temperature * 9/5) + 32);
 return result;
}
/*By default, we will show the temperature in celsius.
If the user clicks on the temperature value in the UI then farenheit will be shown.
If the user clicks again then the value will be displayed in celsius. 
*/ 
temp.addEventListener("click", function(){

  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit == "celsius"){
    console.log(weather.temperature.value);
    let farenheit = convertTemp(weather.temperature.value)
    farenheit = Math.floor(farenheit);

    temp.innerHTML = farenheit + '&deg;' + "farenheit";
    weather.temperature.unit = "farenheit";
  }else{
      temp.innerHTML = weather.temperature.value + '&deg;' + "celsius";
      weather.temperature.unit = 'celsius';
  }
});
