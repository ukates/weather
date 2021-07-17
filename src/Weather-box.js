import React, {useState} from 'react'; 
const api = {
    key: "2b1b5cc5f3172e4a455e90a8a2364438",
    base: "https://api.openweathermap.org/data/2.5/"
}

export const WeatherBox = () => {
    const [query, setQuery] = useState(''); 
    const [weather, setWeather] = useState({}); 
    const [bg, setBg] = useState(""); 

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
                .then(res => res.json())
                .then(result =>  {
                    setWeather(result)
                    setQuery('')
            }); 
        }
    }

    const changeBg = (evt) => {
        if(evt.key === "Enter") {
            document.getElementById("WeatherBox").classList.add(`${setBg(weather.weather[0].main)}`); 
        }
    }   

    return (
        <div id = "WeatherBox" className= {`WeatherBox ${bg}`}>
        <input type="text" className="search-bar" placeholder="Search..." onChange= {e => setQuery(e.target.value)} value={query} onKeyDown={search} onKeyUp={e => changeBg(e)}/>
            {(typeof  weather.main != "undefined") ? (
            <div>
                <h2>{weather.name}</h2>
                <h3>{Math.round(weather.main.temp)}°</h3>
                <p>{weather.weather[0].main}</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=''/>
            </div>
            ) : ('')}
        </div>
    )
}