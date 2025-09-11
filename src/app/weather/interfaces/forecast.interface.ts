import { Wind } from './api-weather-response.interface';

export interface FiveDaysForecast {
  cnt: number;
  list: Forecast[];
}

export interface Forecast {
  date: string;
  time: string;
  description: string;
  temp: number;
  temp_min: number;
  temp_max: number;
  feels_like: number;
  icon: string;
  humidity: number;
  pressure: number;
  visibility: number;
  clouds: number;
  wind: Wind;
}
