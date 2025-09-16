import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { TitleSectionComponent } from '@front/components/title-section/title-section.component';
import { UserLocation } from '@front/interfaces/location.interface';
import { GeolocationService } from '@geolocation/services/geolocation.service';
import { ForecastService } from '@weather/services/forecast-weather.service';
import { map } from 'rxjs';

@Component({
  selector: 'details-page',
  standalone: true,
  imports: [TitleSectionComponent],
  templateUrl: './details-page.component.html',
})
export class DetailsPageComponent {
  #geolocationService = inject(GeolocationService);
  #route = inject(ActivatedRoute);

  public date = toSignal(this.#route.params.pipe(map(({ date }) => date)));

  currentLocation(): UserLocation {
    return this.#geolocationService.getCurrentLocation();
  }
}
