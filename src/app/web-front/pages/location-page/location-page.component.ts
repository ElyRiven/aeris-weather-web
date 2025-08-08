import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';

import type { UserLocation } from '@front/interfaces/location.interface';
import { GeolocationService } from '@geolocation/services/geolocation.service';
import {
  Weather,
  CurrentWeather,
} from '@weather/interfaces/current-weather.interface';
import { CurrentWeatherMapper } from '@weather/mappers/current-weather.mapper';
import { AirQualityService } from '@weather/services/air-quality.service';
import { CurrentWeatherService } from '@weather/services/current-weather.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'location-page',
  imports: [JsonPipe],
  templateUrl: './location-page.component.html',
})
export class LocationPageComponent {
  #geolocationService = inject(GeolocationService);
  #weatherService = inject(CurrentWeatherService);
  #airService = inject(AirQualityService);

  public temperatureUnit = signal<'c' | 'f'>('c');

  public defaultLocation = signal<UserLocation | undefined>(undefined);
  public preciseLocation = signal<UserLocation | undefined>(undefined);

  public weather = signal<CurrentWeather | undefined>(undefined);

  toggleUnit(event: Event): void {
    const tempInput = event.target as HTMLInputElement;
    this.temperatureUnit.set(tempInput.checked ? 'f' : 'c');
  }

  defaultGeolocationRx = rxResource({
    loader: () => this.#geolocationService.getDefaultGeolocation(),
  });

  preciseGeolocationRx = rxResource({
    loader: () => this.#geolocationService.getPreciseUserLocation(),
  });

  defaultLocationAssignemtEffect = effect(() => {
    const defaultLocation = this.defaultGeolocationRx.value();

    if (!defaultLocation) return;

    this.defaultLocation.set(defaultLocation);
  });

  defaultWeatherEffect = effect(() => {
    if (!this.defaultLocation()) return;

    const { lat, lon } = this.defaultLocation()!;

    forkJoin({
      weather: this.#weatherService.getCurrentWeather(lat, lon),
      air: this.#airService.getAirPollution(lat, lon),
    }).subscribe(({ weather, air }) => {
      const mapped = CurrentWeatherMapper.mapWeatherAirLocationToCurrentWeather(
        weather,
        air,
        this.defaultLocation()!
      );
      this.weather.set(mapped);
    });
  });

  reverseGeolocationEffect = effect(() => {
    const preciseLocation = this.preciseGeolocationRx.value();

    if (!preciseLocation) return;

    this.#geolocationService
      .getReverseGeolocation(preciseLocation!.lat, preciseLocation!.lon)
      .subscribe((preciseLocation) => {
        this.preciseLocation.set(preciseLocation);
      });
  });

  compareLocationsEffect = effect(() => {
    const preciseLocation = this.preciseLocation();
    const defaultLocation = this.defaultLocation();

    if (!preciseLocation || !defaultLocation) return;

    if (
      defaultLocation!.location.toLowerCase() !==
      preciseLocation!.location.toLowerCase()
    ) {
      // TODO: Implement the weather call with the precise coords.
      // this.weatherService.getCurrentWeather(lat,lon)
      console.log(
        'Localidades diferentes, hay que llamar nuevamente a la api de clima'
      );
    }
  });
}
