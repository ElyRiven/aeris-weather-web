import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'airDescription',
})
export class AirDescriptionPipe implements PipeTransform {
  transform(value: undefined | string): string {
    if (!value) return '';

    const aqiDescription = `The air quality is ${value}. `;

    if (value === 'good' || value === 'fair')
      return `${aqiDescription}Enjoy your usual outdoor activities.`;

    if (value === 'moderate' || value === 'poor')
      return `${aqiDescription}Сonsider reducing outdoor activities if you experience any symptoms.`;

    return `${aqiDescription}Reduce or avoid physical activities outdoors.`;
  }
}
