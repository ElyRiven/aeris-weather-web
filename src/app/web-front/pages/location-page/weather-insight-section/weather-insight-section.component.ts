import { Component, input } from '@angular/core';

import type { Weather } from '@weather/interfaces/current-weather.interface';

import { WeatherUtils } from '@weather/utils/weather-utils';

@Component({
  selector: 'weather-insight-section',
  imports: [],
  templateUrl: './weather-insight-section.component.html',
})
export class WeatherInsightSectionComponent {
  public weatherUtils = WeatherUtils;

  public currentWeather = input<Weather | undefined>(undefined);
}
