import { Component, inject } from '@angular/core';
import { TemperatureService } from '@shared/services/temperature.service';

@Component({
  selector: 'temperature-selector',
  imports: [],
  templateUrl: './temperature-selector.component.html',
})
export class TemperatureSelectorComponent {
  #temperatureService = inject(TemperatureService);

  temperatureUnit() {
    return this.#temperatureService.currentUnit();
  }

  toggleUnit(event: Event): void {
    this.#temperatureService.toggleUnit(event);
  }
}
