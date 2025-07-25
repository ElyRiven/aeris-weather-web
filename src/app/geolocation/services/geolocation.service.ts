import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { UserLocation } from '@front/interfaces/location.interface';
import { GeolocationResponse } from '@geolocation/interfaces/geolocation-resp.interface';
import { GeolocationMapper } from '@geolocation/mappers/geolocation.mapper';
import { DefaultGeolocation } from '@geolocation/interfaces/ipapi-resp.interface';

const IPAPI_URL = 'https://ipapi.co/json/';
const GEOLOCATION_API_URL = 'https://api.openweathermap.org/geo';
const API_VERSION = '1.0';

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  #http = inject(HttpClient);

  // TODO: Implement Direct Geolocation Call
  // getDirectGeolocation(query: string): Observable<UserLocation> {
  //   return this.#http.get<GeolocationResponse[]>(`${GEOLOCATION_API_URL}/${API_VERSION}`)
  // }

  // TODO: Implement Reverse Geolocation Call
  // getReverseGeolocation(lat: number, lon: number): Observable<UserLocation> {
  //   return this.#http
  //     .get<GeolocationResponse[]>(
  //       `${GEOLOCATION_API_URL}/${API_VERSION}/revese`,
  //       {
  //         params: {
  //           lat,
  //           lon,
  //           limit: 5,
  //           appid: '',
  //         },
  //       }
  //     )
  //     .pipe(
  //       map((response) =>
  //         GeolocationMapper.mapGeolocationToUserLocation(response[0])
  //       ),
  //       catchError()
  //     );
  // }

  //* IpAPI get geolocation call
  getDefaultGeolocation(): Observable<UserLocation> {
    return this.#http.get<DefaultGeolocation>(`${IPAPI_URL}`).pipe(
      map((response) =>
        GeolocationMapper.mapDefaultGeolocationToUserLocation(response)
      ),
      catchError((error, response) => {
        console.error('Error fetching geolocation', error);

        return throwError(() => new Error('Could not get user geolocation'));
      })
    );
  }
}
