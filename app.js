// const API_KEY='9f5f9702ebmsh5a0d20a3ae298e8p12cad7jsn7ec89f8a4ff6';
// const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: "https://weatherapi-com.p.rapidapi.com/current.json?q=Udupi&aqi=yes",
//   params: {q: '53.1,-0.13'},
//   headers: {
//     'X-RapidAPI-Key': '9f5f9702ebmsh5a0d20a3ae298e8p12cad7jsn7ec89f8a4ff6',
//     'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }
let city = 'Delhi';
const getWeather = async (city) => {
  const x = {
    headers: {
      'X-RapidAPI-Key': '9f5f9702ebmsh5a0d20a3ae298e8p12cad7jsn7ec89f8a4ff6',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  const response = await axios.get(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}&aqi=yes`, x)
  console.log(response.data.current);
  return response.data.current;
}
//Updating the main searchable card
const inpName= document.querySelector('#InputName');
const inpTemp = document.querySelector('#InputTemp');
const inpFeel = document.querySelector('#InputFeelsLike');
const inpCondition = document.querySelector('#InputCondition');
const inpHumidity = document.querySelector('#InputHumidy');
const inpRainAmt = document.querySelector('#InputRainAmt');
const inpQuality = document.querySelector('#InputAirQuality');
const SearchSelector = document.querySelector('#Search');
const SearchBarSelector =document.querySelector('#SearchBar');

SearchSelector.addEventListener('submit', async function(event) {
  event.preventDefault();
  city= SearchBarSelector.value;
  let data = await getWeather(city);
  updateMain(data,city);
});
const updateMain= function(x,city){
  inpName.innerText=`${city}`;
  inpTemp.innerText=`${x.temp_c}`;
  inpFeel.innerText=`${x.feelslike_c}`;
  inpCondition.innerText=`${x.condition.text}`;
  inpHumidity.innerText=`${x.humidity}`;
  inpRainAmt.innerText=`${x.precip_in}`;
  let index= x.air_quality["us-epa-index"];
  let quality = 'undefined';
  if(index=='1'){
    quality='Excellent';
    inpQuality.classList.add('text-success-emphasis');
  }
  else if(index=='2'){
    quality='Good';
    inpQuality.classList.add('text-success-emphasis');
  }
  else if(index=='3'){
    quality='Moderate';
    inpQuality.classList.add('text-warning');
  }
  else if(index=='4'){
    quality='Unhealthy';
    inpQuality.classList.add('text-danger');
  }
  else if(index=='5'){
    quality='Very Unhealthy';
    inpQuality.classList.add('text-danger');
  }
  else if(index=='6'){
    quality='Hazard';
    inpQuality.classList.add('text-danger');
  }
  else{
    quality='NA';
  }
  inpQuality.innerText=`${quality}`;
}

const defaultCard= async function() {
  let data = await getWeather('Mumbai');
  updateMain(data,'Mumbai');
};
defaultCard();

//PART2: BOTTOM TABLE
const MumTemp= document.querySelector('#MumTemp');
const MumFeel = document.querySelector('#MumFeel');
const MumCondition = document.querySelector('#MumCondition');
const MumAirQuality = document.querySelector('#MumAirQuality');
const MumRain = document.querySelector('#MumRain');

const BlrTemp= document.querySelector('#BlrTemp');
const BlrFeel = document.querySelector('#BlrFeel');
const BlrCondition = document.querySelector('#BlrCondition');
const BlrAirQuality = document.querySelector('#BlrAirQuality');
const BlrRain = document.querySelector('#BlrRain');

const DelTemp= document.querySelector('#DelTemp');
const DelFeel = document.querySelector('#DelFeel');
const DelCondition = document.querySelector('#DelCondition');
const DelAirQuality = document.querySelector('#DelAirQuality');
const DelRain = document.querySelector('#DelRain');

const UduTemp= document.querySelector('#UduTemp');
const UduFeel = document.querySelector('#UduFeel');
const UduCondition = document.querySelector('#UduCondition');
const UduAirQuality = document.querySelector('#UduAirQuality');
const UduRain = document.querySelector('#UduRain');

const ReyTemp= document.querySelector('#ReyTemp');
const ReyFeel = document.querySelector('#ReyFeel');
const ReyCondition = document.querySelector('#ReyCondition');
const ReyAirQuality = document.querySelector('#ReyAirQuality');
const ReyRain = document.querySelector('#ReyRain');


//UPDATING MUMBAI
const updateTableMum= async function(){
  let data= await getWeather('Mumbai');
  MumTemp.innerText=`${data.temp_c}`;
  MumFeel.innerText=`${data.feelslike_c}`;
  MumCondition.innerText=`${data.condition.text}`;
  MumRain.innerText=`${data.precip_in}`;
  let index= data.air_quality["us-epa-index"];
  let quality = 'undefined';
  if(index=='1'){
    quality='Excellent';
    MumAirQuality.classList.add('text-success');
  }
  else if(index=='2'){
    quality='Good';
    MumAirQuality.classList.add('text-success');
  }
  else if(index=='3'){
    quality='Moderate';
    MumAirQuality.classList.add('text-warning');
  }
  else if(index=='4'){
    quality='Unhealthy';
    MumAirQuality.classList.add('text-danger');
  }
  else if(index=='5'){
    quality='Very Unhealthy';
    MumAirQuality.classList.add('text-danger');
  }
  else if(index=='6'){
    quality='Hazard';
    MumAirQuality.classList.add('text-danger');
  }
  else{
    quality='NA';
  }
  MumAirQuality.innerText=`${quality}`;
};
updateTableMum();

//UPDATING BANGALORE
const updateTableBlr= async function(){
  let data= await getWeather('Bangalore');
  BlrTemp.innerText=`${data.temp_c}`;
  BlrFeel.innerText=`${data.feelslike_c}`;
  BlrCondition.innerText=`${data.condition.text}`;
  BlrRain.innerText=`${data.precip_in}`;
  let index= data.air_quality["us-epa-index"];
  let quality = 'undefined';
  if(index=='1'){
    quality='Excellent';
    BlrQuality.classList.add('text-success');
  }
  else if(index=='2'){
    quality='Good';
    BlrAirQuality.classList.add('text-success');
  }
  else if(index=='3'){
    quality='Moderate';
    BlrAirQuality.classList.add('text-warning');
  }
  else if(index=='4'){
    quality='Unhealthy';
    BlrAirQuality.classList.add('text-danger');
  }
  else if(index=='5'){
    quality='Very Unhealthy';
    BlrAirQuality.classList.add('text-danger');
  }
  else if(index=='6'){
    quality='Hazard';
    BlrAirQuality.classList.add('text-danger');
  }
  else{
    quality='NA';
  }
  BlrAirQuality.innerText=`${quality}`;
};
updateTableBlr();

//Update Del
const updateTableDel= async function(){
  let data= await getWeather('New Delhi');
  DelTemp.innerText=`${data.temp_c}`;
  DelFeel.innerText=`${data.feelslike_c}`;
  DelCondition.innerText=`${data.condition.text}`;
  DelRain.innerText=`${data.precip_in}`;
  let index= data.air_quality["us-epa-index"];
  let quality = 'undefined';
  if(index=='1'){
    quality='Excellent';
    DelQuality.classList.add('text-success');
  }
  else if(index=='2'){
    quality='Good';
    DelAirQuality.classList.add('text-success');
  }
  else if(index=='3'){
    quality='Moderate';
    DelAirQuality.classList.add('text-warning');
  }
  else if(index=='4'){
    quality='Unhealthy';
    DelAirQuality.classList.add('text-danger');
  }
  else if(index=='5'){
    quality='Very Unhealthy';
    DelAirQuality.classList.add('text-danger');
  }
  else if(index=='6'){
    quality='Hazard';
    DelAirQuality.classList.add('text-danger');
  }
  else{
    quality='NA';
  }
  DelAirQuality.innerText=`${quality}`;
};
updateTableDel();

//UPDATE Udupi
const updateTableUdu= async function(){
  let data= await getWeather('Udupi');
  UduTemp.innerText=`${data.temp_c}`;
  UduFeel.innerText=`${data.feelslike_c}`;
  UduCondition.innerText=`${data.condition.text}`;
  UduRain.innerText=`${data.precip_in}`;
  let index= data.air_quality["us-epa-index"];
  let quality = 'undefined';
  if(index=='1'){
    quality='Excellent';
    UduQuality.classList.add('text-success');
  }
  else if(index=='2'){
    quality='Good';
    UduAirQuality.classList.add('text-success');
  }
  else if(index=='3'){
    quality='Moderate';
    UduAirQuality.classList.add('text-warning');
  }
  else if(index=='4'){
    quality='Unhealthy';
    UduAirQuality.classList.add('text-danger');
  }
  else if(index=='5'){
    quality='Very Unhealthy';
    MumAirQuality.classList.add('text-danger');
  }
  else if(index=='6'){
    quality='Hazard';
    UduAirQuality.classList.add('text-danger');
  }
  else{
    quality='NA';
  }
  UduAirQuality.innerText=`${quality}`;
};
updateTableUdu();


//UPDATE Reykjavik
const updateTableRey= async function(){
  let data= await getWeather('Reykjavik');
  ReyTemp.innerText=`${data.temp_c}`;
  ReyFeel.innerText=`${data.feelslike_c}`;
  ReyCondition.innerText=`${data.condition.text}`;
  ReyRain.innerText=`${data.precip_in}`;
  let index= data.air_quality["us-epa-index"];
  let quality = 'undefined';
  if(index=='1'){
    quality='Excellent';
    ReyAirQuality.classList.add('text-success');
  }
  else if(index=='2'){
    quality='Good';
    ReyAirQuality.classList.add('text-success');
  }
  else if(index=='3'){
    quality='Moderate';
    ReyAirQuality.classList.add('text-warning');
  }
  else if(index=='4'){
    quality='Unhealthy';
    ReyAirQuality.classList.add('text-danger');
  }
  else if(index=='5'){
    quality='Very Unhealthy';
    ReyAirQuality.classList.add('text-danger');
  }
  else if(index=='6'){
    quality='Hazard';
    ReyAirQuality.classList.add('text-danger');
  }
  else{
    quality='NA';
  }
  ReyAirQuality.innerText=`${quality}`;
};
updateTableRey();