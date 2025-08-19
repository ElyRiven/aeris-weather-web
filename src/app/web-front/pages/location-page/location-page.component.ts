import { Component, effect, inject, signal } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';

import type { UserLocation } from '@front/interfaces/location.interface';
import type { CurrentWeather } from '@weather/interfaces/current-weather.interface';

import { GeolocationService } from '@geolocation/services/geolocation.service';
import { AirQualityService } from '@weather/services/air-quality.service';
import { CurrentWeatherService } from '@weather/services/current-weather.service';

import { CurrentWeatherMapper } from '@weather/mappers/current-weather.mapper';

import { MainWeatherSectionComponent } from './main-weather-section/main-weather-section.component';
import { SecondaryWeatherSectionComponent } from './secondary-weather-section/secondary-weather-section.component';
import { AirQualitySectionComponent } from './air-quality-section/air-quality-section.component';
import { WeatherInsightSectionComponent } from './weather-insight-section/weather-insight-section.component';

@Component({
  selector: 'location-page',
  imports: [
    MainWeatherSectionComponent,
    SecondaryWeatherSectionComponent,
    AirQualitySectionComponent,
    WeatherInsightSectionComponent,
  ],
  templateUrl: './location-page.component.html',
})
export class LocationPageComponent {
  #geolocationService = inject(GeolocationService);
  #weatherService = inject(CurrentWeatherService);
  #airService = inject(AirQualityService);

  public defaultLocation = signal<UserLocation | undefined>(undefined);
  public preciseLocation = signal<UserLocation | undefined>(undefined);

  public currentWeather = signal<CurrentWeather | undefined>(undefined);

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
}
