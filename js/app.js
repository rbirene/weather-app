//after window loads...
window.addEventListener("load", ()=>{

  const weather = document.querySelector(".weather");

  let long;
  let lat;
  let currentDate = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  let day = days[currentDate.getDay()];
  let dateNo = currentDate.getDate();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[currentDate.getMonth()];
  let year = currentDate.getFullYear();
  const date = document.querySelector(".date");
  const location = document.querySelector(".location");
  const degree = document.querySelector(".degree");
  const description = document.querySelector(".description");

  //if user's geolocation is available...
  if (navigator.geolocation){
    //...get current geolocation
    navigator.geolocation.getCurrentPosition(position =>{
      
      //set longitude and latitude
      long = position.coords.longitude;
      lat = position.coords.latitude;

      //get current weather
      const weatherAPI = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=e8f98e846616494191b612774aa131bc`;
      
      fetch(weatherAPI)
        .then(response =>{
          return response.json();
        })
        .then(response =>{
          date.innerHTML =  `${day} ${dateNo} ${month} ${year}`;
          location.innerHTML = response.data[0]["city_name"];
          degree.innerHTML = Math.round(response.data[0]["temp"]);
          description.innerHTML = response.data[0]["weather"]["description"];
          let weatherCode = response.data[0]["weather"]["code"];
          identifyWeather(weatherCode);
        });
    });
  } else {
    //...set elements to unknown
    console.log("Geolocation has been disabled.")
    date.innerHTML =  `${day} ${dateNo} ${month} ${year}`;
    location.innerHTML = "Location Unknown";
    degree.innerHTML = 0;
    description.innerHTML = "Weather Unknown";
  }

  function identifyWeather(weatherCode){
    switch(true){
      //thunderstorm
      case (weatherCode < 234):
        makeStormy();
        break;
      //rain
      case (weatherCode < 523):
        makeRainy();
        break;
      //snow
      case(weatherCode < 624):
        makeSnowy();
        break;
      //fog or reduced visibility
      case(weatherCode < 752):
        makeFoggy();
        break;
      //sunny
      case (weatherCode < 803):
        makeSunny();
        break;
      //cloudy or meh
      case (weatherCode < 901):
        makeCloudy();
        break;
      //default
      default:
    }
  }

  function clouds(){
    for (i=0; i<10; i++){
      let randomDimension = (Math.random()*(800-100))+1;
      let randomTop = (Math.random()*100)+1;
      let randomRight = (Math.random()*100)+1;
      weather.innerHTML += `<div class="cloud cloudset-one" style="height: ${randomDimension}px; top: ${randomTop}%; right: ${randomRight}%; width: ${randomDimension}px;"></div>`;
    }
    for (i=0; i<10; i++){
      let randomDimension = (Math.random()*(800-100))+1;
      let randomTop = (Math.random()*100)+1;
      let randomRight = (Math.random()*100)+1;
      weather.innerHTML += `<div class="cloud cloudset-two" style="height: ${randomDimension}px; top: ${randomTop}%; right: ${randomRight}%; width: ${randomDimension}px;"></div>`;
    }
    for (i=0; i<10; i++){
      let randomDimension = (Math.random()*(800-100))+1;
      let randomTop = (Math.random()*100)+1;
      let randomRight = (Math.random()*100)+1;
      weather.innerHTML += `<div class="cloud cloudset-three" style="height: ${randomDimension}px; top: ${randomTop}%; right: ${randomRight}%; width: ${randomDimension}px;"></div>`;
    }
  }

  function rain(){
    for (i=0; i<20; i++){
      let randomNumber1 = Math.random();
      let randomNumber100 = ((Math.random()*100)+1);
      weather.innerHTML += `<div class="rain" style="animation-delay: ${randomNumber1}s; left: ${randomNumber100}%"></div>`;
    }
  }

  function lightning(){
    weather.innerHTML += '<div class="lightning"></div>';
    function changeLightningPosition(){
      let lightning = document.querySelector(".lightning");
      lightning.style.right = (((Math.random()*100)/2)+1)+"%";
        lightning.style.top = ((Math.random()*100)+1)+"%";
    }
    //change position every 6 seconds to match with css animation (which is set at 6s duration)
    setInterval(changeLightningPosition, 6000);
  }

  function snow(){
    for (i=0; i<20; i++){
      let randomNumber10 = ((Math.random()*10)+1);
      let randomNumber100 = ((Math.random()*100)+1);
      weather.innerHTML += `<div class="snow" style="animation-delay: ${randomNumber10}s; left: ${randomNumber100}%"></div>`;
    }
  }

  function makeCloudy(){
    document.body.style.background = "linear-gradient(rgb(124, 165, 187), rgb(72, 88, 97))";
    weather.innerHTML += '<div class="sun"></div>';
    clouds();
  }

  function makeFoggy(){
    document.body.style.background = "linear-gradient(rgb(122, 126, 138), rgb(81, 85, 89))";
    weather.innerHTML += '<div class="covered-sun"></div>';  
    clouds();
  }

  function makeRainy(){
    document.body.style.background = "linear-gradient(rgb(60, 67, 81), rgb(35, 42, 54))";
    rain();
  }

  function makeSnowy(){
    document.body.style.background = "linear-gradient(rgb(102, 124, 128), rgb(82, 95, 97))";
    snow();
  }

  function makeSunny(){
    document.body.style.background = "linear-gradient(rgb(116, 171, 181), rgb(85, 160, 169))";
    weather.innerHTML += '<div class="sun"></div><div class="sunlight"></div><div class="sunring"></div>';
  }

  function makeStormy(){
    document.body.style.background = "linear-gradient(rgb(60, 67, 81), rgb(35, 42, 54))";    
    lightning();
    rain();
    clouds();
  }

});