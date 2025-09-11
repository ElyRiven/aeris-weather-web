import { Component, inject } from '@angular/core';
import { TemperatureService } from '@shared/services/temperature.service';

@Component({
  selector: 'forecast-card',
  imports: [],
  templateUrl: './forecast-card.component.html',
})
export class ForecastCardComponent {
  #temperatureService = inject(TemperatureService);

  temperatureUnit() {
    return this.#temperatureService.currentUnit();
  }
}
