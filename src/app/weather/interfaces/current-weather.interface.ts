import { UserLocation } from '@front/interfaces/location.interface';
import { Wind } from './api-weather-response.interface';

export interface CurrentWeather {
  location: UserLocation;
  weather: Weather;
  air: AirQuality;
}

export interface Weather {
  temp: number;
  icon: string;
  feels_like: number;
  mainWeather: string;
  description: string;
  temp_min: number;
  temp_max: number;
  sunrise: number;
  sunset: number;
  rain?: number;
  snow?: number;
  humidity: number;
  pressure: number;
  wind: Wind;
  visibility: number;
  clouds: number;
}

export interface AirQuality {
  aqi: number;
  components: { [key: string]: AirQualityComponent };
}

export interface AirQualityComponent {
  value: number;
  category: string;
}
