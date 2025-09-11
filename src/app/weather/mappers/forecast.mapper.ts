import type {
  APIForecastResponse,
  List,
} from '@weather/interfaces/api-forecast-response.interface';
import type {
  FiveDaysForecast,
  Forecast,
} from '@weather/interfaces/forecast.interface';

const ICON_URL = 'https://openweathermap.org/img/wn';

export class ForecastMapper {
  static mapApiForecastResponseToFiveDaysForecast(
    forecastResponse: APIForecastResponse
  ): FiveDaysForecast {
    return {
      cnt: forecastResponse.cnt,
      list: this.mapApiForecastListToForecastArray(forecastResponse.list),
    };
  }

  static mapApiForecastListToForecastArray(forecastArray: List[]): Forecast[] {
    return forecastArray.map((forecast) =>
      this.mapApiForecastToForecast(forecast)
    );
  }

  static mapApiForecastToForecast(forecast: List): Forecast {
    const [date, time] = this.splitDateTime(forecast.dt_txt);

    return {
      date,
      time,
      description: forecast.weather[0].description,
      temp: forecast.main.temp,
      temp_max: forecast.main.temp_max,
      temp_min: forecast.main.temp_min,
      feels_like: forecast.main.feels_like,
      icon: `${ICON_URL}/${forecast.weather[0].icon}@2x.png`,
      humidity: forecast.main.humidity,
      pressure: forecast.main.pressure,
      visibility: forecast.visibility,
      clouds: forecast.clouds.all,
      wind: forecast.wind,
    };
  }

  static splitDateTime(dateTime: string): [string, string] {
    const [date, time] = dateTime.split(' ');
    return [date, time];
  }
}
