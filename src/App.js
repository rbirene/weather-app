import React from 'react';
import './App.css';

//after window loads...
window.addEventListener("load", ()=>{

  let long;
  let lat;
  let currentDate = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  let day = days[currentDate.getDay()];
  let dateNo = currentDate.getDate();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[currentDate.getMonth()];
  let year = currentDate.getFullYear();
  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes();
  let time = `${hour}:${minute}`;
  const date = document.querySelector(".date");
  const location = document.querySelector(".location");
  const degree = document.querySelector(".degree");
  const description = document.querySelector(".description");
  const message = document.querySelector(".message");

  //if user's geolocation is available...
  if (navigator.geolocation){
    //...get current geolocation
    navigator.geolocation.getCurrentPosition(position =>{
      long = position.coords.longitude;
      lat = position.coords.latitude;

      //display current location

      //get current weather
      const weatherAPI = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=e8f98e846616494191b612774aa131bc`;
      
      fetch(weatherAPI)
        .then(response =>{
          return response.json();
        })
        .then(response =>{
          date.innerHTML =  `${day} ${dateNo} ${month} ${year} — ${time}`;
          location.innerHTML = response.data[0]["city_name"];
          degree.innerHTML = response.data[0]["temp"];
          description.innerHTML = response.data[0]["weather"]["description"];
          let weatherCode = response.data[0]["weather"]["code"];
          identifyWeather(weatherCode);
        });
    });
  } else {
    //...set elements to unknown
    console.log("Geolocation has been disabled.")
    date.innerHTML =  `${day} ${dateNo} ${month} ${year} — ${time}`;
    location.innerHTML = "Location Unknown";
    degree.innerHTML = 0;
    description.innerHTML = "Weather Unknown";
  }

  function identifyWeather(weatherCode){
    switch(true){
      //thunderstorm
      case (weatherCode < 234):
        message.innerHTML = "I'd grab an umbrella if I were you. On second thought...maybe just stay inside for the day.";
        break;
      //rain
      case (weatherCode < 523):
        message.innerHTML = "I'd love to tell you that it's sunny right now, but then I'd be lying.";
        break;
      //snow
      case(weatherCode < 624):
        message.innerHTML = "Hope you've got anti-freeze 'cause you're gonna need it.";
        break;
      //fog or reduced visibility
      case(weatherCode < 752):
        message.innerHTML = "Damn, I can't see shit.";
        break;
      //sunny
      case (weatherCode < 803):
        message.innerHTML = "Grab your sunglasses! Today is going to be a beautiful day!";
        break;
      //cloudy or meh
      case (weatherCode < 901):
        message.innerHTML = "Look, it's not sunshine, but you and I both know it could be much worse.";
        break;
      //default
      default:
        message.innerHTML = "I...honestly have no idea.";
    }
  }

});

function App() {
  return (
    <main>
      <p className="location">Updating...</p>
      <p className="date">Updating...</p>
      <br/>
      <p className="temperature">
        <span className="degree">0</span> <sup className="symbol">°</sup>C
      </p>
      <br/>
      <p className="description">Updating...</p>
      <p className="message">Updating...</p>
      </main>
  );
}

export default App;
