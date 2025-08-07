import type { UserLocation } from '@front/interfaces/location.interface';
import type {
  AirQuality,
  CurrentWeather,
  Weather,
} from '@weather/interfaces/current-weather.interface';

export class CurrentWeatherMapper {
  // * Mapper to group Location, Weather and Air Quality
  static mapWeatherAirLocationToCurrentWeather(
    weather: Weather,
    air: AirQuality,
    location: UserLocation
  ): CurrentWeather {
    return {
      location,
      weather,
      air,
    };
  }
}
