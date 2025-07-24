import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'location-page',
  imports: [],
  templateUrl: './location-page.component.html',
})
export class LocationPageComponent implements OnInit {
  public temperatureUnit = signal<'c' | 'f'>('c');

  toggleUnit(event: Event): void {
    const tempInput = event.target as HTMLInputElement;
    this.temperatureUnit.set(tempInput.checked ? 'f' : 'c');
  }

  ngOnInit(): void {}
}
