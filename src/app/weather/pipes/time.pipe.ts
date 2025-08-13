import { Pipe, PipeTransform } from '@angular/core';
import { WeatherUtils } from '@weather/utils/weather-utils';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: undefined | number): string {
    if (!value) return '';

    return WeatherUtils.convertUnixTimeTo24HTime(value);
  }
}
