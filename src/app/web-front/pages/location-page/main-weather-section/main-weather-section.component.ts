import { TitleCasePipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';

import type { UserLocation } from '@front/interfaces/location.interface';
import type { Weather } from '@weather/interfaces/current-weather.interface';

import { TemperaturePipe } from '@weather/pipes/temperature.pipe';
import { TimePipe } from '@weather/pipes/time.pipe';

const SUNNY_CONDITIONS = ['haze', 'dust', 'sand', 'ash'];

const CLOUDY_CONDITIONS = ['mist', 'haze', 'clouds'];

const RAINY_CONDITIONS = [
  'rain',
  'snow',
  'thunderstorm',
  'smoke',
  'fog',
  'tornado',
];

@Component({
  selector: 'main-weather-section',
  imports: [TemperaturePipe, TitleCasePipe, TimePipe],
  templateUrl: './main-weather-section.component.html',
})
export class MainWeatherSectionComponent {
  public temperatureUnit = signal<'c' | 'f'>('c');

  public currentLocation = input<UserLocation | undefined>(undefined);
  public currentWeather = input<Weather | undefined>(undefined);

  toggleUnit(event: Event): void {
    const tempInput = event.target as HTMLInputElement;
    this.temperatureUnit.set(tempInput.checked ? 'f' : 'c');
  }

  getBackgroundGradientClass(mainWeather: string | undefined): string {
    if (!mainWeather) return '';

    const lowercaseWeather = mainWeather.toLowerCase();

    if (SUNNY_CONDITIONS.includes(lowercaseWeather))
      return `bg-linear-(--sunny-gradient)`;

    if (CLOUDY_CONDITIONS.includes(lowercaseWeather))
      return `bg-linear-(--cloudy-gradient)`;

    if (RAINY_CONDITIONS.includes(lowercaseWeather))
      return `bg-linear-(--rainy-gradient)`;

    return `bg-linear-(--default-gradient)`;
  }
}
