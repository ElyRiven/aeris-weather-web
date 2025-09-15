import { Component, input } from '@angular/core';

import type { UserLocation } from '@front/interfaces/location.interface';
import { TemperatureSelectorComponent } from '@shared/components/temperature-selector/temperature-selector.component';

@Component({
  selector: 'title-section',
  imports: [TemperatureSelectorComponent],
  templateUrl: './title-section.component.html',
})
export class TitleSectionComponent {
  public currentLocation = input.required<UserLocation>();
}
