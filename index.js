const API_KEY = "434b4432ea2f5ae573b4da2a9d65a7a2"

function handleFormSubmit(event) {
  //handle submit event
     console.log('handleFormSubmit');
   event.preventDefault();
   let city = document.getElementById('city').value.replace(' ','+');
     console.log(city);
   fetchCurrentWeather(city);
   fetchFiveDayForecast(city);
}

function fetchCurrentWeather(city) {
  //fetch current weather based on city
  
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`)
  .then(resp=>resp.json())
  .then(json=>displayCurrentWeather(json))
  
  
}

function displayCurrentWeather(json) {
  //render current weather data to the DOM using provided IDs and json from API
  console.log(json);
  console.log(json.main.temp);
  document.getElementById('temp').innerHTML=json.main.temp;
  document.getElementById('low').innerHTML=json.main.temp_min;
  document.getElementById('high').innerHTML=json.main.temp_max;
  document.getElementById('humidity').innerHTML=json.main.humidity;
  document.getElementById('sunrise').innerHTML=Date(json.sys.sunrise);
  document.getElementById('sunset').innerHTML=Date(json.sys.sunset);
  document.getElementById('cloudCover').innerHTML=json.clouds.all;  
}


function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}`)
  .then(resp=>resp.json())
  .then(json=>{
    displayFiveDayForecast(json);
    createChart(json);
  })
}

function displayFiveDayForecast(json) {
  //render five day forecast data to the DOM using provided IDs and json from API
  console.log(json);
  // document.getElementsByTagName('aside')[0].removeChild(aside.allChild);
  json.list.forEach(element=>{
    let div=document.createElement('div');
    let newNode1 =document.createTextNode('Date and Time:'+element.dt_txt+'  ');
    div.appendChild(newNode1);
    let newNode2 =document.createTextNode('Temperature'+element.main.temp+'  ');
    div.appendChild(newNode2);
    let newNode3 =document.createTextNode('Humidity:'+element.main.humidity+'  ');
    div.appendChild(newNode3);
    document.getElementsByTagName('aside')[0].appendChild(div);
     
  });
}

function createChart(json) {
  //Bonus: render temperature chart using five day forecast data and ChartJS
  let chartArray={};
  let chart=document.getElementById('WeatherChart');
 chartArray= json.list.map(element=>{
   
    return element.dt_txt;
  });
  chartArray2= json.list.map(element=>{
    
    return element.main.temp;
  });
  
  console.log('chartArray--',chartArray);
  console.log('chartArray2--',chartArray2);
  let myChart= new Chart(chart,{
    type:'line',
    data:{
       label:chartArray,
       datasets:
       [{ 
        data: chartArray2,
        label: "Temperatures",
        borderColor: "#3e95cd",
        // fill: false
       }]
    },
    pointRadius:2,
    // options: {
    // title: {
    //   display: true,
    //   text: 'Temperatures'
    // }
    // }
    
    options: {
      title: {
      display: true,
      text: 'Temperatures',
      xAxes: [{ display: true }]
      },
      
        // scales: {
        //     yAxes: [{
        //         ticks: {
        //             beginAtZero:true
        //         }
        //     }]
        // }
    }
  })
}

document.addEventListener('DOMContentLoaded', function() {
  //add event listener here for form submission
  
  document.getElementById('submit').addEventListener('click',event=>{
     console.log('event handler');
    handleFormSubmit(event);
  })
})
