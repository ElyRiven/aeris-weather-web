import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import type { UserLocation } from '@front/interfaces/location.interface';
import { TemperatureSelectorComponent } from '@shared/components/temperature-selector/temperature-selector.component';

@Component({
  selector: 'title-section',
  standalone: true,
  imports: [TemperatureSelectorComponent],
  providers: [DatePipe],
  templateUrl: './title-section.component.html',
})
export class TitleSectionComponent {
  public currentLocation = input.required<UserLocation>();

  public selectedDay = input.required<string>();
}
