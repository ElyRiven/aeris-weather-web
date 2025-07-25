import { JsonPipe } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';

import { UserLocation } from '@front/interfaces/location.interface';
import { GeolocationService } from '@geolocation/services/geolocation.service';

@Component({
  selector: 'location-page',
  imports: [JsonPipe],
  templateUrl: './location-page.component.html',
})
export class LocationPageComponent implements OnInit {
  #geolocationService = inject(GeolocationService);

  public temperatureUnit = signal<'c' | 'f'>('c');

  toggleUnit(event: Event): void {
    const tempInput = event.target as HTMLInputElement;
    this.temperatureUnit.set(tempInput.checked ? 'f' : 'c');
  }

  ngOnInit(): void {}

  defaultGeolocationRx = rxResource({
    loader: () => this.#geolocationService.getDefaultGeolocation(),
  });

  preciseGeolocationRx = rxResource({
    loader: () => this.#geolocationService.getPreciseUserLocation(),
  });

  preciseLocationEffect = effect(() => {});
}
