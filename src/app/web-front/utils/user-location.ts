import type { UserLocation } from '@front/interfaces/location.interface';

export class LocationUtils {
  // TODO: Implement ipapi geolocation
  static getDefaultUserLocation() {}

  // TODO: Implement browser geolocation
  // static getPreciseUserLocation() {
  //   if (!navigator.geolocation) {
  //     console.error('Geolocation is not supported on your browser');
  //     return undefined;
  //   }

  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {},
  //     (error) => {
  //       console.error('Geolocation access denied by user');
  //       return undefined;
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 5000,
  //       maximumAge: 0,
  //     }
  //   );
  // }
}
