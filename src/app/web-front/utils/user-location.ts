import type { UserLocation } from '@front/interfaces/location.interface';

export class LocationUtils {
  static getUserLocationDefault(): UserLocation | undefined {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported on your browser');
      return undefined;
    }

    const userLocation: UserLocation = {
      city: 'ciudadPrueba',
      country: 'paisPrueba',
      coords: {
        lat: 0,
        long: 0,
      },
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.coords.lat = position.coords.latitude;
        userLocation.coords.long = position.coords.longitude;
      },
      (error) => {
        console.error('Geolocation access denied by user');
        return undefined;
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return userLocation;
  }
}
