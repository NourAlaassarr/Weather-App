

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




let nextDay=document.getElementsByClassName("nextDay");
let dayIcon=document.getElementsByClassName("day-Icon");
let nextdaydegree=document.getElementsByClassName("nextdaydegree");
let degreeLat=document.getElementsByClassName("degreeLat");
let NextDayconditiontext=document.getElementsByClassName("NextDayconditiontext");



let SearchBar = document.getElementById("SearchBar");
let BtnSearch = document.getElementById("BtnSearch");


async function GetData(city){

    let Data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=79c33f56783b4fa79a9180141240608&q=${city}&days=3&aqi=no&alerts=no`);
    let Data2=await Data.json();
    let DataFetched =[];
    DataFetched=Data2;
    console.log(DataFetched);
    return DataFetched;
    }


async function DisplayTodaysData(DataFetched){
    let todayDate = new Date();
    const locale = 'en-US';
    console.log(todayDate.getDate());
    country.innerHTML=DataFetched.location.name;
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

async function displaynextdays(DataFetched){
    for(let i=0; i < DataFetched.forecast.forecastday.length - 1; i++){
        let TheNextDate = new Date(DataFetched.forecast.forecastday[i + 1].date);
        nextDay[i].innerHTML = TheNextDate.toLocaleDateString("en-US", { weekday: "long" });
        nextdaydegree[i].innerHTML = `${DataFetched.forecast.forecastday[i + 1].day.maxtemp_c}°C`;
        dayIcon[i].setAttribute('src', `https:${DataFetched.forecast.forecastday[i + 1].day.condition.icon}`);
        degreeLat[i].innerHTML = `${DataFetched.forecast.forecastday[i + 1].day.mintemp_c}°C`;
        NextDayconditiontext[i].innerHTML = DataFetched.forecast.forecastday[i + 1].day.condition.text;
    }
}


async function  WeatherApi(city = "cairo"){
    let WeatherData = await GetData(city);
    await DisplayTodaysData(WeatherData);
    await displaynextdays(WeatherData);

}
WeatherApi();
SearchBar.addEventListener('input',function(){
    WeatherApi(SearchBar.value);
});
BtnSearch.addEventListener('click',function(){
    WeatherApi(SearchBar.value);
})
