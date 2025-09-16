import { Wind } from './api-weather-response.interface';

export interface FiveDaysForecast {
  cnt: number;
  days: ForecastList[];
}

export interface ForecastList {
  date: string;
  list: Forecast[];
}

export interface Forecast {
  time: string;
  full_date: string;
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
