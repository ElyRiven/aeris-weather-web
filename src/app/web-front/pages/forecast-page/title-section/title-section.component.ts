import { Component, signal } from '@angular/core';

@Component({
  selector: 'title-section',
  imports: [],
  templateUrl: './title-section.component.html',
})
export class TitleSectionComponent {
  public temperatureUnit = signal<'c' | 'f'>('c');

  toggleUnit(event: Event): void {
    const tempInput = event.target as HTMLInputElement;
    this.temperatureUnit.set(tempInput.checked ? 'f' : 'c');
  }
}
