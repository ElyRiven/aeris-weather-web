import { Component, inject } from '@angular/core';

import { TitleSectionComponent } from '@front/components/title-section/title-section.component';
import { UserLocation } from '@front/interfaces/location.interface';
import { GeolocationService } from '@geolocation/services/geolocation.service';
import { ForecastService } from '@weather/services/forecast-weather.service';

@Component({
  selector: 'details-page',
  standalone: true,
  imports: [TitleSectionComponent],
  templateUrl: './details-page.component.html',
})
export class DetailsPageComponent {
  #geolocationService = inject(GeolocationService);
  #forecastService = inject(ForecastService);

  currentLocation(): UserLocation {
    return this.#geolocationService.getCurrentLocation();
  }

  currentDay(): string {
    return this.#forecastService.currentSelectedDay();
  }
}
