import type { UserLocation } from '@front/interfaces/location.interface';
import type { CurrentWeather } from '@weather/interfaces/current-weather.interface';
import type { APIAirResponse } from '@weather/interfaces/api-air-quality.interface';
import type { APIWeatherResponse } from '@weather/interfaces/api-weather-response.interface';

export class WeatherMapper {
  // * OpenWeather Current Weather Mapper
  static mapApiWeatherResponseToCurrentWeather(
    weatherResponse: APIWeatherResponse,
    airResponse: APIAirResponse,
    location: UserLocation
  ): CurrentWeather {
    return {
      location,
      weather: {
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
      },
      air: {
        aqi: airResponse.list[0].main.aqi,
        components: airResponse.list[0].components,
      },
    };
  }
}
