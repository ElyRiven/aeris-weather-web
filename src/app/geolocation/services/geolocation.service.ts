import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import type {
  Coordinates,
  UserLocation,
} from '@front/interfaces/location.interface';
import type { GeolocationResponse } from '@geolocation/interfaces/geolocation-resp.interface';
import type { DefaultGeolocation } from '@geolocation/interfaces/ipapi-resp.interface';
import { GeolocationMapper } from '@geolocation/mappers/geolocation.mapper';
import { environment } from 'src/environments/environment';

const IPAPI_URL = 'http://ip-api.com/json/';
const GEOLOCATION_API_URL = 'https://api.openweathermap.org/geo';
const API_VERSION = '1.0';
const GEOLOCATION_API_KEY = environment.openweatherkey;

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  #http = inject(HttpClient);

  // TODO: Implement Direct Geolocation Call
  // getDirectGeolocation(query: string): Observable<UserLocation> {
  //   return this.#http.get<GeolocationResponse[]>(`${GEOLOCATION_API_URL}/${API_VERSION}`)
  // }

  // TODO: Implement Reverse Geolocation Call
  getReverseGeolocation(lat: number, lon: number): Observable<UserLocation> {
    return this.#http
      .get<GeolocationResponse[]>(
        `${GEOLOCATION_API_URL}/${API_VERSION}/reverse`,
        {
          params: {
            lat,
            lon,
            limit: 5,
            appid: GEOLOCATION_API_KEY,
          },
        }
      )
      .pipe(
        map((response) =>
          GeolocationMapper.mapGeolocationToUserLocation(response[0], lat, lon)
        ),
        catchError((error) => {
          console.error('Error fetching reverse geolocation', error);

          return throwError(
            () =>
              new Error(
                'Could not get reverse geolocation for the given coordinates'
              )
          );
        })
      );
  }

  //* IpAPI get geolocation call
  getDefaultGeolocation(): Observable<UserLocation> {
    return this.#http.get<DefaultGeolocation>(`${IPAPI_URL}`).pipe(
      map((response) =>
        GeolocationMapper.mapDefaultGeolocationToUserLocation(response)
      ),
      catchError((error) => {
        console.error('Error fetching geolocation', error);

        return throwError(() => new Error('Could not get user geolocation'));
      })
    );
  }

  //* Precise Browser Location Call
  getPreciseUserLocation(): Observable<Coordinates | undefined> {
    return new Observable((observer) => {
      if (!navigator.geolocation) {
        observer.error('Geolocation is not supported on your browser');
        observer.complete();
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          observer.complete();
        },
        (error) => {
          observer.error('Geolocation access denied by user');
          observer.complete();
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    });
  }
}
