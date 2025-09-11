import { Component, inject, input } from '@angular/core';

import type { UserLocation } from '@front/interfaces/location.interface';
import { TemperatureService } from '@shared/services/temperature.service';

@Component({
  selector: 'forecast-card',
  imports: [],
  templateUrl: './forecast-card.component.html',
})
export class ForecastCardComponent {
  #temperatureService = inject(TemperatureService);

  public currentLocation = input.required<UserLocation>();

  temperatureUnit() {
    return this.#temperatureService.currentUnit();
  }
}
