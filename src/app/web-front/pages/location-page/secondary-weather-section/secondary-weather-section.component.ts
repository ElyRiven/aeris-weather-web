import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';

import type { Weather } from '@weather/interfaces/current-weather.interface';

import { VisibilityPipe } from '@weather/pipes/visibility.pipe';
import { WindDirectionPipe } from '@weather/pipes/wind-direction.pipe';
import { WeatherUtils } from '@weather/utils/weather-utils';

@Component({
  selector: 'secondary-weather-section',
  imports: [DecimalPipe, WindDirectionPipe, VisibilityPipe],
  templateUrl: './secondary-weather-section.component.html',
})
export class SecondaryWeatherSectionComponent {
  public secondaryWeather = input<Weather | undefined>(undefined);

  getWindDirectionClass(degrees: number | undefined): string {
    if (!degrees) return '';

    const index = Math.round(degrees / 45) % 8;

    return WeatherUtils.getWindDirectionClass(degrees);
  }
}
