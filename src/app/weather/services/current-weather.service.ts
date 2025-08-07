import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import type { Weather } from '@weather/interfaces/current-weather.interface';
import type { APIWeatherResponse } from '@weather/interfaces/api-weather-response.interface';
import { environment } from 'src/environments/environment';
import { WeatherMapper } from '@weather/mappers/weather.mapper';

const WEATHER_API_URL = 'https://api.openweathermap.org/data';
const API_VERSION = '2.5';
const WEATHER_API_KEY = environment.openweatherkey;

@Injectable({ providedIn: 'root' })
export class CurrentWeatherService {
  #http = inject(HttpClient);

  // * OpenWeather Current Weather Call
  getCurrentWeather(lat: number, lon: number): Observable<Weather> {
    return this.#http
      .get<APIWeatherResponse>(`${WEATHER_API_URL}/${API_VERSION}/weather`, {
        params: {
          lat,
          lon,
          appid: WEATHER_API_KEY,
        },
      })
      .pipe(
        map((response) =>
          WeatherMapper.mapApiWeatherResponseToWeather(response)
        ),
        catchError((error) => {
          console.error('Error fetching current weather', error);

          return throwError(
            () =>
              new Error(
                'Could not get current weather for the given coordinates'
              )
          );
        })
      );
  }
}
