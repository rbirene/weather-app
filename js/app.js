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
        thunder();
        break;
      //rain
      case (weatherCode < 523):
        rain();
        break;
      //snow
      case(weatherCode < 624):
        snow();
        break;
      //fog or reduced visibility
      case(weatherCode < 752):
        fog();
        break;
      //sunny
      case (weatherCode < 803):
        sunny();
        break;
      //cloudy or meh
      case (weatherCode < 901):
        cloudy();
        break;
      //default
      default:
    }
  }

  function cloudy(){
    document.body.style.background = "linear-gradient(rgb(124, 165, 187), rgb(72, 88, 97))";
    weather.innerHTML += '<div class="sun"></div>';
    for (i=0; i<10; i++){
      let randomDimension = (Math.random() * (800 - 100) + 1);
      let randomTop = ((Math.random()*100)+1);
      let randomRight = ((Math.random()*100)+1);
      weather.innerHTML += `<div class="cloud cloudset-one" style="height: ${randomDimension}px; top: ${randomTop}%; right: ${randomRight}%; width: ${randomDimension}px;"></div>`;
    }
    for (i=0; i<10; i++){
      let randomDimension = (Math.random() * (800 - 100) + 1);
      let randomTop = ((Math.random()*100)+1);
      let randomRight = ((Math.random()*100)+1);
      weather.innerHTML += `<div class="cloud cloudset-two" style="height: ${randomDimension}px; top: ${randomTop}%; right: ${randomRight}%; width: ${randomDimension}px;"></div>`;
    }
    for (i=0; i<10; i++){
      let randomDimension = (Math.random() * (800 - 100) + 1);
      let randomTop = ((Math.random()*100)+1);
      let randomRight = ((Math.random()*100)+1);
      weather.innerHTML += `<div class="cloud cloudset-three" style="height: ${randomDimension}px; top: ${randomTop}%; right: ${randomRight}%; width: ${randomDimension}px;"></div>`;
    }
  }

  function fog(){
    document.body.style.background = "linear-gradient(rgb(122, 126, 138), rgb(81, 85, 89))";
    weather.innerHTML += '<div class="covered-sun"></div>';
    for (i=0; i<10; i++){
      let randomDimension = (Math.random() * (800 - 100) + 100);
      let randomTop = ((Math.random()*100)+1);
      let randomRight = ((Math.random()*100)+1);
      weather.innerHTML += `<div class="cloud cloudset-one" style="height: ${randomDimension}px; top: ${randomTop}%; right: ${randomRight}%; width: ${randomDimension}px;"></div>`;
    }
    for (i=0; i<10; i++){
      let randomDimension = (Math.random() * (800 - 100) + 100);
      let randomTop = ((Math.random()*100)+1);
      let randomRight = ((Math.random()*100)+1);
      weather.innerHTML += `<div class="cloud cloudset-two" style="height: ${randomDimension}px; top: ${randomTop}%; right: ${randomRight}%; width: ${randomDimension}px;"></div>`;
    }
    for (i=0; i<10; i++){
      let randomDimension = (Math.random() * (800 - 100) + 100);
      let randomTop = ((Math.random()*100)+1);
      let randomRight = ((Math.random()*100)+1);
      weather.innerHTML += `<div class="cloud cloudset-three" style="height: ${randomDimension}px; top: ${randomTop}%; right: ${randomRight}%; width: ${randomDimension}px;"></div>`;
    }
  }

  function rain(){
    document.body.style.background = "linear-gradient(rgb(60, 67, 81), rgb(35, 42, 54))";
    for (i=0; i<20; i++){
      let randomNumber1 = Math.random();
      let randomNumber100 = ((Math.random()*100)+1);
      weather.innerHTML += `<div class="rain" style="animation-delay: ${randomNumber1}s; left: ${randomNumber100}%"></div>`;
    }
  }

  function snow(){
    document.body.style.background = "linear-gradient(rgb(102, 124, 128), rgb(82, 95, 97))";
    for (i=0; i<20; i++){
      let randomNumber10 = ((Math.random()*10)+1);
      let randomNumber100 = ((Math.random()*100)+1);
      weather.innerHTML += `<div class="snow" style="animation-delay: ${randomNumber10}s; left: ${randomNumber100}%"></div>`;
    }
  }

  function sunny(){
    document.body.style.background = "linear-gradient(rgb(116, 171, 181), rgb(85, 160, 169))";
    weather.innerHTML += '<div class="sun"></div><div class="sunlight"></div><div class="sunring"></div>';
  }

  function thunder(){
    document.body.style.background = "linear-gradient(rgb(60, 67, 81), rgb(35, 42, 54))";    
    weather.innerHTML += '<div class="lightning"></div>';
    
    function changeLightningPosition(){
      let lightning = document.querySelector(".lightning");
      lightning.style.right = (((Math.random()*100)/2)+1)+"%";
        lightning.style.top = ((Math.random()*100)+1)+"%";
    }
    setInterval(changeLightningPosition, 6000);

    for (i=0; i<20; i++){
      let randomDelay = Math.random();
      let randomPosition = ((Math.random()*100)+1);
      weather.innerHTML += `<div class="rain" style="animation-delay: ${randomDelay}s; left: ${randomPosition}%"></div>`;
    }

    for (i=0; i<10; i++){
      let randomDimension = (Math.random() * (800 - 100) + 100);
      let randomTop = ((Math.random()*100)+1);
      let randomRight = ((Math.random()*100)+1);
      weather.innerHTML += `<div class="cloud cloudset-one" style="height: ${randomDimension}px; top: ${randomTop}%; right: ${randomRight}%; width: ${randomDimension}px;"></div>`;
    }
  }

});

//add new element to existing parent
function addElement(elementParent, elementTag, elementClass) {
  let parent = elementParent;
  var newElement = document.createElement(elementTag);
  newElement.className = elementClass;
  parent.appendChild(newElement);
}

//remove existing element from existing parent
function removeElement(element) {
  element.parentNode.removeChild(element);
}