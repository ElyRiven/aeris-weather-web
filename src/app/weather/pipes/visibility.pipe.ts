import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'visibility',
})
export class VisibilityPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (!value) return '';

    return (value / 1000).toString();
  }
}
