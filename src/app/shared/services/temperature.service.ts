import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TemperatureService {
  #temperatureUnit = signal<'c' | 'f'>('c');

  currentUnit() {
    return this.#temperatureUnit();
  }

  toggleUnit(event: Event): void {
    const tempInput = event.target as HTMLInputElement;
    this.#temperatureUnit.set(tempInput.checked ? 'f' : 'c');
  }
}
