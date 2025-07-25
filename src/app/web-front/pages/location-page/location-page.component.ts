import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';

import { UserLocation } from '@front/interfaces/location.interface';
import { GeolocationService } from '@geolocation/services/geolocation.service';

@Component({
  selector: 'location-page',
  imports: [],
  templateUrl: './location-page.component.html',
})
export class LocationPageComponent {
  #geolocationService = inject(GeolocationService);

  public temperatureUnit = signal<'c' | 'f'>('c');

  toggleUnit(event: Event): void {
    const tempInput = event.target as HTMLInputElement;
    this.temperatureUnit.set(tempInput.checked ? 'f' : 'c');
  }

  defaultGeolocationRx = rxResource({
    loader: () => this.#geolocationService.getDefaultGeolocation(),
  });
}
