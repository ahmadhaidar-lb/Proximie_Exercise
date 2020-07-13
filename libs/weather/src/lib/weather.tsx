import React, { useState } from 'react';
import Titles from "./components/Titles";
import Form from "./components/Form";
import WeatherApi from "./components/WeatherApi";
import './weather.css';


export interface WeatherProps {}

export const Weather:React.FC<WeatherProps> = (props: WeatherProps) => {
  
  const [temperature, setTemperature] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [humidity, setHumidity] = useState();
  const [description, setDescription] = useState();
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState(
    "d343e6e8d2d697f200beae283b7b61be"
  );
  
  //async function to get the info from the API based on city and country or city only
  const getWeather = async (e): Promise<void> => {
    e.preventDefault();
    console.log('here')
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}%20${country}`);
    const data = await api_call.json();
    console.log(data.current.weather_descriptions);
    if (city) {
        setTemperature(data.current.temperature)
        setCity( data.location.name)
        setCountry(data.location.country)
        setHumidity(data.current.humidity)
        setDescription(data.current.weather_descriptions[0])
    } else {
        setTemperature(undefined)
        setCity( undefined)
        setCountry(undefined)
        setHumidity(undefined)
        setDescription(undefined)
        setError("Please enter the values.")
      
    }
  }
  
  //rendering
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={getWeather} />
                  <WeatherApi
                    temperature={temperature} 
                    humidity={humidity}
                    city={city}
                    country={country}
                    description={description}
                    error={error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
};

export default Weather;
