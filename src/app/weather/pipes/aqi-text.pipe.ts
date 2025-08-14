import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'airText',
})
export class AirTextPipe implements PipeTransform {
  transform(value: undefined | number): string {
    const aquiArray = ['good', 'fair', 'moderate', 'poor', 'very poor'];

    switch (value) {
      case 1:
        return aquiArray[value - 1];

      case 2:
        return aquiArray[value - 1];

      case 3:
        return aquiArray[value - 1];

      case 4:
        return aquiArray[value - 1];

      case 5:
        return aquiArray[value - 1];

      default:
        return '';
    }
  }
}
