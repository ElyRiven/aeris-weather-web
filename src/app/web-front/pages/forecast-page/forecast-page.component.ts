import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import type { UserLocation } from '@front/interfaces/location.interface';
import { TitleSectionComponent } from './title-section/title-section.component';
import { ForecastCardComponent } from './forecast-card/forecast-card.component';
import { GeolocationService } from '@geolocation/services/geolocation.service';

@Component({
  selector: 'forecast-page',
  imports: [TitleSectionComponent, ForecastCardComponent, JsonPipe],
  templateUrl: './forecast-page.component.html',
})
export class ForecastPageComponent {
  #geolocationService = inject(GeolocationService);

  currentLocation(): UserLocation {
    const defaultLocation = this.#geolocationService.defaultLocationValue();
    const preciseLocation = this.#geolocationService.preciseLocationValue();

    if (!preciseLocation) return defaultLocation!;

    return preciseLocation;
  }
}
