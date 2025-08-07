import { Component, effect, inject, signal } from '@angular/core';

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

  public defaultLocation = signal<UserLocation | undefined>(undefined);
  public preciseLocation = signal<UserLocation | undefined>(undefined);

  toggleUnit(event: Event): void {
    const tempInput = event.target as HTMLInputElement;
    this.temperatureUnit.set(tempInput.checked ? 'f' : 'c');
  }

  defaultGeolocationRx = rxResource({
    loader: () => this.#geolocationService.getDefaultGeolocation(),
  });

  preciseGeolocationRx = rxResource({
    loader: () => this.#geolocationService.getPreciseUserLocation(),
  });

  defaultLocationAssignemtEffect = effect(() => {
    const defaultLocation = this.defaultGeolocationRx.value();

    if (!defaultLocation) return;

    this.defaultLocation.set(defaultLocation);
  });

  // TODO: Implement weather call effect with the default coods
  defaultWeatherEffect = effect(() => {
    if (!this.defaultLocation()) return;

    // TODO: Call weather call with the default coords
  });

  reverseGeolocationEffect = effect(() => {
    const preciseLocation = this.preciseGeolocationRx.value();

    if (!preciseLocation) return;

    this.#geolocationService
      .getReverseGeolocation(preciseLocation!.lat, preciseLocation!.lon)
      .subscribe((preciseLocation) => {
        this.preciseLocation.set(preciseLocation);
      });
  });

  compareLocationsEffect = effect(() => {
    const preciseLocation = this.preciseLocation();
    const defaultLocation = this.defaultLocation();

    if (!preciseLocation || !defaultLocation) return;

    if (
      defaultLocation!.location.toLowerCase() !==
      preciseLocation!.location.toLowerCase()
    ) {
      // TODO: Implement the weather call with the precise coords.
      // this.weatherService.getCurrentWeather(lat,lon)
      console.log(
        'Localidades diferentes, hay que llamar nuevamente a la api de clima'
      );
    }
  });
}
