import type { APIWeatherResponse } from '@weather/interfaces/api-weather-response.interface';
import type { Weather } from '@weather/interfaces/current-weather.interface';

const ICON_URL = 'https://openweathermap.org/img/wn';

export class WeatherMapper {
  // * OpenWeather Current Weather Response Mapper
  static mapApiWeatherResponseToWeather(
    weatherResponse: APIWeatherResponse
  ): Weather {
    return {
      temp: weatherResponse.main.temp,
      icon: `${ICON_URL}/${weatherResponse.weather[0].icon}@2x.png`,
      feels_like: weatherResponse.main.feels_like,
      mainWeather: weatherResponse.weather[0].main,
      description: weatherResponse.weather[0].description,
      temp_min: weatherResponse.main.temp_min,
      temp_max: weatherResponse.main.temp_max,
      sunrise: weatherResponse.sys.sunrise,
      sunset: weatherResponse.sys.sunset,
      rain: weatherResponse.rain?.['1h'],
      snow: weatherResponse.snow?.['1h'],
      humidity: weatherResponse.main.humidity,
      pressure: weatherResponse.main.pressure,
      wind: {
        ...weatherResponse.wind,
        deg: (weatherResponse.wind.deg + 180) % 360,
      },
      visibility: weatherResponse.visibility,
      clouds: weatherResponse.clouds.all,
    };
  }
}
