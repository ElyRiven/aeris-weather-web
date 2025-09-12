import type {
  APIForecastResponse,
  List,
} from '@weather/interfaces/api-forecast-response.interface';
import type {
  FiveDaysForecast,
  Forecast,
  ForecastList,
} from '@weather/interfaces/forecast.interface';

const ICON_URL = 'https://openweathermap.org/img/wn';

export class ForecastMapper {
  static mapApiForecastResponseToFiveDaysForecast(
    forecastResponse: APIForecastResponse
  ): FiveDaysForecast {
    return {
      cnt: forecastResponse.cnt,
      days: this.mapApiForecastListToForecastArray(forecastResponse.list),
    };
  }

  static mapApiForecastListToForecastArray(
    forecastArray: List[]
  ): ForecastList[] {
    // Crear un Map para agrupar los pronósticos por fecha
    const forecastsByDate = new Map<string, List[]>();

    // Agrupar los pronósticos por fecha
    forecastArray.forEach((forecast) => {
      const [date] = this.splitDateTime(forecast.dt_txt);
      if (!forecastsByDate.has(date)) {
        forecastsByDate.set(date, []);
      }
      forecastsByDate.get(date)?.push(forecast);
    });

    // Convertir el Map a un array de ForecastList
    return Array.from(forecastsByDate.entries()).map(([date, forecasts]) => ({
      date,
      list: forecasts.map((forecast) =>
        this.mapApiForecastToForecast(forecast)
      ),
    }));
  }

  static mapApiForecastToForecast(forecast: List): Forecast {
    const [, time] = this.splitDateTime(forecast.dt_txt);

    return {
      time,
      description: forecast.weather[0].description,
      temp: forecast.main.temp,
      temp_max: forecast.main.temp_max,
      temp_min: forecast.main.temp_min,
      feels_like: forecast.main.feels_like,
      icon: `${ICON_URL}/${forecast.weather[0].icon}.png`,
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
