import { UserLocation } from '@front/interfaces/location.interface';
import { Clouds, Rain, Snow, Wind } from './api-weather-response.interface';

export interface CurrentWeather {
  location: UserLocation;
  weather: Weather;
  air: AirQuality;
}

export interface Weather {
  temp: number;
  icon: string;
  feels_like: number;
  description: string;
  temp_min: number;
  temp_max: number;
  sunrise: number;
  sunset: number;
  rain?: Rain;
  snow?: Snow;
  humidity: number;
  pressure: number;
  wind: Wind;
  visibility: number;
  clouds: Clouds;
}

export interface AirQuality {
  aqi: number;
  components: { [key: string]: number };
}
