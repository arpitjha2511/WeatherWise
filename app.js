// DOCS: https://www.weatherapi.com/docs/
//const API_KEY='9f5f9702ebmsh5a0d20a3ae298e8p12cad7jsn7ec89f8a4ff6';
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
let city = 'Mumbai';
const getWeather = async (city) => {
  const params = {
    headers: {
      'X-RapidAPI-Key': '9f5f9702ebmsh5a0d20a3ae298e8p12cad7jsn7ec89f8a4ff6',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  const response = await axios.get(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}&aqi=yes`, params)
  console.log(response.data.current);
  return response.data.current;
}
const getLocalTime = async (city) => {
  const params = {
    headers: {
      'X-RapidAPI-Key': '9f5f9702ebmsh5a0d20a3ae298e8p12cad7jsn7ec89f8a4ff6',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  const response = await axios.get(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}&aqi=yes`, params)
  console.log('LOCAL TIME:');
  console.log(response.data.location.localtime);
  return response.data.location.localtime;
}

//PART 1: Updating the main searchable card
const inpName= document.querySelector('#InputName');
const inpTemp = document.querySelector('#InputTemp');
const inpFeel = document.querySelector('#InputFeelsLike');
const inpCondition = document.querySelector('#InputCondition');
const inpHumidity = document.querySelector('#InputHumidity');
const inpRainAmt = document.querySelector('#InputRainAmt');
const inpQuality = document.querySelector('#InputAirQuality');
const UVQuality = document.querySelector('#InputUV');
const inpWindSpeed= document.querySelector('#WindSpeed');

const SearchSelector = document.querySelector('#Search');
const SearchBarSelector =document.querySelector('#SearchBar');

const LastUpdated =document.querySelector('#LastUpdated');
const LocalTime =document.querySelector('#LocalTime');

//SEARCH: 
SearchSelector.addEventListener('submit', async function(event) {
  event.preventDefault();
  city= SearchBarSelector.value;
  let data = await getWeather(city);

  //Updating Current Card:
  updateMain(data,city);
  let CurrentTime= await getLocalTime(city);
  LocalTime.innerText=`${CurrentTime}`;

  //Updating Forecast Card: 
  let x= await getForecast(city,0);
  ForecastDateSelector.innerText=x.date;
  UpdateForecastCard(x);

  //Making 1st btn active
  ButtonSelectorOne.classList.add('active');
  ButtonSelectorTwo.classList.remove('active'); 
  ButtonSelectorThree.classList.remove('active');
});


const AirQuality= function(index,Selector){
  let quality='NA';
  Selector.className=''; //CONFLICTING CLASSES POSSIBLE ?? Remove all classes using selector.className = '' (empty string)
  if(index===1){
    quality='Excellent';
    Selector.classList.add('text-success');


  }
  else if(index==2){
    quality='Good';
    Selector.classList.add('text-success-emphasis');
  }
  else if(index==3){
    quality='Moderate';
    Selector.classList.add('text-warning');
  }
  else if(index==4){
    quality='Unhealthy';
    Selector.classList.add('text-danger-emphasis');
  }
  else if(index==5){
    quality='Very Unhealthy';
    Selector.classList.add('text-danger');
  }
  else if(index==6){
    quality='Hazard';
    Selector.classList.add('text-danger');
  }
  return quality;
}
const UVIndex= function(index,Selector){
  Selector.className='';
  let quality='NA';
  if(index=='1'||index=='2'){
    quality='Low';
    Selector.classList.add('text-success');
  }
  else if(index=='3'||index=='4'||index=='5'){
    quality='Medium';
    Selector.classList.add('text-warning');
  }
  else if(index=='6'||index=='7'){
    quality='High';
    Selector.classList.add('text-danger-emphasis');
  }
  else if(index=='8'||index=='9'||index=='10'){
    quality='Very High';
    Selector.classList.add('text-danger');
  }
  else if(index>=11){
    quality='Extremely High';
    Selector.classList.add('text-danger');
  }
  return quality;
}

const updateMain= function(x,city){
  inpName.innerText=`${city}`;
  inpTemp.innerText=`${x.temp_c}`;
  inpFeel.innerText=`${x.feelslike_c}`;
  inpCondition.innerText=`${x.condition.text}`;
  inpHumidity.innerText=`${x.humidity}`;
  inpRainAmt.innerText=`${x.precip_in}`;
  inpWindSpeed.innerText=`${x.wind_kph}`;
  LastUpdated.innerText=`${x.last_updated}`;

  let index= x.air_quality["us-epa-index"];
  let quality = AirQuality(index,inpQuality);
  inpQuality.innerText=`${quality}`;
  let uv_index=x.uv;
  let uv_quality= UVIndex(uv_index,UVQuality);
  UVQuality.innerText=`${uv_quality}`;
}

const defaultCard= async function() {
  let data = await getWeather('Mumbai');
  updateMain(data,'Mumbai');
  let CurrentTime= await getLocalTime('Mumbai');
  LocalTime.innerText=`${CurrentTime}`;
};
defaultCard();

//PART2: BOTTOM TABLE
const TokTemp= document.querySelector('#TokTemp');
const TokFeel = document.querySelector('#TokFeel');
const TokCondition = document.querySelector('#TokCondition');
const TokAirQuality = document.querySelector('#TokAirQuality');
const TokUV = document.querySelector('#TokUV');

const BlrTemp= document.querySelector('#BlrTemp');
const BlrFeel = document.querySelector('#BlrFeel');
const BlrCondition = document.querySelector('#BlrCondition');
const BlrAirQuality = document.querySelector('#BlrAirQuality');
const BlrUV = document.querySelector('#BlrUV');

const DelTemp= document.querySelector('#DelTemp');
const DelFeel = document.querySelector('#DelFeel');
const DelCondition = document.querySelector('#DelCondition');
const DelAirQuality = document.querySelector('#DelAirQuality');
const DelUV = document.querySelector('#DelUV');

const UduTemp= document.querySelector('#UduTemp');
const UduFeel = document.querySelector('#UduFeel');
const UduCondition = document.querySelector('#UduCondition');
const UduAirQuality = document.querySelector('#UduAirQuality');
const UduUV = document.querySelector('#UduUV');

const ReyTemp= document.querySelector('#ReyTemp');
const ReyFeel = document.querySelector('#ReyFeel');
const ReyCondition = document.querySelector('#ReyCondition');
const ReyAirQuality = document.querySelector('#ReyAirQuality');
const ReyUV = document.querySelector('#ReyUV');

const SFTemp= document.querySelector('#SFTemp');
const SFFeel = document.querySelector('#SFFeel');
const SFCondition = document.querySelector('#SFCondition');
const SFAirQuality = document.querySelector('#SFAirQuality');
const SFUV = document.querySelector('#SFUV');

//UPDATING Tokyo
const updateTableTokyo= async function(){
  let data= await getWeather('Tokyo');
  TokTemp.innerText=`${data.temp_c}`;
  TokFeel.innerText=`${data.feelslike_c}`;
  TokCondition.innerText=`${data.condition.text}`;
  TokUV.innerText=`${UVIndex(data.uv,TokUV)}`;
  let index= data.air_quality["us-epa-index"];
  let quality = AirQuality(index, TokAirQuality);
  TokAirQuality.innerText=`${quality}`;
};
updateTableTokyo();

//UPDATING BANGALORE
const updateTableBlr= async function(){
  let data= await getWeather('Bangalore');
  BlrTemp.innerText=`${data.temp_c}`;
  BlrFeel.innerText=`${data.feelslike_c}`;
  BlrCondition.innerText=`${data.condition.text}`;
  BlrUV.innerText=`${UVIndex(data.uv,BlrUV)}`;
  let index= data.air_quality["us-epa-index"];
  let quality = AirQuality(index,BlrAirQuality);
  BlrAirQuality.innerText=`${quality}`;
};
updateTableBlr();

//Update Del
const updateTableDel= async function(){
  let data= await getWeather('New Delhi');
  DelTemp.innerText=`${data.temp_c}`;
  DelFeel.innerText=`${data.feelslike_c}`;
  DelCondition.innerText=`${data.condition.text}`;
  DelUV.innerText=`${UVIndex(data.uv,DelUV)}`;
  let index= data.air_quality["us-epa-index"];
  let quality = AirQuality(index,DelAirQuality);
  DelAirQuality.innerText=`${quality}`;
};
updateTableDel();

//UPDATE Manipal
const updateTableUdu= async function(){
  let data= await getWeather('Udupi');
  UduTemp.innerText=`${data.temp_c}`;
  UduFeel.innerText=`${data.feelslike_c}`;
  UduCondition.innerText=`${data.condition.text}`;
  UduUV.innerText=`${UVIndex(data.uv,UduUV)}`;
  let index= data.air_quality["us-epa-index"];
  let quality = AirQuality(index,UduAirQuality);
  UduAirQuality.innerText=`${quality}`;
};
updateTableUdu();


//UPDATE Reykjavik
const updateTableRey= async function(){
  let data= await getWeather('Reykjavik');
  ReyTemp.innerText=`${data.temp_c}`;
  ReyFeel.innerText=`${data.feelslike_c}`;
  ReyCondition.innerText=`${data.condition.text}`;
  ReyUV.innerText=`${UVIndex(data.uv,ReyUV)}`;
  let index= data.air_quality["us-epa-index"];
  let quality = AirQuality(index,ReyAirQuality);
  ReyAirQuality.innerText=`${quality}`;
};
updateTableRey();

//UPDATING SF
const updateTableSF = async function(){
  let data= await getWeather('San Francisco');
  SFTemp.innerText=`${data.temp_c}`;
  SFFeel.innerText=`${data.feelslike_c}`;
  SFCondition.innerText=`${data.condition.text}`;
  SFUV.innerText=`${UVIndex(data.uv,SFUV)}`;
  let index= data.air_quality["us-epa-index"];
  let quality = AirQuality(index, SFAirQuality);
  SFAirQuality.innerText=`${quality}`;
};
updateTableSF();


//Part3: Forecast

const getForecast = async (city,index) => {
  const params = {
    headers: {
      'X-RapidAPI-Key': '9f5f9702ebmsh5a0d20a3ae298e8p12cad7jsn7ec89f8a4ff6',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  const response = await axios.get(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`, params);
  //response obj-> data->forecastday[]->day/astro 
  let x= response.data.forecast.forecastday[index];
  return x;
}



ForecastCardSelector= document.querySelector('#ForecastCard');
CurrentCardSelector= document.querySelector('#CurrentInfoCard');

ForecastIconSelector= document.querySelector('#ConditionImg');
ForecastAvgSelector= document.querySelector('#ForecastAvg');
ForecastMaxSelector= document.querySelector('#ForecastMax');
ForecastMinSelector= document.querySelector('#ForecastMin');
ForecastConditionSelector= document.querySelector('#ForecastCondition');
ForecastHumidSelector= document.querySelector('#ForecastHumid');
ForecastRainChanceSelector= document.querySelector('#ForecastRainChance');
ForecastUVSelector= document.querySelector('#ForecastUV');
SunriseSelector= document.querySelector('#Sunrise');
SunsetSelector= document.querySelector('#Sunset');

const UpdateForecastCard= function (x){

  ForecastAvgSelector.innerText=`${x.day.avgtemp_c}`;
  ForecastMaxSelector.innerText=`${x.day.maxtemp_c}`;
  ForecastMinSelector.innerText=`${x.day.mintemp_c}`;
  ForecastConditionSelector.innerText=`${x.day.condition.text}`;
  ForecastHumidSelector.innerText=`${x.day.avghumidity}`;
  ForecastRainChanceSelector.innerText=`${x.day.daily_chance_of_rain}`;
  ForecastUVSelector.innerText=`${UVIndex(x.day.uv,ForecastUVSelector)}`;

  SunriseSelector.innerText=`${x.astro.sunrise}`;
  SunsetSelector.innerText=`${x.astro.sunset}`;

  ForecastIconSelector.src=x.day.condition.icon;
}
const makeForecastVisible= function (){
  ForecastCardSelector.classList.remove('d-none');
  CurrentCardSelector.classList.add('d-none');
}

CurrentButtonSelector= document.querySelector('#CurrentWeather');
ForecastToggleSelector= document.querySelector('#ToggleForecast');
ButtonGroupSelector=document.querySelector('#BtnGrp');
ButtonSelectorOne=document.querySelector('#BtnOne');
ButtonSelectorTwo=document.querySelector('#BtnTwo');
ButtonSelectorThree=document.querySelector('#BtnThree');

CurrentFooterSelector= document.querySelector('#CurrentFooter');
ForecastFooterSelector= document.querySelector('#ForecastFooter');
ForecastDateSelector=document.querySelector('#ForecastDate');

//Forecast Button: Makes btn group visible and itself invisible && Makes all buttons inactive
ForecastToggleSelector.addEventListener('click',()=>{
  ButtonGroupSelector.classList.remove('d-none');
  ForecastToggleSelector.classList.add('d-none');

  //Making All Buttons Inactive
  ButtonSelectorOne.classList.remove('active');
  ButtonSelectorTwo.classList.remove('active'); 
  ButtonSelectorThree.classList.remove('active');
});

//Current button: Makes btn grp invisible, itself invisible, forecast btn visible, Changes footer
//Current card visible and Forecast card invisible
CurrentButtonSelector.addEventListener('click',()=>{
  ButtonGroupSelector.classList.add('d-none');
  ForecastToggleSelector.classList.remove('d-none');
  CurrentButtonSelector.classList.add('d-none');

  //Changing footers
  CurrentButtonSelector.classList.add('d-none'); 
  ForecastFooterSelector.classList.add('d-none');
  CurrentFooterSelector.classList.remove('d-none');

  //Changing cards
  ForecastCardSelector.classList.add('d-none');
  CurrentCardSelector.classList.remove('d-none');

});


ButtonSelectorOne.addEventListener('click',async ()=>{
  //Changing footers
  CurrentButtonSelector.classList.remove('d-none'); 
  ForecastFooterSelector.classList.remove('d-none');
  CurrentFooterSelector.classList.add('d-none');
  let x= await getForecast(city,0);
  ForecastDateSelector.innerText=x.date;

  //Making Button Active
  ButtonSelectorOne.classList.add('active');
  ButtonSelectorTwo.classList.remove('active');
  ButtonSelectorThree.classList.remove('active');

  //Changing card
  console.log(x);
  UpdateForecastCard(x);
  makeForecastVisible();
});

ButtonSelectorTwo.addEventListener('click',async ()=>{
  //Changing footers
  CurrentButtonSelector.classList.remove('d-none'); 
  ForecastFooterSelector.classList.remove('d-none');
  CurrentFooterSelector.classList.add('d-none');
  let x= await getForecast(city,1);
  ForecastDateSelector.innerText=x.date;

  //Making Button Active
  ButtonSelectorOne.classList.remove('active');
  ButtonSelectorTwo.classList.add('active');
  ButtonSelectorThree.classList.remove('active');

  //Changing card
  console.log(x);
  UpdateForecastCard(x);
  makeForecastVisible();
});

ButtonSelectorThree.addEventListener('click',async ()=>{
  //Changing footers
  CurrentButtonSelector.classList.remove('d-none'); 
  ForecastFooterSelector.classList.remove('d-none');
  CurrentFooterSelector.classList.add('d-none');
  let x= await getForecast(city,2);
  ForecastDateSelector.innerText=x.date;

  //Making Button Active
  ButtonSelectorOne.classList.remove('active');
  ButtonSelectorTwo.classList.remove('active'); 
  ButtonSelectorThree.classList.add('active');

  //Changing card
  console.log(x);
  UpdateForecastCard(x);
  makeForecastVisible();
});

