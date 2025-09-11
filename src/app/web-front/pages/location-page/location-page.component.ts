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

  public currentWeather = signal<CurrentWeather | undefined>(undefined);

  defaultWeatherEffect = effect(() => {
    const defaultLocation = this.#geolocationService.defaultLocationValue();

    if (!defaultLocation) return;

    const { lat, lon } = defaultLocation!;

    forkJoin({
      weather: this.#weatherService.getCurrentWeather(lat, lon),
      air: this.#airService.getAirPollution(lat, lon),
    }).subscribe(({ weather, air }) => {
      const mappedWeather =
        CurrentWeatherMapper.mapWeatherAirLocationToCurrentWeather(
          weather,
          air,
          defaultLocation
        );
      this.currentWeather.set(mappedWeather);
    });
  });

  compareLocationsEffect = effect(() => {
    const preciseLocation = this.#geolocationService.preciseLocationValue();
    const defaultLocation = this.#geolocationService.defaultLocationValue();

    if (!preciseLocation || !defaultLocation) return;

    if (
      defaultLocation!.location.toLowerCase() !==
      preciseLocation!.location.toLowerCase()
    ) {
      const { lat, lon } = preciseLocation;

      forkJoin({
        weather: this.#weatherService.getCurrentWeather(lat, lon),
        air: this.#airService.getAirPollution(lat, lon),
      }).subscribe(({ weather, air }) => {
        const mappedWeather =
          CurrentWeatherMapper.mapWeatherAirLocationToCurrentWeather(
            weather,
            air,
            preciseLocation
          );
        this.currentWeather.set(mappedWeather);
      });
    }
  });
}
