import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';

import type { AirQuality } from '@weather/interfaces/current-weather.interface';
import { AirDescriptionPipe } from '@weather/pipes/aqi-description.pipe';
import { AirTextPipe } from '@weather/pipes/aqi-text.pipe';

@Component({
  selector: 'air-quality-section',
  imports: [AirTextPipe, AirDescriptionPipe, TitleCasePipe, DecimalPipe],
  templateUrl: './air-quality-section.component.html',
})
export class AirQualitySectionComponent {
  public airQuality = input<AirQuality | undefined>(undefined);
}
