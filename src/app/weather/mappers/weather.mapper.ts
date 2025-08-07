import type { APIWeatherResponse } from '@weather/interfaces/api-weather-response.interface';
import type { Weather } from '@weather/interfaces/current-weather.interface';

export class WeatherMapper {
  // * OpenWeather Current Weather Response Mapper
  static mapApiWeatherResponseToWeather(
    weatherResponse: APIWeatherResponse
  ): Weather {
    return {
      temp: weatherResponse.main.temp,
      icon: weatherResponse.weather[0].icon,
      feels_like: weatherResponse.main.feels_like,
      description: weatherResponse.weather[0].description,
      temp_min: weatherResponse.main.temp_min,
      temp_max: weatherResponse.main.temp_max,
      sunrise: weatherResponse.sys.sunrise,
      sunset: weatherResponse.sys.sunset,
      rain: weatherResponse.rain?.['1h'],
      snow: weatherResponse.snow?.['1h'],
      humidity: weatherResponse.main.humidity,
      pressure: weatherResponse.main.pressure,
      wind: weatherResponse.wind,
      visibility: weatherResponse.visibility,
      clouds: weatherResponse.clouds.all,
    };
  }
}
