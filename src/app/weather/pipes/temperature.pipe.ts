import { Pipe, PipeTransform } from '@angular/core';
import { WeatherUtils } from '@weather/utils/weather-utils';

@Pipe({
  name: 'temperature',
})
export class TemperaturePipe implements PipeTransform {
  transform(value: undefined | number, unit: 'c' | 'f' = 'c'): string {
    if (!value) return '';

    if (unit === 'c') return Math.round(value).toString();

    return WeatherUtils.convertCelciusToFahrenheit(value);
  }
}
