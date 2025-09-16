import { DatePipe, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';

import type { Forecast } from '@weather/interfaces/forecast.interface';

import { TemperaturePipe } from '@weather/pipes/temperature.pipe';

import { TemperatureService } from '@shared/services/temperature.service';

@Component({
  selector: 'details-card',
  imports: [TemperaturePipe, TitleCasePipe, LowerCasePipe, DatePipe],
  templateUrl: './details-card.component.html',
})
export class DetailsCardComponent {
  #temperatureService = inject(TemperatureService);

  public hourForecast = input.required<Forecast>();

  temperatureUnit() {
    return this.#temperatureService.currentUnit();
  }
}
