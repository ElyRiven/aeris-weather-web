import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { map } from 'rxjs';

import type { UserLocation } from '@front/interfaces/location.interface';
import type { ForecastList } from '@weather/interfaces/forecast.interface';

import { TitleSectionComponent } from '@front/components/title-section/title-section.component';

import { GeolocationService } from '@geolocation/services/geolocation.service';
import { ForecastService } from '@weather/services/forecast-weather.service';
import { DetailsCardComponent } from './details-card/details-card.component';

@Component({
  selector: 'details-page',
  imports: [TitleSectionComponent, DetailsCardComponent],
  templateUrl: './details-page.component.html',
})
export class DetailsPageComponent {
  #geolocationService = inject(GeolocationService);
  #forecastService = inject(ForecastService);
  #route = inject(ActivatedRoute);

  public date = toSignal(this.#route.params.pipe(map(({ date }) => date)));

  currentLocation(): UserLocation {
    return this.#geolocationService.getCurrentLocation();
  }

  selectedForecast(): ForecastList | undefined {
    return this.#forecastService.getSelectedForecast();
  }
}
