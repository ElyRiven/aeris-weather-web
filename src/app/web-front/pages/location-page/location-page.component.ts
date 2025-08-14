import { DecimalPipe, KeyValuePipe, TitleCasePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';

import type { UserLocation } from '@front/interfaces/location.interface';
import type { CurrentWeather } from '@weather/interfaces/current-weather.interface';

import { GeolocationService } from '@geolocation/services/geolocation.service';
import { AirQualityService } from '@weather/services/air-quality.service';
import { CurrentWeatherService } from '@weather/services/current-weather.service';

import { CurrentWeatherMapper } from '@weather/mappers/current-weather.mapper';

import { TemperaturePipe } from '@weather/pipes/temperature.pipe';
import { TimePipe } from '@weather/pipes/time.pipe';
import { WindDirectionPipe } from '@weather/pipes/wind-direction.pipe';
import { VisibilityPipe } from '@weather/pipes/visibility.pipe';
import { AirTextPipe } from '@weather/pipes/aqi-text.pipe';
import { AirDescriptionPipe } from '@weather/pipes/aqi-description.pipe';

@Component({
  selector: 'location-page',
  imports: [
    TemperaturePipe,
    TitleCasePipe,
    TimePipe,
    DecimalPipe,
    WindDirectionPipe,
    VisibilityPipe,
    AirTextPipe,
    AirDescriptionPipe,
  ],
  templateUrl: './location-page.component.html',
})
export class LocationPageComponent {
  #geolocationService = inject(GeolocationService);
  #weatherService = inject(CurrentWeatherService);
  #airService = inject(AirQualityService);

  public temperatureUnit = signal<'c' | 'f'>('c');

  public defaultLocation = signal<UserLocation | undefined>(undefined);
  public preciseLocation = signal<UserLocation | undefined>(undefined);

  public currentWeather = signal<CurrentWeather | undefined>(undefined);

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
      const mappedWeather =
        CurrentWeatherMapper.mapWeatherAirLocationToCurrentWeather(
          weather,
          air,
          this.defaultLocation()!
        );
      this.currentWeather.set(mappedWeather);
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
      const { lat, lon } = this.preciseLocation()!;

      forkJoin({
        weather: this.#weatherService.getCurrentWeather(lat, lon),
        air: this.#airService.getAirPollution(lat, lon),
      }).subscribe(({ weather, air }) => {
        const mappedWeather =
          CurrentWeatherMapper.mapWeatherAirLocationToCurrentWeather(
            weather,
            air,
            this.preciseLocation()!
          );
        this.currentWeather.set(mappedWeather);
      });
    }
  });

  getWindDirectionClass(degrees: number | undefined): string {
    if (!degrees) return '';

    const directionClassesArray = [
      '-rotate-45',
      'rotate-0',
      'rotate-45',
      'rotate-90',
      'rotate-135',
      'rotate-180',
      '-rotate-135',
      '-rotate-90',
    ];

    const index = Math.round(degrees / 45) % 8;

    return directionClassesArray[index];
  }
}
