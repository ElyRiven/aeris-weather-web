import { Component, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs/operators';

import type { UserLocation } from '@front/interfaces/location.interface';
import type { FiveDaysForecast } from '@weather/interfaces/forecast.interface';
import { TitleSectionComponent } from './title-section/title-section.component';
import { ForecastCardComponent } from './forecast-card/forecast-card.component';
import { GeolocationService } from '@geolocation/services/geolocation.service';
import { ForecastService } from '@weather/services/forecast-weather.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'forecast-page',
  imports: [TitleSectionComponent, ForecastCardComponent, JsonPipe],
  templateUrl: './forecast-page.component.html',
})
export class ForecastPageComponent {
  #geolocationService = inject(GeolocationService);
  #forecastService = inject(ForecastService);

  public forecast = signal<FiveDaysForecast | undefined>(undefined);

  currentLocation(): UserLocation {
    const defaultLocation = this.#geolocationService.defaultLocationValue();
    const preciseLocation = this.#geolocationService.preciseLocationValue();

    if (!preciseLocation) return defaultLocation!;

    return preciseLocation;
  }

  forecastRx = rxResource({
    request: () => ({
      location: this.currentLocation(),
    }),
    loader: ({ request }) =>
      this.#forecastService
        .getFiveDayForecast(request.location.lat, request.location.lon)
        .pipe(tap((forecast) => this.forecast.set(forecast))),
  });
}
