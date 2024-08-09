

let country =document.getElementById("country");
let day =document.getElementById("day");
let number =document.getElementById("number");
let date=document.getElementById("Date");
let WeatherType =document.getElementById("WeatherType");
let rain=document.getElementById("rain");
let wind =document.getElementById("wind");
let WNW =document.getElementById("WNW");
let icon =document.getElementById("Todays-icon");
let degree =document.getElementById("degree");
async function GetData(){

let Data = await fetch("http://api.weatherapi.com/v1/forecast.json?key=79c33f56783b4fa79a9180141240608&q=Cairo&days=3&aqi=no&alerts=no");
let Data2=await Data.json();
let DataFetched =[];
let Forcast=[];
DataFetched=Data2;
Forcast=Data2.forecast.forecastday;
console.log(Forcast)
console.log(DataFetched);

DisplayTodaysData();
function DisplayTodaysData(){
    let todayDate = new Date();
    const locale = 'en-US';
    console.log(todayDate.getDate());
    country.innerHTML=DataFetched.location.country;
    date.innerHTML=todayDate.toLocaleString('default', { month: 'long' });
    number.innerHTML=todayDate.getDate();
    day.innerHTML=todayDate.toLocaleDateString(locale, { weekday: 'long' }); 
    icon.setAttribute('src' ,`https:${DataFetched.current.condition.icon}`);
    degree.innerHTML=`${DataFetched.current.temp_c}°C`;
    WeatherType.innerHTML=DataFetched.current.condition.text;
    rain.innerHTML=`${DataFetched.current.humidity}%`;
    wind.innerHTML= `${DataFetched.current.wind_kph}km/h`;
    WNW.innerHTML=`${DataFetched.current.wind_dir}`;
}
}

async function  GetDATAFromApis(){
    await GetData();

}
GetDATAFromApis()