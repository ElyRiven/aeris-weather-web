import { Pipe, PipeTransform } from '@angular/core';
import { WeatherUtils } from '@weather/utils/weather-utils';

@Pipe({
  name: 'windDirection',
})
export class WindDirectionPipe implements PipeTransform {
  transform(value: number | undefined, short: boolean = true): string {
    if (!value) return '';

    return WeatherUtils.getWindDirectionString(value, short);
  }
}
