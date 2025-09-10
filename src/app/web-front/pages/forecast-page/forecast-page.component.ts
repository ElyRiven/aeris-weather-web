import { Component, signal } from '@angular/core';

@Component({
  selector: 'forecast-page',
  imports: [],
  templateUrl: './forecast-page.component.html',
})
export class ForecastPageComponent {
  public temperatureUnit = signal<'c' | 'f'>('c');

  toggleUnit(event: Event): void {
    const tempInput = event.target as HTMLInputElement;
    this.temperatureUnit.set(tempInput.checked ? 'f' : 'c');
  }
}
