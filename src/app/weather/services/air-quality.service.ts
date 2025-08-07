import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

import type { AirQuality } from '@weather/interfaces/current-weather.interface';
import type { APIAirResponse } from '@weather/interfaces/api-air-quality.interface';
import { environment } from 'src/environments/environment';
import { AirQualityMapper } from '@weather/mappers/air-quality.mapper';

const AIR_API_URL = 'https://api.openweathermap.org/data';
const API_VERSION = '2.5';
const AIR_API_KEY = environment.openweatherkey;

@Injectable({ providedIn: 'root' })
export class AirQualityService {
  #http = inject(HttpClient);

  // * OpenWeather Air Pollution Call
  getAirPollution(lat: number, lon: number): Observable<AirQuality> {
    return this.#http
      .get<APIAirResponse>(`${AIR_API_URL}/${API_VERSION}/air_pollution`, {
        params: {
          lat,
          lon,
          appid: AIR_API_KEY,
        },
      })
      .pipe(
        map((response) =>
          AirQualityMapper.mapAirQualityResponseToAirQuality(response)
        ),
        catchError((error) => {
          console.error('Error fetching air quality', error);

          return throwError(
            () =>
              new Error('Could not get air quality for the given coordinates')
          );
        })
      );
  }
}
