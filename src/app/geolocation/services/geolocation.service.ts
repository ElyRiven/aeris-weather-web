import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import type {
  Coordinates,
  UserLocation,
} from '@front/interfaces/location.interface';
import type { GeolocationResponse } from '@geolocation/interfaces/geolocation-resp.interface';
import type { DefaultGeolocation } from '@geolocation/interfaces/ipapi-resp.interface';
import { GeolocationMapper } from '@geolocation/mappers/geolocation.mapper';
import { environment } from 'src/environments/environment';
import { rxResource } from '@angular/core/rxjs-interop';

const IPAPI_URL = 'http://ip-api.com/json/';
const GEOLOCATION_API_URL = 'https://api.openweathermap.org/geo';
const API_VERSION = '1.0';
const GEOLOCATION_API_KEY = environment.openweatherkey;

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  #http = inject(HttpClient);
  #defaultLocation = signal<UserLocation | undefined>(undefined);
  #preciseLocation = signal<UserLocation | undefined>(undefined);

  hasLocation(): boolean {
    if (this.#defaultLocation() || this.#preciseLocation()) return true;

    return false;
  }

  defaultLocationValue(): UserLocation | undefined {
    return this.#defaultLocation();
  }

  preciseLocationValue(): UserLocation | undefined {
    return this.#preciseLocation();
  }

  // TODO: Implement Direct Geolocation Call
  // getDirectGeolocation(query: string): Observable<UserLocation> {
  //   return this.#http.get<GeolocationResponse[]>(`${GEOLOCATION_API_URL}/${API_VERSION}`)
  // }

  // * OpenWeather Reverse Geolocation Call
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
  getPreciseGeolocation(): Observable<Coordinates | undefined> {
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

  defaultGeolocationRx = rxResource({
    loader: () => this.getDefaultGeolocation(),
  });

  preciseGeolocationRx = rxResource({
    loader: () => this.getPreciseGeolocation(),
  });

  defaultLocationAssignemtEffect = effect(() => {
    const defaultLocation = this.defaultGeolocationRx.value();

    if (!defaultLocation) return;

    this.#defaultLocation.set(defaultLocation);
  });

  preciseLocationAssignemtEffect = effect(() => {
    const preciseLocation = this.preciseGeolocationRx.value();

    if (!preciseLocation) return;

    this.getReverseGeolocation(
      preciseLocation!.lat,
      preciseLocation!.lon
    ).subscribe((preciseLocation) => {
      this.#preciseLocation.set(preciseLocation);
    });
  });

  getCurrentLocation(): UserLocation {
    const defaultLocation = this.defaultLocationValue();
    const preciseLocation = this.preciseLocationValue();

    if (!preciseLocation) return defaultLocation!;

    return preciseLocation;
  }
}
