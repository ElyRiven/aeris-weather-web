import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { Observable, catchError, map, throwError } from 'rxjs';

import type {
  FiveDaysForecast,
  ForecastList,
} from '@weather/interfaces/forecast.interface';
import type { APIForecastResponse } from '@weather/interfaces/api-forecast-response.interface';

import { ForecastMapper } from '@weather/mappers/forecast.mapper';

import { environment } from 'src/environments/environment';

const FORECAST_API_URL = 'https://api.openweathermap.org/data';
const API_VERSION = '2.5';
const WEATHER_API_KEY = environment.openweatherkey;

@Injectable({ providedIn: 'root' })
export class ForecastService {
  #http = inject(HttpClient);
  #selectedForecast = signal<ForecastList | undefined>(undefined);

  getFiveDayForecast(lat: number, lon: number): Observable<FiveDaysForecast> {
    return this.#http
      .get<APIForecastResponse>(`${FORECAST_API_URL}/${API_VERSION}/forecast`, {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: WEATHER_API_KEY,
        },
      })
      .pipe(
        map((response) =>
          ForecastMapper.mapApiForecastResponseToFiveDaysForecast(response)
        ),
        catchError((error) => {
          console.error('Error fetching forecast', error);

          return throwError(
            () =>
              new Error(
                'Could not get 5 days forecast for the given coordinates'
              )
          );
        })
      );
  }

  getSelectedForecast(): ForecastList | undefined {
    if (!this.#selectedForecast()) return;

    return this.#selectedForecast()!;
  }

  setSelectedForecast(forecast: ForecastList) {
    this.#selectedForecast.set(forecast);
  }
}
